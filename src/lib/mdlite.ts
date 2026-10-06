/** Mini rendu Markdown pour les textes courts en frontmatter (FAQ…) : paragraphes, listes, **gras**, [liens](url), [[À CONFIRMER : …]]. */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function inline(s: string) {
  let h = esc(s);
  h = h.replace(/\[\[\s*À CONFIRMER\s*:\s*([^\]]+?)\s*\]\]/g, (_m, t) => `<span class="confirm" data-confirm="${t.replace(/"/g, '&quot;')}">[INFORMATION À CONFIRMER]</span>`);
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return h;
}

export function mdLite(src: string): string {
  const blocks = src.trim().split(/\n{2,}/);
  return blocks
    .map((b) => {
      const lines = b.split('\n');
      if (lines.every((l) => /^\s*[-*] /.test(l))) {
        return '<ul>' + lines.map((l) => `<li>${inline(l.replace(/^\s*[-*] /, ''))}</li>`).join('') + '</ul>';
      }
      return `<p>${inline(lines.join(' '))}</p>`;
    })
    .join('');
}

/** Texte brut (pour JSON-LD FAQPage) : retire liens, gras et marqueurs à confirmer. */
export function plain(src: string): string {
  return src
    .replace(/\[\[\s*À CONFIRMER[^\]]*\]\]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/^\s*[-*] /gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Rendu en ligne (sans <p>) pour les libellés courts. */
export const mdInline = (src: string) => inline(src);
