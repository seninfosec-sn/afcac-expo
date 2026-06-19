import { NextRequest, NextResponse } from 'next/server'
import { initSettings, getRegistrationsOpen, setRegistrationsOpen } from '@/lib/db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'afcac2026'

export async function GET() {
  await initSettings()
  const open = await getRegistrationsOpen()
  return NextResponse.json({ open })
}

export async function POST(req: NextRequest) {
  const { password, open } = await req.json()
  if (password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await initSettings()
  await setRegistrationsOpen(open)
  return NextResponse.json({ ok: true, open })
}
