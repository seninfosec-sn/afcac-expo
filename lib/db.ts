import { neon, NeonQueryFunction } from '@neondatabase/serverless'

let _sql: NeonQueryFunction<false, false> | null = null

export function getDb(): NeonQueryFunction<false, false> {
  if (!_sql) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set')
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
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
