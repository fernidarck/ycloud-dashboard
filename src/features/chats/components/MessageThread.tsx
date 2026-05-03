'use client'
import type { Mensaje } from '@/shared/types'

const AGENTE_LABEL: Record<string, string> = {
  recepcionista: '🟢 Recepcionista',
  vendedor: '🔵 Vendedor',
}

interface Props { telefono: string; mensajes: Mensaje[] }

export function MessageThread({ telefono, mensajes }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white shrink-0">
        <h2 className="font-semibold">{telefono}</h2>
        <p className="text-xs text-gray-500">{mensajes.length} mensajes</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mensajes.map((msg) => (
          <div key={msg.id} className={`flex ${msg.direccion === 'entrada' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${msg.direccion === 'entrada' ? 'bg-white border text-gray-800' : 'bg-blue-600 text-white'}`}>
              <p className="whitespace-pre-wrap">{msg.mensaje}</p>
              <div className={`flex justify-between items-center mt-1 gap-4 text-xs ${msg.direccion === 'salida' ? 'text-blue-200' : 'text-gray-400'}`}>
                <span>{msg.agente ? AGENTE_LABEL[msg.agente] : ''}</span>
                <span>{new Date(msg.timestamp).toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              {msg.etiqueta && msg.direccion === 'salida' && <span className="inline-block mt-1 text-xs opacity-75">{msg.etiqueta}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
