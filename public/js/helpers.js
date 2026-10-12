/* ============ HELPERS ============ */
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const wa = m => `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
const cta = (m, l = 'Talk to OFFside', c = 'btn') => `<a class="${c}" href="${wa(m)}" target="_blank" rel="noopener">${l}</a>`;
const ph = (l, r = '4/5') => `<div class="ph" style="aspect-ratio:${r}"><span>${esc(l)}</span></div>`;
const chips = a => `<div class="chips">${a.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div>`;
const sec = (t, body, cls = '') => `<section class="${cls}"><div class="wrap">${t ? `<h2>${t}</h2>` : ''}${body}</div></section>`;
const page = (t, intro, body) => sec(`${t}`, `<p>${intro}</p>${body}`);
const finalCta = (m = 'Hi OFFside, I need a custom jersey.') => sec('Tell us what you need', `<p>A rough idea is enough. Send a design, a reference photo, a quantity or just a question.</p><br>${cta(m)}`, 'alt');
