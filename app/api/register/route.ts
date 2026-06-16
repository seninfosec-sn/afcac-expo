import { NextRequest, NextResponse } from 'next/server'
import { getDb, initDb } from '@/lib/db'

const MAX = 100

const CIRCUIT_KEY: Record<string, string> = {
  'CIRCUIT 1 : 100 Personnes maxi. (Circuit en bus)':      'circuit1',
  'CIRCUIT 2 : 100 Personnes maxi. (Ville de Lomé)':       'circuit2',
  'CIRCUIT 1: 100 People max. (Bus circuit)':               'circuit1',
  'CIRCUIT 2: 100 People max. (City of Lomé)':              'circuit2',
  'CIRCUITO 1: Máx. 100 Pessoas (Circuito de autocarro)':  'circuit1',
  'CIRCUITO 2: Máx. 100 Pessoas (Cidade de Lomé)':         'circuit2',
}

export async function GET() {
  await initDb()
  const sql = getDb()
  const rows = await sql`
    SELECT circuit_key, COUNT(*)::int AS count
    FROM registrations
    GROUP BY circuit_key
  `
  const counts = { circuit1: 0, circuit2: 0 }
  for (const r of rows) {
    if (r.circuit_key === 'circuit1') counts.circuit1 = r.count
    if (r.circuit_key === 'circuit2') counts.circuit2 = r.count
  }
  return NextResponse.json(counts)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { circuit, prenom, nom, titre, email, telephone, organisation, pays, commentaires } = body

  const key = CIRCUIT_KEY[circuit]
  if (!key) return NextResponse.json({ error: 'Circuit invalide' }, { status: 400 })

  await initDb()
  const sql = getDb()

  const [{ count }] = await sql`
    SELECT COUNT(*)::int AS count FROM registrations WHERE circuit_key = ${key}
  `
  if (count >= MAX) return NextResponse.json({ error: 'complet' }, { status: 409 })

  await sql`
    INSERT INTO registrations (prenom, nom, titre, email, telephone, organisation, pays, circuit, circuit_key, commentaires)
    VALUES (${prenom}, ${nom}, ${titre ?? ''}, ${email}, ${telephone ?? ''}, ${organisation ?? ''}, ${pays}, ${circuit}, ${key}, ${commentaires ?? ''})
  `

  const newCount = count + 1
  return NextResponse.json({ success: true, count: newCount, remaining: MAX - newCount })
}
