/**
 * Ensures an external link is absolute. Users often enter a URL like
 * "linkedin.com/in/jane" without a scheme — without this, the browser treats
 * it as a relative path and prepends the current site URL.
 */
export function externalUrl(url: string | null | undefined): string {
  if (!url) return '#'
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) return trimmed
  return `https://${trimmed.replace(/^\/+/, '')}`
}
