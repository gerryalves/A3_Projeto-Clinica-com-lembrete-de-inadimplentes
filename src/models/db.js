const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/db.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    plano TEXT,
    valor REAL,
    vencimento TEXT
  )`);
});

module.exports = db;