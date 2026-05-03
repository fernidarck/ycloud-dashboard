'use client'
import type { Cita, EstadoCita } from '@/shared/types'

const ESTADOS: EstadoCita[] = ['pendiente', 'confirmada', 'completada', 'cancelada']
const ESTADO_COLORS: Record<EstadoCita, string> = {
  pendiente: 'bg-yellow-100 text-yellow-700',
  confirmada: 'bg-blue-100 text-blue-700',
  completada: 'bg-green-100 text-green-700',
  cancelada: 'bg-red-100 text-red-700',
}

interface Props { cita: Cita; onUpdate: (id: string, u: Partial<Cita>) => Promise<void>; onClose: () => void }

export function CitaPanel({ cita, onUpdate, onClose }: Props) {
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l flex flex-col z-10">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Detalle de Cita</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div><label className="text-xs text-gray-500 uppercase">Cliente</label><p className="font-medium">{cita.nombre ?? '—'}</p><p className="text-sm text-gray-500">{cita.telefono}</p></div>
        <div><label className="text-xs text-gray-500 uppercase">Servicio</label><p>{cita.servicio ?? '—'}</p></div>
        <div><label className="text-xs text-gray-500 uppercase">Monto</label><p className="font-medium text-green-700">{cita.monto ?? '—'}</p></div>
        <div><label className="text-xs text-gray-500 uppercase">Dirección</label><p className="text-sm">{cita.direccion ?? '—'}</p></div>
        <div>
          <label className="text-xs text-gray-500 uppercase block mb-2">Estado</label>
          <div className="flex flex-wrap gap-2">
            {ESTADOS.map(e => (
              <button key={e} onClick={() => onUpdate(cita.id, { estado: e })}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${cita.estado === e ? ESTADO_COLORS[e] + ' border-transparent' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase block mb-1">Notas</label>
          <textarea defaultValue={cita.notas ?? ''} onBlur={e => onUpdate(cita.id, { notas: e.target.value })}
            rows={3} className="w-full border rounded-md px-3 py-2 text-sm resize-none" placeholder="Agregar notas..." />
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase block mb-1">Fecha de cita</label>
          <input type="date" defaultValue={cita.fecha_cita ?? ''} onChange={e => onUpdate(cita.id, { fecha_cita: e.target.value })}
            className="border rounded-md px-3 py-2 text-sm" />
        </div>
      </div>
    </div>
  )
}
