'use client'
interface Props { buscar: string; agente: string; etiqueta: string; onChange: (f: Partial<{buscar:string;agente:string;etiqueta:string}>) => void }
const ETIQUETAS = ['', '#PEDIDO_LISTO', '#FLUJO_NORMAL', '#SOPORTE', '#VENTA_ESPECIALIZADA', '#BODEGA']

export function ChatFilters({ buscar, agente, etiqueta, onChange }: Props) {
  return (
    <div className="p-3 border-b bg-white space-y-2 shrink-0">
      <input type="text" placeholder="Buscar por número..." value={buscar} onChange={e => onChange({ buscar: e.target.value })}
        className="w-full border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex gap-2">
        <select value={agente} onChange={e => onChange({ agente: e.target.value })} className="flex-1 border rounded-md px-2 py-1.5 text-xs">
          <option value="">Todos</option>
          <option value="recepcionista">Recepcionista</option>
          <option value="vendedor">Vendedor</option>
        </select>
        <select value={etiqueta} onChange={e => onChange({ etiqueta: e.target.value })} className="flex-1 border rounded-md px-2 py-1.5 text-xs">
          {ETIQUETAS.map(e => <option key={e} value={e}>{e || 'Todas'}</option>)}
        </select>
      </div>
    </div>
  )
}
