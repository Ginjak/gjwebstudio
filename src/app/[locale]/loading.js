/**
 * Route-level loading state. Deliberately minimal — a lightweight skeleton
 * feels faster than a spinner and avoids layout shift when content arrives.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
        paddingTop: 'var(--header-height)',
      }}
    >
      <span className="sr-only">Kraunama… / Loading…</span>
      <span
        aria-hidden="true"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '3px solid var(--c-border)',
          borderTopColor: 'var(--brand-500)',
          animation: 'spin 0.9s linear infinite',
        }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}
        @media (prefers-reduced-motion: reduce){[aria-hidden="true"]{animation:none!important}}`}</style>
    </div>
  );
}
