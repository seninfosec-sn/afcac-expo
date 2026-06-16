import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

const MAX = 100
const KEYS: Record<string, string> = {
  'CIRCUIT 1 : 100 Personnes maxi. (Circuit en bus)': 'circuit1',
  'CIRCUIT 2 : 100 Personnes maxi. (Ville de Lomé)': 'circuit2',
}

export async function GET() {
  const [c1, c2] = await Promise.all([
    kv.get<number>('circuit1'),
    kv.get<number>('circuit2'),
  ])
  return NextResponse.json({ circuit1: c1 ?? 0, circuit2: c2 ?? 0 })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { circuit } = body

  const key = KEYS[circuit]
  if (!key) return NextResponse.json({ error: 'Circuit invalide' }, { status: 400 })

  const count = (await kv.get<number>(key)) ?? 0
  if (count >= MAX) {
    return NextResponse.json({ error: 'complet' }, { status: 409 })
  }

  const newCount = await kv.incr(key)
  return NextResponse.json({ success: true, count: newCount, remaining: MAX - newCount })
}
