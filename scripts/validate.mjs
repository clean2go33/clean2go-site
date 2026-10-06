// Contrôles post-build : liens internes, SEO de base, JSON-LD, jetons « À CONFIRMER », doublons, pages orphelines.
// Usage : npm run build && npm run validate   (STRICT_CONFIRM=1 : échoue s'il reste des « À CONFIRMER »)
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) { console.error('dist/ introuvable : lancez « npm run build » d’abord.'); process.exit(2); }

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(DIST);
const htmls = files.filter((f) => f.endsWith('.html'));
const urlOf = (f) => { let u = '/' + relative(DIST, f).replace(/\\/g, '/'); u = u.replace(/index\.html$/, ''); return u === '/404.html' ? u : u; };
const known = new Set(files.map((f) => '/' + relative(DIST, f).replace(/\\/g, '/')));
const pages = new Map(htmls.map((f) => [urlOf(f), readFileSync(f, 'utf8')]));

const errors = [], warns = [];
const err = (m) => errors.push(m), warn = (m) => warns.push(m);
const inbound = new Map([...pages.keys()].map((u) => [u, 0]));
const confirms = new Map();

for (const [url, html] of pages) {
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]?.trim() ?? '';
  const desc = html.match(/<meta name="description" content="(.*?)"/s)?.[1] ?? '';
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (!title) err(`${url} : <title> manquant`); else if (title.length > 75) warn(`${url} : title long (${title.length})`);
  if (!noindex && (desc.length < 70 || desc.length > 180)) warn(`${url} : description ${desc.length} car.`);
  if (h1s !== 1) err(`${url} : ${h1s} balise(s) H1`);
  if (!noindex && !/<link rel="canonical" href="[^"]+"/.test(html)) err(`${url} : canonical manquant`);
  if (!/<html[^>]*lang="fr"/.test(html)) err(`${url} : lang="fr" manquant`);
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    try { JSON.parse(m[1]); } catch { err(`${url} : JSON-LD invalide`); }
  }
  for (const m of html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)) err(`${url} : image sans alt`);
  const n = (html.match(/data-confirm=/g) || []).length;
  if (n) confirms.set(url, n);
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    let h = m[1];
    if (!h || /^(mailto:|tel:|https?:|#|javascript:)/.test(h)) continue;
    const [pathPart, hash] = h.split('#');
    const path = pathPart.split('?')[0] || url;
    const target = path.startsWith('/') ? path : new URL(path, 'http://x' + url).pathname;
    if (!pages.has(target) && !known.has(target)) { err(`${url} : lien cassé → ${h}`); continue; }
    if (pages.has(target)) {
      if (target !== url) inbound.set(target, (inbound.get(target) || 0) + 1);
      if (hash && !new RegExp(`id="${hash}"`).test(pages.get(target))) warn(`${url} : ancre introuvable → ${h}`);
    }
  }
}

for (const [u, n] of inbound) if (n === 0 && u !== '/' && u !== '/404.html' && u !== '/merci/') err(`page orpheline : ${u}`);

// Sitemap & robots
if (!existsSync(join(DIST, 'sitemap-index.xml'))) err('sitemap-index.xml absent');
if (!existsSync(join(DIST, 'robots.txt'))) err('robots.txt absent');

// Similarité entre pages locales (mots en commun, 5-grammes)
const text = (h) => (h.match(/<main[\s\S]*?<\/main>/)?.[0] ?? h).replace(/<[^>]+>/g, ' ').toLowerCase().replace(/\s+/g, ' ');
const grams = (t) => { const w = t.split(' '); const s = new Set(); for (let i = 0; i < w.length - 4; i++) s.add(w.slice(i, i + 5).join(' ')); return s; };
const local = [...pages].filter(([u]) => /^\/nettoyage-auto-[^/]+\/$/.test(u)).map(([u, h]) => [u, grams(text(h))]);
for (let i = 0; i < local.length; i++) for (let j = i + 1; j < local.length; j++) {
  const [a, A] = local[i], [b, B] = local[j];
  let c = 0; for (const g of A) if (B.has(g)) c++;
  const r = c / Math.min(A.size, B.size);
  if (r > 0.35) warn(`similarité ${(r * 100).toFixed(0)} % entre ${a} et ${b}`);
}

const totalConfirm = [...confirms.values()].reduce((a, b) => a + b, 0);
console.log(`\n${pages.size} pages HTML analysées.`);
if (totalConfirm) {
  console.log(`\n${totalConfirm} mention(s) « INFORMATION À CONFIRMER » sur ${confirms.size} page(s) :`);
  for (const [u, n] of confirms) console.log(`  - ${u} (${n})`);
}
if (warns.length) { console.log(`\nAvertissements (${warns.length}) :`); warns.forEach((w) => console.log('  ! ' + w)); }
if (errors.length) { console.log(`\nErreurs (${errors.length}) :`); errors.forEach((e) => console.log('  ✗ ' + e)); }
if (process.env.STRICT_CONFIRM === '1' && totalConfirm) { console.log('\n✗ STRICT_CONFIRM=1 : des informations restent à confirmer — publication refusée.'); process.exit(1); }
if (errors.length) process.exit(1);
console.log('\n✓ Contrôles passés.');
