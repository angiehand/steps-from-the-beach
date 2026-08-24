-- Steps from the Beach — properties table
-- Run this once in the Cloudflare dashboard: D1 database → Console tab → paste and Execute.

CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  beach TEXT NOT NULL,              -- e.g. 'kiawah-island', 'seabrook-island'
  name TEXT NOT NULL,
  oceanfront INTEGER NOT NULL DEFAULT 0,  -- 1 = true, 0 = false
  lat REAL,
  lng REAL,
  beds INTEGER,
  baths INTEGER,
  sleeps INTEGER,
  vibe TEXT,
  tag TEXT,
  description TEXT,
  features TEXT,                    -- JSON array, e.g. ["Private pool","Golf cart included"]
  img_key TEXT,                     -- R2 object key for the uploaded photo
  affiliate_link TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_properties_beach ON properties(beach);
