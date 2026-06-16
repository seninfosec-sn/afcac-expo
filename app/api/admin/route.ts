import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'afcac2026'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const [c1, c2, raw1, raw2] = await Promise.all([
    kv.get<number>('circuit1'),
    kv.get<number>('circuit2'),
    kv.lrange<string>('regs:circuit1', 0, -1),
    kv.lrange<string>('regs:circuit2', 0, -1),
  ])

  const parse = (list: string[] | null) =>
    (list ?? []).map(r => (typeof r === 'string' ? JSON.parse(r) : r))

  return NextResponse.json({
    counts: { circuit1: c1 ?? 0, circuit2: c2 ?? 0 },
    registrations: {
      circuit1: parse(raw1),
      circuit2: parse(raw2),
    },
  })
}
