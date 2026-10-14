import { NextResponse } from 'next/server';
import { validateContact, sanitise, LIMITS } from '@/lib/forms/validation';
import { siteConfig } from '@/config/site.config';

/**
 * ---------------------------------------------------------------------------
 * POST /api/contact
 * ---------------------------------------------------------------------------
 * Handles the contact form, the free-audit form and newsletter sign-ups.
 *
 * Protection, in order:
 *   1. honeypot field         — filled in = silent success, nothing sent
 *   2. time trap              — submitted in under 3s = bot
 *   3. in-memory rate limit   — 5 requests per IP per 10 minutes
 *   4. optional Turnstile     — verified server-side when keys are present
 *   5. full re-validation     — the client is never trusted
 *
 * Delivery uses the Resend HTTP API via plain fetch, so there is no extra npm
 * dependency. Without RESEND_API_KEY the submission is logged to the server
 * console instead — handy in development.
 * ---------------------------------------------------------------------------
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// A Map is enough for a single-instance deployment. For multi-region hosting
// swap this for Upstash Redis or Vercel KV.
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MIN_ELAPSED_MS = 3000;

function rateLimit(ip) {
  const now = Date.now();
  const record = hits.get(ip);

  if (!record || now - record.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return true;
  }

  record.count += 1;

  // Opportunistic cleanup so the Map cannot grow forever.
  if (hits.size > 5000) {
    for (const [key, value] of hits) {
      if (now - value.start > WINDOW_MS) hits.delete(key);
    }
  }

  return record.count <= MAX_REQUESTS;
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured — skip

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = await response.json();
    return Boolean(data.success);
  } catch {
    return false;
  }
}

function buildEmail(data) {
  const rows = [
    ['Vardas / Name', data.name],
    ['El. paštas / Email', data.email],
    ['Telefonas / Phone', data.phone],
    ['Įmonė / Company', data.company],
    ['Svetainė / Website', data.website],
    ['Paslauga / Service', data.service],
    ['Biudžetas / Budget', data.budget],
    ['Kalba / Locale', data.locale],
    ['Tipas / Type', data.variant],
  ].filter(([, value]) => Boolean(value));

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Žinutė / Message:',
    data.message || '—',
  ].join('\n');

  const html = `
    <table style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 14px 6px 0;color:#5b5a72">${label}</td><td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
        )
        .join('')}
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap;margin-top:18px">${escapeHtml(
      data.message || '—',
    )}</p>
  `;

  return { text, html };
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // 1. Honeypot — pretend everything is fine so the bot does not retry.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  // 2. Time trap.
  if (typeof body.elapsed === 'number' && body.elapsed < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true });
  }

  // 3. Turnstile (only when configured).
  if (process.env.TURNSTILE_SECRET_KEY) {
    const ok = await verifyTurnstile(body.turnstileToken, ip);
    if (!ok) return NextResponse.json({ error: 'captcha_failed' }, { status: 400 });
  }

  const isNewsletter = body.variant === 'newsletter';

  // 4. Re-validate server side.
  const errors = validateContact(body, {
    requireMessage: !isNewsletter && body.variant !== 'audit',
    requireWebsite: body.variant === 'audit',
  });

  if (isNewsletter) {
    delete errors.name;
    delete errors.message;
    delete errors.consent;
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'validation_failed', fields: errors }, { status: 422 });
  }

  const data = {
    name: sanitise(body.name, LIMITS.name.max),
    email: sanitise(body.email, 160),
    phone: sanitise(body.phone, LIMITS.phone.max),
    company: sanitise(body.company, LIMITS.company.max),
    website: sanitise(body.website, LIMITS.website.max),
    service: sanitise(body.service, 80),
    budget: sanitise(body.budget, 40),
    locale: sanitise(body.locale, 5),
    variant: sanitise(body.variant, 20) || 'contact',
    message: String(body.message ?? '').trim().slice(0, LIMITS.message.max),
  };

  const subjectPrefix =
    data.variant === 'audit' ? 'Audito užklausa' : data.variant === 'newsletter' ? 'Prenumerata' : 'Nauja užklausa';
  const subject = `${subjectPrefix} — ${data.name || data.email}`;
  const { text, html } = buildEmail(data);

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Development fallback: nothing is sent, but nothing is lost either.
    console.info('\n[contact] RESEND_API_KEY not set — submission logged instead:\n', text, '\n');
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || `Svetainė <no-reply@${new URL(siteConfig.url).hostname}>`,
        to: [process.env.CONTACT_TO_EMAIL || siteConfig.email],
        reply_to: data.email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('[contact] Resend error:', response.status, detail);
      return NextResponse.json({ error: 'send_failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[contact] Unexpected error:', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 500 });
  }
}
