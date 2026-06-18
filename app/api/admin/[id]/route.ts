import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'afcac2026'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { password } = await req.json()
  if (password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sql = getDb()
  await sql`DELETE FROM registrations WHERE id = ${parseInt(params.id)}`
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { password, prenom, nom, titre, email, telephone, organisation, pays, commentaires } = await req.json()
  if (password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sql = getDb()
  await sql`
    UPDATE registrations SET
      prenom = ${prenom},
      nom = ${nom},
      titre = ${titre ?? ''},
      email = ${email},
      telephone = ${telephone ?? ''},
      organisation = ${organisation ?? ''},
      pays = ${pays},
      commentaires = ${commentaires ?? ''}
    WHERE id = ${parseInt(params.id)}
  `
  return NextResponse.json({ ok: true })
}
