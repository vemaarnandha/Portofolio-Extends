-- Tabel Portfolio
CREATE TABLE IF NOT EXISTS portfolio (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_project TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  jobdesk TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Tabel Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Index untuk performance
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON portfolio(created_at);
