'use client'
import type { Conversacion } from '@/shared/types'

const COLORS: Record<string, string> = {
  '#PEDIDO_LISTO': 'bg-green-100 text-green-700',
  '#SOPORTE': 'bg-red-100 text-red-700',
  '#VENTA_ESPECIALIZADA': 'bg-blue-100 text-blue-700',
  '#FLUJO_NORMAL': 'bg-gray-100 text-gray-600',
}

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

interface Props {
  conversaciones: Conversacion[]
  selectedTel: string | null
  onSelect: (tel: string) => void
}

export function ConversationList({ conversaciones, selectedTel, onSelect }: Props) {
  if (conversaciones.length === 0) return <p className="p-4 text-gray-400 text-sm">Sin conversaciones</p>
  return (
    <div className="overflow-y-auto flex-1">
      {conversaciones.map((conv) => (
        <button key={conv.telefono} onClick={() => onSelect(conv.telefono)}
          className={`w-full text-left p-4 border-b hover:bg-gray-50 transition-colors ${selectedTel === conv.telefono ? 'bg-blue-50 border-l-2 border-l-blue-600' : ''}`}>
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium text-sm">{conv.telefono}</span>
            <span className="text-xs text-gray-400">{timeAgo(conv.ultimo_timestamp)}</span>
          </div>
          <p className="text-xs text-gray-500 truncate">{conv.ultimo_mensaje}</p>
          {conv.ultima_etiqueta && (
            <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${COLORS[conv.ultima_etiqueta] ?? 'bg-gray-100 text-gray-600'}`}>
              {conv.ultima_etiqueta}
            </span>
          )}
          <span className="text-xs text-gray-400 ml-2">{conv.total_mensajes} msgs</span>
        </button>
      ))}
    </div>
  )
}
