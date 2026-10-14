/** @type {import('next').NextConfig} */

/*
 * Security headers.
 *
 * The CSP is deliberately strict. If you add a third-party script or service,
 * add its origin to the relevant directive below.
 *
 * Development:
 * - Allows 'unsafe-eval', which Next.js may require.
 * - Does not upgrade HTTP requests to HTTPS.
 * - Does not send the HSTS header.
 *
 * Production:
 * - Upgrades insecure requests to HTTPS.
 * - Sends the HSTS header.
 */
const isDev = process.env.NODE_ENV === 'development';

const csp = [
  "default-src 'self'",

  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : '',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://challenges.cloudflare.com',
  ]
    .filter(Boolean)
    .join(' '),

  "style-src 'self' 'unsafe-inline'",

  [
    "img-src 'self'",
    'data:',
    'blob:',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
  ].join(' '),

  "font-src 'self' data:",

  [
    "connect-src 'self'",
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
    'https://region1.google-analytics.com',
    'https://api.resend.com',
  ].join(' '),

  [
    "frame-src 'self'",
    'https://www.google.com',
    'https://challenges.cloudflare.com',
    'https://cal.com',
  ].join(' '),

  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",

  // Local development uses HTTP, so only enforce HTTPS in production.
  !isDev ? 'upgrade-insecure-requests' : '',
]
  .filter(Boolean)
  .join('; ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: csp,
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },

  // HSTS must only be sent when the production website uses HTTPS.
  ...(!isDev
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),

  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    // AVIF first, with WebP as the fallback.
    formats: ['image/avif', 'image/webp'],

    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],

    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache optimized images for one year.
    minimumCacheTTL: 31536000,
  },

  sassOptions: {
    // Make tokens and mixins available inside every SCSS file.
    additionalData:
      '@use "@/styles/_tokens.scss" as *;\n' + '@use "@/styles/_mixins.scss" as *;\n',

    silenceDeprecations: ['legacy-js-api', 'import'],
  },

  experimental: {
    optimizePackageImports: ['@/components/ui'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  async redirects() {
    // Add legacy URL redirects here when migrating.
    //
    // Example:
    // {
    //   source: '/old-page',
    //   destination: '/new-page',
    //   permanent: true,
    // }

    return [];
  },
};

export default nextConfig;
