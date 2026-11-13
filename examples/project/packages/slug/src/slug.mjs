/**
 * Turn arbitrary text into a URL-friendly slug.
 *
 * @param {string} input
 * @returns {string} lowercase ASCII words joined by single hyphens
 */
export function slugify(input) {
  return String(input)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '-');
}
