/* Clean2Go — scripts du site. Aucune dépendance, aucun traceur par défaut. */

const d = document;

/* ---------- Navigation : menu mobile + sous-menus ---------- */
const burger = d.querySelector<HTMLButtonElement>('.burger');
const nav = d.getElementById('nav');
const subs = Array.from(d.querySelectorAll<HTMLElement>('.has-sub'));

function setSub(li: HTMLElement, open: boolean) {
  li.dataset.open = open ? 'true' : 'false';
  li.querySelector('.nav__btn')?.setAttribute('aria-expanded', String(open));
}
function closeSubs(except?: HTMLElement) {
  subs.forEach((li) => li !== except && setSub(li, false));
}
burger?.addEventListener('click', () => {
  const open = nav!.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  d.body.style.overflow = open ? 'hidden' : '';
});
subs.forEach((li) => {
  li.querySelector('.nav__btn')!.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = li.dataset.open === 'true';
    closeSubs(open ? undefined : li);
    setSub(li, !open);
  });
});
d.addEventListener('click', (e) => { if (!(e.target as HTMLElement).closest('.has-sub')) closeSubs(); });
d.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  closeSubs();
  if (nav?.classList.contains('is-open')) { burger?.click(); burger?.focus(); }
});
if (matchMedia('(min-width:1021px) and (hover:hover)').matches) {
  subs.forEach((li) => {
    let t: number;
    li.addEventListener('mouseenter', () => { clearTimeout(t); closeSubs(li); setSub(li, true); });
    li.addEventListener('mouseleave', () => { t = window.setTimeout(() => setSub(li, false), 180); });
  });
}

/* ---------- Onglets des zones ---------- */
d.querySelectorAll<HTMLElement>('[data-zones]').forEach((z) => {
  const tabs = Array.from(z.querySelectorAll<HTMLElement>('[role="tab"]'));
  const panels = Array.from(z.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  const show = (i: number) => {
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
    panels.forEach((p, k) => { p.hidden = k !== i; });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        show(n); tabs[n].focus();
      }
    });
  });
  show(0);
});

/* ---------- FAQ : ouvrir la question ciblée par l'ancre ---------- */
function openHash() {
  if (!location.hash) return;
  const el = d.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (el instanceof HTMLDetailsElement) el.open = true;
}
openHash();
addEventListener('hashchange', openHash);

/* ---------- Apparition douce ---------- */
const reveals = d.querySelectorAll<HTMLElement>('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  reveals.forEach((r) => io.observe(r));
} else {
  reveals.forEach((r) => r.classList.add('is-in'));
}

/* ---------- Formulaires ---------- */
d.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
  const loadedAt = Date.now(); // anti-spam : durée de remplissage envoyée au serveur
  const ok = form.parentElement!.querySelector<HTMLElement>('.form__ok');
  const ko = form.querySelector<HTMLElement>('.form__ko');
  const setErr = (el: HTMLInputElement, msg: string) => {
    const wrap = el.closest<HTMLElement>('.field, .consent');
    if (!wrap) return;
    wrap.dataset.err = msg ? 'true' : 'false';
    const e = wrap.querySelector<HTMLElement>('.err');
    if (e && msg) e.textContent = msg;
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };
  const validate = () => {
    let first: HTMLInputElement | null = null;
    form.querySelectorAll<HTMLInputElement>('[data-req]').forEach((el) => {
      let msg = '';
      const v = el.type === 'checkbox' ? el.checked : el.value.trim();
      if (!v) msg = el.type === 'checkbox' ? 'Merci de cocher cette case pour envoyer votre demande.' : 'Ce champ est nécessaire.';
      else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim())) msg = 'Cette adresse e-mail ne semble pas valide.';
      else if (el.type === 'tel' && el.value.replace(/[^\d+]/g, '').length < 9) msg = 'Ce numéro semble incomplet.';
      setErr(el, msg);
      if (msg && !first) first = el;
    });
    (first as HTMLInputElement | null)?.focus();
    return !first;
  };
  form.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.closest('[data-err="true"]')) setErr(t, '');
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (ko) ko.style.display = 'none';
    if (!validate()) return;
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    const label = btn.innerHTML;
    btn.disabled = true; btn.textContent = 'Envoi en cours…';
    try {
      const data = new FormData(form);
      data.set('duree_ms', String(Date.now() - loadedAt));
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => ({ ok: res.ok }));
      if (!res.ok || json.ok === false) throw new Error('ko');
      form.style.display = 'none';
      if (ok) { ok.style.display = 'block'; ok.focus(); ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    } catch {
      if (ko) ko.style.display = 'block';
      btn.disabled = false; btn.innerHTML = label;
    }
  });
});

/* ---------- Pré-sélection depuis l'URL (?commune=…&prestation=…) ---------- */
try {
  const q = new URLSearchParams(location.search);
  (['commune', 'prestation'] as const).forEach((k) => {
    const v = q.get(k); if (!v) return;
    d.querySelectorAll<HTMLSelectElement>(`select[name="${k}"]`).forEach((s) => {
      const i = Array.from(s.options).findIndex((o) => o.value === v);
      if (i >= 0) s.selectedIndex = i;
    });
  });
} catch { /* ignore */ }

/* ---------- Consentement + mesure d'audience (uniquement si PUBLIC_GA_ID est défini) ---------- */
const banner = d.getElementById('consent');
const KEY = 'c2g-consent';
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const write = (v: string) => { try { localStorage.setItem(KEY, v); } catch { /* ignore */ } };
function loadGA(id: string) {
  const s = d.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`; d.head.appendChild(s);
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || []; w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag('js', new Date()); w.gtag('config', id, { anonymize_ip: true });
}
if (banner) {
  const id = banner.dataset.ga!;
  const state = read();
  if (state === 'yes') loadGA(id); else if (!state) banner.classList.add('is-open');
  banner.querySelectorAll<HTMLElement>('[data-consent]').forEach((b) => b.addEventListener('click', () => {
    const yes = b.dataset.consent === 'yes';
    write(yes ? 'yes' : 'no'); banner.classList.remove('is-open'); if (yes) loadGA(id);
  }));
}
d.querySelectorAll<HTMLElement>('[data-consent-reset]').forEach((b) => b.addEventListener('click', () => { try { localStorage.removeItem(KEY); } catch { /* ignore */ } location.reload(); }));
