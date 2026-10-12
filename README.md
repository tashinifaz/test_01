# OFFside website (Node.js + Express + SQLite)

## First run (Windows)
1. Install Node.js LTS from nodejs.org.
2. Open a terminal in this folder and run:
   - `npm install`
   - `npm run setup`   (choose an admin password; it prints your private admin link — save it)
   - `npm start`
3. Site: http://localhost:3000 — Admin: the link printed by setup.

## Where things are
- `public/index.html` — page shell; `public/tokens.css` — all colours (dark + light); `public/css/site.css`; `public/js/pages/*.js` — one file per page
- `server.js` — routes, API, admin login, uploads, fabric pages (`/fabrics/<slug>`)
- `db.js` — database tables (file: `data/offside.db` — back this up, plus `public/uploads/`)
- `admin/index.html` — admin panel (Fabrics, Works; upload photos, link works to fabrics)
- `.env` — secrets, created by setup. Never share or commit it.

## Known limits (tracked for later tasks)
- Homepage hero slides, fabric list and Design Library are not yet in the database; only Selected Work is.
- Sessions are held in memory: restarting the server signs you out. Fine for localhost; change before hosting.
- The CSP allows inline scripts because the homepage is one file; move scripts out later to tighten it.
- Serve over HTTPS and set cookies to secure before going live.
