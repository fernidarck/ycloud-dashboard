export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/shared/lib/supabase'
import { updateSystemPrompt } from '@/shared/lib/n8n-api'
import type { Agente } from '@/shared/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const agente = (searchParams.get('agente') ?? 'recepcionista') as Agente
  const { data, error } = await supabaseAdmin.from('prompt_versiones').select('*').eq('agente', agente).order('creado_en', { ascending: false }).limit(10)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const { id, agente } = await request.json()
  const { data: version, error } = await supabaseAdmin.from('prompt_versiones').select('contenido').eq('id', id).single()
  if (error || !version) return NextResponse.json({ error: 'Version no encontrada' }, { status: 404 })
  await updateSystemPrompt(agente as Agente, version.contenido)
  return NextResponse.json({ ok: true, contenido: version.contenido })
}
