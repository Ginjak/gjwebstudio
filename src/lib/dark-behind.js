/**
 * Finds the first element with a visible background at viewport point (x, y),
 * skipping `self` and its children, and reports whether that colour is dark.
 * Used by floating UI (header, accessibility button) to adapt to the page
 * behind it. A `data-header-theme="dark|light"` ancestor overrides the check.
 */
export function isDarkAt(x, y, self) {
  for (const el of document.elementsFromPoint(x, y)) {
    if (self?.contains(el)) continue;
    // An explicit hint wins — it doesn't depend on CSS having loaded yet.
    const hint = el.closest('[data-header-theme]');
    if (hint) return hint.dataset.headerTheme === 'dark';
    const rgba = parseColor(window.getComputedStyle(el).backgroundColor);
    if (rgba && rgba[3] > 0.5) return luminance(rgba) < 0.4;
  }
  return false;
}

/** Parses `rgb()/rgba()` or `color(srgb …)` into [r, g, b, a] (0–255, alpha 0–1). */
function parseColor(value) {
  const nums = value.match(/[\d.]+/g)?.map(Number);
  if (!nums || nums.length < 3) return null;
  const alpha = nums[3] ?? 1;
  if (value.startsWith('color(')) return [nums[0] * 255, nums[1] * 255, nums[2] * 255, alpha];
  return [nums[0], nums[1], nums[2], alpha];
}

/** WCAG relative luminance (0 = black, 1 = white). */
function luminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
