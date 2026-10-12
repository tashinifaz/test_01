/* ============ ROUTER + SHELL ============ */
const NAV = [['home','Home'],['work','Work'],['jerseys','Jerseys'],['apparel','Apparel'],['manufacturing','Manufacturing'],['fabrics','Fabrics'],['lab','Lab']];
const nav = document.getElementById('nav'), app = document.getElementById('app'), mb = document.getElementById('mb');
nav.innerHTML = NAV.map(([k,l]) => `<a href="#/${k === 'home' ? '' : k}" data-k="${k}">${l}</a>`).join('') + cta('Hi OFFside, I need a custom jersey.', 'Talk to OFFside');
document.getElementById('foot').innerHTML = `<div><a class="logo" href="#/">OFF<i>side</i></a><p style="color:var(--deep-mute);margin-top:8px">${SLOGAN}</p></div>
<div>${['jerseys','apparel','work','designs'].map(k => `<a href="#/${k}">${k === 'designs' ? 'Design library' : k[0].toUpperCase() + k.slice(1)}</a>`).join('')}</div>
<div>${['fabrics','manufacturing','process','proof'].map(k => `<a href="#/${k}">${k[0].toUpperCase() + k.slice(1)}</a>`).join('')}</div>
<div><a href="#/about">About</a><a href="#/contact">Contact</a><a href="#/lab">Lab</a><a href="${wa('Hi OFFside')}" target="_blank" rel="noopener">WhatsApp</a><span>© OFFside</span></div>`;
let timers = [];
function initSliders() {
  timers.forEach(clearInterval); timers = [];
  const hs = document.getElementById('hs');
  if (hs) {
    const sl = hs.querySelectorAll('.slide'), dt = hs.querySelectorAll('.dots button'); let i = 0;
    const show = n => { i = (n + sl.length) % sl.length; sl.forEach((e, j) => e.classList.toggle('on', j === i)); dt.forEach((e, j) => e.classList.toggle('on', j === i)); };
    dt.forEach((e, j) => e.onclick = () => show(j));
    show(0); timers.push(setInterval(() => show(i + 1), 4500));
  }
  const tr = document.getElementById('wt');
  if (tr) document.querySelectorAll('[data-slide]').forEach(b => b.onclick = () => tr.scrollBy({left: +b.dataset.slide * (tr.firstElementChild.offsetWidth + 16), behavior: 'smooth'}));
}
function route() {
  const h = (location.hash || '#/').slice(2) || 'home', k = R[h] ? h : 'home';
  app.innerHTML = R[k]();
  document.title = (k === 'home' ? '' : k.split('/').pop().replace(/-/g,' ') + ' — ') + 'OFFside';
  nav.querySelectorAll('a[data-k]').forEach(a => a.classList.toggle('on', a.dataset.k === k.split('/')[0]));
  initSliders();
  nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
mb.onclick = () => mb.setAttribute('aria-expanded', nav.classList.toggle('open'));
document.addEventListener('click', e => {
  const b = e.target.closest('[data-sport]'); if (!b) return;
  sport = b.dataset.sport; document.querySelectorAll('#sports .chip').forEach(c => c.classList.toggle('on', c === b));
});
document.addEventListener('input', e => {
  if (e.target.id === 'dsearch') { const q = e.target.value.toLowerCase(); document.querySelectorAll('.dcard').forEach(c => c.style.display = c.dataset.t.includes(q) ? '' : 'none'); return; }
  const k = e.target.dataset && e.target.dataset.k; if (!k || !e.target.closest('#ctrl')) return;
  D[k] = k === 'n' ? e.target.value.toUpperCase() : e.target.value;
  document.getElementById('stage').innerHTML = jersey(D, 'dj');
  document.getElementById('dcta').href = wa(dreamMsg());
});
const tg = document.getElementById('tg');
function setTheme(t) {
  if (t === 'light') document.documentElement.dataset.theme = 'light'; else delete document.documentElement.dataset.theme;
  tg.textContent = t === 'light' ? 'Dark mode' : 'Light mode';
  try { localStorage.setItem('ofs-theme', t); } catch (e) {}
}
tg.onclick = () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
let saved = ''; try { saved = localStorage.getItem('ofs-theme'); } catch (e) {}
setTheme(saved === 'light' ? 'light' : 'dark');
route();
/* Live data from the server (does nothing if the API isn't there) */
fetch('/api/work').then(r => r.json()).then(d => {
  if (d.length) { WORK.splice(0, WORK.length, ...d.map(w => ({src: w.image, label: w.title, name: w.title, caption: w.caption}))); route(); }
}).catch(() => {});
