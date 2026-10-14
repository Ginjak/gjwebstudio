/**
 * ---------------------------------------------------------------------------
 * FORM VALIDATION
 * ---------------------------------------------------------------------------
 * Deliberately dependency-free so the exact same rules run in the browser and
 * on the server. Never trust the client — api/contact re-validates everything.
 *
 * Each rule returns a message KEY plus interpolation vars, so the caller can
 * translate it into the visitor's language.
 * ---------------------------------------------------------------------------
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export const LIMITS = {
  name: { min: 2, max: 80 },
  message: { min: 10, max: 4000 },
  company: { max: 120 },
  phone: { max: 40 },
  website: { max: 200 },
};

/**
 * @param {Record<string, any>} data
 * @param {{ requireMessage?: boolean, requireWebsite?: boolean }} options
 * @returns {Record<string, {key: string, vars?: object}>} errors keyed by field
 */
export function validateContact(data, options = {}) {
  const { requireMessage = true, requireWebsite = false } = options;
  const errors = {};

  const name = String(data.name ?? '').trim();
  if (!name) errors.name = { key: 'required' };
  else if (name.length < LIMITS.name.min)
    errors.name = { key: 'tooShort', vars: { min: LIMITS.name.min } };
  else if (name.length > LIMITS.name.max)
    errors.name = { key: 'tooLong', vars: { max: LIMITS.name.max } };

  const email = String(data.email ?? '').trim();
  if (!email) errors.email = { key: 'required' };
  else if (!EMAIL_RE.test(email)) errors.email = { key: 'invalidEmail' };

  const website = String(data.website ?? '').trim();
  if (requireWebsite && !website) errors.website = { key: 'required' };
  else if (website && !URL_RE.test(website)) errors.website = { key: 'invalidUrl' };

  const message = String(data.message ?? '').trim();
  if (requireMessage) {
    if (!message) errors.message = { key: 'required' };
    else if (message.length < LIMITS.message.min)
      errors.message = { key: 'tooShort', vars: { min: LIMITS.message.min } };
    else if (message.length > LIMITS.message.max)
      errors.message = { key: 'tooLong', vars: { max: LIMITS.message.max } };
  }

  if (!data.consent) errors.consent = { key: 'consentRequired' };

  return errors;
}

/** Translate the error map into plain strings. */
export function translateErrors(errors, t) {
  const out = {};
  for (const [field, error] of Object.entries(errors)) {
    out[field] = t(`form.${error.key}`, error.vars);
  }
  return out;
}

/** Strip anything that could be used for header injection in the email. */
export function sanitise(value = '', max = 4000) {
  return String(value).replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}
