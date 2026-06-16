import { neon } from '@neondatabase/serverless'

const DATABASE_URL = 'postgresql://neondb_owner:npg_WT3n8IsfMShJ@ep-small-resonance-ai41opig-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const sql = neon(DATABASE_URL)

async function init() {
  console.log('Connexion à Neon...')

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
  console.log('✓ Table registrations créée (ou déjà existante)')

  await sql`CREATE INDEX IF NOT EXISTS idx_circuit_key ON registrations(circuit_key)`
  console.log('✓ Index créé')

  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM registrations`
  console.log(`✓ Base prête — ${count} inscription(s) actuellement`)
}

init().catch(e => { console.error('Erreur:', e.message); process.exit(1) })
