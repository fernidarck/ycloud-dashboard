'use client'
import { useState, useEffect } from 'react'
import { AppLayout } from '@/shared/components/AppLayout'
import { CalendarioView } from '@/features/calendario/components/CalendarioView'
import { CitaPanel } from '@/features/calendario/components/CitaPanel'
import type { Cita } from '@/shared/types'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function CalendarioPage() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null)

  useEffect(() => { fetch('/api/citas').then(r => r.json()).then(setCitas) }, [])

  async function handleUpdate(id: string, updates: Partial<Cita>) {
    const res = await fetch(`/api/citas/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) })
    const updated = await res.json()
    setCitas(prev => prev.map(c => c.id === id ? updated : c))
    setSelectedCita(prev => prev?.id === id ? updated : prev)
  }

  return (
    <AppLayout>
      <div className="p-6 h-screen flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Calendario de Citas</h1>
          <div className="flex gap-3 text-xs">
            {[['Pendiente','bg-yellow-400'],['Confirmada','bg-blue-500'],['Completada','bg-green-500'],['Cancelada','bg-red-500']].map(([l,c]) => (
              <div key={l} className="flex items-center gap-1"><div className={`w-3 h-3 rounded-full ${c}`}/><span>{l}</span></div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <CalendarioView citas={citas} onSelectCita={setSelectedCita} />
        </div>
      </div>
      {selectedCita && <CitaPanel cita={selectedCita} onUpdate={handleUpdate} onClose={() => setSelectedCita(null)} />}
    </AppLayout>
  )
}
