const Database = require('better-sqlite3'), fs = require('fs');
fs.mkdirSync('data', { recursive: true });
const db = new Database('data/offside.db');
db.pragma('journal_mode = WAL'); db.pragma('foreign_keys = ON');
db.exec(`
CREATE TABLE IF NOT EXISTS fabrics(id INTEGER PRIMARY KEY, slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL, summary TEXT DEFAULT '', details TEXT DEFAULT '', image TEXT DEFAULT '', sort INTEGER DEFAULT 100, published INTEGER DEFAULT 1);
CREATE TABLE IF NOT EXISTS works(id INTEGER PRIMARY KEY, title TEXT NOT NULL, caption TEXT DEFAULT '', image TEXT DEFAULT '', pos INTEGER DEFAULT 100, published INTEGER DEFAULT 1);
CREATE TABLE IF NOT EXISTS work_fabrics(work_id INTEGER REFERENCES works(id) ON DELETE CASCADE, fabric_id INTEGER REFERENCES fabrics(id) ON DELETE CASCADE, PRIMARY KEY(work_id, fabric_id));`);
if (!db.prepare('SELECT 1 FROM fabrics').get()) {
  const ins = db.prepare('INSERT INTO fabrics(slug,name,sort) VALUES(?,?,?)');
  ['Microfiber PP', 'Box Mesh', 'Chinigura Mesh', 'Thai Mesh', 'Honeycomb', 'Lurex', 'Jacquard', 'Pindot']
    .forEach((n, i) => ins.run(n.toLowerCase().replace(/[^a-z0-9]+/g, '-'), n, i));
}
module.exports = db;
