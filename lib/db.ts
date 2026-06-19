import { neon, NeonQueryFunction } from '@neondatabase/serverless'

let _sql: NeonQueryFunction<false, false> | null = null

export function getDb(): NeonQueryFunction<false, false> {
  if (!_sql) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set')
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
}

export async function initSettings() {
  const sql = getDb()
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key   VARCHAR(100) PRIMARY KEY,
      value VARCHAR(255) NOT NULL
    )
  `
  await sql`
    INSERT INTO settings (key, value) VALUES ('registrations_open', 'true')
    ON CONFLICT (key) DO NOTHING
  `
}

export async function getRegistrationsOpen(): Promise<boolean> {
  const sql = getDb()
  try {
    const rows = await sql`SELECT value FROM settings WHERE key = 'registrations_open'`
    if (rows.length === 0) return true
    return rows[0].value === 'true'
  } catch { return true }
}

export async function setRegistrationsOpen(open: boolean): Promise<void> {
  const sql = getDb()
  await sql`
    INSERT INTO settings (key, value) VALUES ('registrations_open', ${open ? 'true' : 'false'})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `
}

export async function initDb() {
  const sql = getDb()
  await sql`
    CREATE TABLE IF NOT EXISTS registrations (
      id            SERIAL PRIMARY KEY,
      prenom        VARCHAR(100) NOT NULL,
      nom           VARCHAR(100) NOT NULL,
      titre         VARCHAR(200),
      email         VARCHAR(255) NOT NULL,
      telephone     VARCHAR(50),
      organisation  VARCHAR(200),
      pays          VARCHAR(100),
      circuit       TEXT        NOT NULL,
      circuit_key   VARCHAR(20) NOT NULL,
      commentaires  TEXT,
      registered_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
  await sql`
    CREATE INDEX IF NOT EXISTS idx_circuit_key ON registrations(circuit_key)
  `
}
