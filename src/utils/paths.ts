/**
 * Utility to generate base-aware paths for GitHub Pages and local development.
 */
export function path(p: string = ''): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  if (!p || p === '/') {
    return base ? `${base}/` : '/';
  }
  const cleanP = p.startsWith('/') ? p : `/${p}`;
  return `${base}${cleanP}`;
}
