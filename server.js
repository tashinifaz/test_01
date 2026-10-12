require('dotenv').config();
const express = require('express'), session = require('express-session'), helmet = require('helmet'),
  rateLimit = require('express-rate-limit'), bcrypt = require('bcryptjs'), multer = require('multer'),
  path = require('path'), fs = require('fs'), crypto = require('crypto');
const db = require('./db');
const { ADMIN_PATH, ADMIN_PASSWORD_HASH, SESSION_SECRET, PORT = 3000 } = process.env;
const WA = '8801615898207';
const app = express();
const UP = path.join(__dirname, 'public', 'uploads'); fs.mkdirSync(UP, { recursive: true });

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: { useDefaults: false, directives: {
  defaultSrc: ["'self'"], scriptSrc: ["'self'", "'unsafe-inline'"],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'], fontSrc: ['https://fonts.gstatic.com'],
  imgSrc: ["'self'", 'data:'], connectSrc: ["'self'"], frameAncestors: ["'none'"], formAction: ["'self'"] } } }));
app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname, 'public')));

/* ---------- helpers ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';
const layout = (t, b) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(t)} — OFFside</title>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="/tokens.css">
<script>try{if(localStorage.getItem('ofs-theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}</script></head>
<body><div class="top"><div class="wrap"><a class="logo" href="/">OFF<i>side</i></a></div></div>${b}</body></html>`;

/* ---------- public API + pages ---------- */
app.get('/api/fabrics', (q, r) => r.json(db.prepare('SELECT slug,name,summary,image FROM fabrics WHERE published=1 ORDER BY sort,id').all()));
app.get('/api/work', (q, r) => r.json(db.prepare('SELECT id,title,caption,image FROM works WHERE published=1 ORDER BY pos,id').all()));

app.get('/fabrics/:slug', (q, r) => {
  const f = db.prepare('SELECT * FROM fabrics WHERE slug=? AND published=1').get(q.params.slug);
  if (!f) return r.status(404).send(layout('Not found', '<section><div class="wrap"><h2>Page not found</h2><p><a href="/#/fabrics">Back to fabrics</a></p></div></section>'));
  const works = db.prepare('SELECT w.* FROM works w JOIN work_fabrics wf ON wf.work_id=w.id WHERE wf.fabric_id=? AND w.published=1 ORDER BY w.pos,w.id').all(f.id);
  const msg = encodeURIComponent(`Hi OFFside, I'm interested in the ${f.name} fabric.`);
  r.send(layout(f.name, `<section><div class="wrap"><p><a href="/#/fabrics">← Fabrics</a></p><br><h1>${esc(f.name)}</h1>
  <div style="display:grid;gap:28px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));align-items:start">
  ${f.image ? `<img class="cover" style="aspect-ratio:1/1" src="${esc(f.image)}" alt="${esc(f.name)} fabric">` : `<div class="ph" style="aspect-ratio:1/1">Fabric photo — add in admin</div>`}
  <div><p style="color:var(--ink);font-size:1.15rem">${esc(f.summary)}</p><br><p style="white-space:pre-line">${esc(f.details)}</p><br>
  <a class="btn" href="https://wa.me/${WA}?text=${msg}" target="_blank" rel="noopener">Ask about this fabric</a></div></div></div></section>
  <section><div class="wrap"><h2>Works in ${esc(f.name)}</h2>${works.length ? `<div class="grid">${works.map(w => `<div>${w.image ? `<img class="cover" style="aspect-ratio:4/5" src="${esc(w.image)}" alt="${esc(w.title)}">` : `<div class="ph" style="aspect-ratio:4/5">${esc(w.title)}</div>`}<b>${esc(w.title)}</b><p>${esc(w.caption)}</p></div>`).join('')}</div>` : '<p>No works linked to this fabric yet.</p>'}</div></section>`));
});

/* ---------- admin (hidden path + password) ---------- */
if (!ADMIN_PATH || !ADMIN_PASSWORD_HASH || !SESSION_SECRET) {
  console.log('Admin is OFF. Run "npm run setup" first, then restart.');
} else {
  app.use(session({ name: 'ofs.sid', secret: SESSION_SECRET, resave: false, saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'strict', maxAge: 2 * 3600e3 } }));
  const A = express.Router();
  A.use((q, r, n) => { r.set({ 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-store' }); n(); });
  const limiter = rateLimit({ windowMs: 15 * 60e3, limit: 5, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many attempts. Try again in 15 minutes.' } });
  const guard = (q, r, n) => {
    if (!q.session.ok) return r.status(401).json({ error: 'Not signed in' });
    if (q.method !== 'GET' && q.get('X-Requested-With') !== 'fetch') return r.status(400).json({ error: 'Bad request' });
    n();
  };
  A.get('/', (q, r) => r.sendFile(path.join(__dirname, 'admin', 'index.html')));
  A.post('/login', limiter, async (q, r) => {
    const ok = await bcrypt.compare(String(q.body.password || ''), ADMIN_PASSWORD_HASH);
    if (!ok) return r.status(401).json({ error: 'Wrong password' });
    q.session.regenerate(() => { q.session.ok = true; r.json({ ok: true }); });
  });
  A.post('/logout', guard, (q, r) => q.session.destroy(() => r.json({ ok: true })));
  A.get('/api/me', guard, (q, r) => r.json({ ok: true }));

  const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
  const up = multer({
    storage: multer.diskStorage({ destination: UP, filename: (q, f, cb) => cb(null, crypto.randomBytes(8).toString('hex') + { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }[f.mimetype]) }),
    limits: { fileSize: 6 * 1024 * 1024 }, fileFilter: (q, f, cb) => cb(null, ALLOWED.includes(f.mimetype))
  });
  A.post('/api/upload', guard, up.single('file'), (q, r) => q.file ? r.json({ url: '/uploads/' + q.file.filename }) : r.status(400).json({ error: 'Use a JPG, PNG or WebP under 6 MB' }));

  const T = { fabrics: ['name', 'summary', 'details', 'image', 'sort', 'published'], works: ['title', 'caption', 'image', 'pos', 'published'] };
  const clean = (t, b) => {
    const o = {};
    for (const c of T[t]) {
      let v = b[c];
      if (c === 'published') v = v ? 1 : 0;
      else if (c === 'sort' || c === 'pos') v = Number.isFinite(+v) ? +v : 100;
      else v = String(v ?? '').slice(0, c === 'details' ? 5000 : 500);
      o[c] = v;
    }
    return o;
  };
  const setLinks = (id, ids) => {
    db.prepare('DELETE FROM work_fabrics WHERE work_id=?').run(id);
    const ins = db.prepare('INSERT OR IGNORE INTO work_fabrics VALUES(?,?)');
    for (const f of ids || []) ins.run(id, +f);
  };
  const known = (q, r, n) => T[q.params.t] ? n() : r.sendStatus(404);

  A.get('/api/:t', guard, known, (q, r) => {
    const t = q.params.t;
    const rows = db.prepare(`SELECT * FROM ${t} ORDER BY ${t === 'fabrics' ? 'sort' : 'pos'},id`).all();
    if (t === 'works') rows.forEach(w => w.fabric_ids = db.prepare('SELECT fabric_id FROM work_fabrics WHERE work_id=?').all(w.id).map(x => x.fabric_id));
    r.json(rows);
  });
  A.post('/api/:t', guard, known, (q, r) => {
    const t = q.params.t, o = clean(t, q.body);
    if (t === 'fabrics') {
      if (!o.name.trim()) return r.status(400).json({ error: 'Name is required' });
      const s = slugify(o.name); let n = s, i = 1;
      while (db.prepare('SELECT 1 FROM fabrics WHERE slug=?').get(n)) n = s + '-' + (++i);
      o.slug = n;
    } else if (!o.title.trim()) return r.status(400).json({ error: 'Title is required' });
    const k = Object.keys(o);
    const id = db.prepare(`INSERT INTO ${t}(${k.join(',')}) VALUES(${k.map(x => '@' + x).join(',')})`).run(o).lastInsertRowid;
    if (t === 'works') setLinks(id, q.body.fabric_ids);
    r.json({ id });
  });
  A.put('/api/:t/:id', guard, known, (q, r) => {
    const t = q.params.t, o = clean(t, q.body), id = +q.params.id;
    db.prepare(`UPDATE ${t} SET ${T[t].map(c => c + '=@' + c).join(',')} WHERE id=@id`).run({ ...o, id });
    if (t === 'works') setLinks(id, q.body.fabric_ids);
    r.json({ ok: true });
  });
  A.delete('/api/:t/:id', guard, known, (q, r) => {
    db.prepare(`DELETE FROM ${q.params.t} WHERE id=?`).run(+q.params.id);
    r.json({ ok: true });
  });
  app.use(ADMIN_PATH, A);
}

app.use((e, q, r, n) => r.status(400).json({ error: e.message || 'Something went wrong' }));
app.listen(PORT, () => console.log(`OFFside running at http://localhost:${PORT}`));
