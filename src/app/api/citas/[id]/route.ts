import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/shared/lib/supabase'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const allowed = ['estado', 'notas', 'fecha_cita', 'nombre', 'servicio', 'monto', 'direccion']
  const updates: Record<string, any> = {}
  for (const f of allowed) { if (f in body) updates[f] = body[f] }

  const { data, error } = await supabaseAdmin.from('citas').update(updates).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
