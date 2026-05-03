import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/shared/lib/supabase'
import { getSystemPrompt, updateSystemPrompt } from '@/shared/lib/n8n-api'
import type { Agente } from '@/shared/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const agente = (searchParams.get('agente') ?? 'recepcionista') as Agente
  const contenido = await getSystemPrompt(agente)
  return NextResponse.json({ agente, contenido })
}

export async function PUT(request: Request) {
  const { agente, contenido, notas } = await request.json() as { agente: Agente; contenido: string; notas?: string }
  const contenidoActual = await getSystemPrompt(agente)
  await supabaseAdmin.from('prompt_versiones').insert({ agente, contenido: contenidoActual, notas: notas ?? null })
  await updateSystemPrompt(agente, contenido)
  return NextResponse.json({ ok: true })
}
