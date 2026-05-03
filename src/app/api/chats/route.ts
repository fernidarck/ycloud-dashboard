export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/shared/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const agente = searchParams.get('agente')
  const etiqueta = searchParams.get('etiqueta')
  const buscar = searchParams.get('buscar')

  let query = getSupabaseAdmin().from('mensajes').select('telefono, mensaje, etiqueta, timestamp, agente').order('timestamp', { ascending: false })
  if (agente) query = query.eq('agente', agente)
  if (etiqueta) query = query.eq('etiqueta', etiqueta)
  if (buscar) query = query.ilike('telefono', `%${buscar}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const map = new Map<string, any>()
  for (const msg of data ?? []) {
    if (!map.has(msg.telefono)) {
      map.set(msg.telefono, { telefono: msg.telefono, ultimo_mensaje: msg.mensaje, ultimo_timestamp: msg.timestamp, ultima_etiqueta: msg.etiqueta, total_mensajes: 0 })
    }
  }

  const result = await Promise.all(
    Array.from(map.values()).map(async (conv) => {
      const { count } = await getSupabaseAdmin().from('mensajes').select('*', { count: 'exact', head: true }).eq('telefono', conv.telefono)
      return { ...conv, total_mensajes: count ?? 0 }
    })
  )

  return NextResponse.json(result)
}
