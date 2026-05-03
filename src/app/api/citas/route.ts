import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/shared/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const estado = searchParams.get('estado')
  const desde = searchParams.get('desde')
  const hasta = searchParams.get('hasta')

  let query = supabaseAdmin.from('citas').select('*').order('fecha_cita', { ascending: true })
  if (estado) query = query.eq('estado', estado)
  if (desde) query = query.gte('fecha_cita', desde)
  if (hasta) query = query.lte('fecha_cita', hasta)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
