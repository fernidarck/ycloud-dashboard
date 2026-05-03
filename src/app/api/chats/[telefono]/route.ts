export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/shared/lib/supabase'

export async function GET(request: Request, { params }: { params: Promise<{ telefono: string }> }) {
  const { telefono } = await params
  const { data, error } = await getSupabaseAdmin()
    .from('mensajes').select('*').eq('telefono', decodeURIComponent(telefono)).order('timestamp', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
