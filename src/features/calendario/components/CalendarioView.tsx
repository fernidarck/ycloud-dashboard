'use client'
import { useMemo } from 'react'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import type { Cita } from '@/shared/types'

const localizer = dateFnsLocalizer({ format, parse, startOfWeek: () => startOfWeek(new Date(), { locale: es }), getDay, locales: { es } })

const ESTADO_COLORS: Record<string, string> = {
  pendiente: '#EAB308', confirmada: '#3B82F6', completada: '#22C55E', cancelada: '#EF4444',
}

interface Props { citas: Cita[]; onSelectCita: (c: Cita) => void }

export function CalendarioView({ citas, onSelectCita }: Props) {
  const events = useMemo(() => citas.filter(c => c.fecha_cita).map(c => ({
    id: c.id,
    title: `${c.nombre ?? c.telefono} — ${c.servicio ?? ''}`,
    start: new Date(c.fecha_cita! + 'T09:00:00'),
    end: new Date(c.fecha_cita! + 'T10:00:00'),
    resource: c,
  })), [citas])

  return (
    <div style={{ height: '100%' }}>
      <Calendar localizer={localizer} events={events} defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.AGENDA]} culture="es"
        messages={{ next:'Siguiente', previous:'Anterior', today:'Hoy', month:'Mes', week:'Semana', agenda:'Lista', noEventsInRange:'Sin citas' }}
        eventPropGetter={(event) => ({ style: { backgroundColor: ESTADO_COLORS[(event as any).resource?.estado] ?? '#6B7280', border: 'none', borderRadius: '4px' } })}
        onSelectEvent={(event) => onSelectCita((event as any).resource)}
      />
    </div>
  )
}
