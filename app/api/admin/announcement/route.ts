import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const announcement_message =
    typeof body.announcement_message === 'string' ? body.announcement_message.trim() : ''
  const announcement_visible = Boolean(body.announcement_visible)

  const service = createServiceClient()
  const { error } = await service
    .from('site_settings')
    .update({ announcement_message, announcement_visible, updated_at: new Date().toISOString() })
    .eq('id', 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
