import { NextRequest, NextResponse } from 'next/server'
import { getDb, initDb } from '@/lib/db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'afcac2026'
const MAX = 100

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  await initDb()
  const sql = getDb()

  const [rows, countRows] = await Promise.all([
    sql`
      SELECT id, prenom, nom, titre, email, telephone, organisation, pays,
             circuit, circuit_key, commentaires,
             registered_at AS "registeredAt"
      FROM registrations
      ORDER BY registered_at DESC
    `,
    sql`
      SELECT circuit_key, COUNT(*)::int AS count
      FROM registrations
      GROUP BY circuit_key
    `,
  ])

  const counts = { circuit1: 0, circuit2: 0 }
  for (const r of countRows) {
    if (r.circuit_key === 'circuit1') counts.circuit1 = r.count
    if (r.circuit_key === 'circuit2') counts.circuit2 = r.count
  }

  const registrations = {
    circuit1: rows.filter(r => r.circuit_key === 'circuit1'),
    circuit2: rows.filter(r => r.circuit_key === 'circuit2'),
  }

  return NextResponse.json({ counts, registrations, total: rows.length, max: MAX })
}
