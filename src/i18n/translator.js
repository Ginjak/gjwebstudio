/**
 * Pure translator factory — safe to import in Client Components.
 *
 * Server Components cannot pass a function across the server/client boundary,
 * so client components receive a plain dictionary object and build their own
 * `t` from it with this helper.
 */
export function createTranslator(dict) {
  return function t(key, vars) {
    const value = String(key)
      .split('.')
      .reduce((acc, k) => (acc == null ? acc : acc[k]), dict);

    if (typeof value !== 'string') return value ?? key;
    if (!vars) return value;

    return value.replace(/\{(\w+)\}/g, (_, name) =>
      vars[name] !== undefined ? String(vars[name]) : `{${name}}`,
    );
  };
}
