// Transforme [[À CONFIRMER : texte]] en marqueur visible (build brouillon)
// et détectable par scripts/validate.mjs (échec en production stricte).
export function remarkConfirm() {
  const re = /\[\[\s*À CONFIRMER\s*:\s*([^\]]+?)\s*\]\]/g;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  function walk(node) {
    if (!node.children) return;
    const out = [];
    for (const child of node.children) {
      if (child.type === 'text' && child.value.includes('[[')) {
        let last = 0, m;
        re.lastIndex = 0;
        while ((m = re.exec(child.value))) {
          if (m.index > last) out.push({ type: 'text', value: child.value.slice(last, m.index) });
          out.push({ type: 'html', value: `<span class="confirm" data-confirm="${esc(m[1])}">[INFORMATION À CONFIRMER]</span>` });
          last = m.index + m[0].length;
        }
        if (last < child.value.length) out.push({ type: 'text', value: child.value.slice(last) });
      } else {
        walk(child);
        out.push(child);
      }
    }
    node.children = out;
  }
  return (tree) => walk(tree);
}
