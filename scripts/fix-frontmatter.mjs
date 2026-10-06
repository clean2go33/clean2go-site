// Met automatiquement entre guillemets les valeurs YAML contenant ": " (évite les erreurs de frontmatter).
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
function walk(d) { return readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : []; }); }
let n = 0;
for (const f of walk('src/content')) {
  const raw = readFileSync(f, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) continue;
  const fixed = m[1].split('\n').map((l) => {
    const mm = l.match(/^(\s*(?:- )?[A-Za-z]\w*): (.+)$/);
    if (!mm) return l;
    const v = mm[2];
    if (/^["'\[{|>]/.test(v)) return l;
    if (/: | #/.test(v)) { n++; return `${mm[1]}: "${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`; }
    return l;
  }).join('\n');
  if (fixed !== m[1]) writeFileSync(f, raw.replace(m[1], fixed));
}
console.log(`frontmatter : ${n} valeur(s) corrigée(s)`);
