'use client'
import { useState, useEffect, useCallback } from 'react'
import { AppLayout } from '@/shared/components/AppLayout'
import { ConversationList } from '@/features/chats/components/ConversationList'
import { MessageThread } from '@/features/chats/components/MessageThread'
import { ChatFilters } from '@/features/chats/components/ChatFilters'
import type { Conversacion, Mensaje } from '@/shared/types'

export default function ChatsPage() {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([])
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [selectedTel, setSelectedTel] = useState<string | null>(null)
  const [filters, setFilters] = useState({ buscar: '', agente: '', etiqueta: '' })

  const fetchConversaciones = useCallback(async () => {
    const params = new URLSearchParams()
    if (filters.agente) params.set('agente', filters.agente)
    if (filters.etiqueta) params.set('etiqueta', filters.etiqueta)
    if (filters.buscar) params.set('buscar', filters.buscar)
    const res = await fetch(`/api/chats?${params}`)
    setConversaciones(await res.json())
  }, [filters])

  useEffect(() => { fetchConversaciones() }, [fetchConversaciones])

  async function selectConversacion(tel: string) {
    setSelectedTel(tel)
    const res = await fetch(`/api/chats/${encodeURIComponent(tel)}`)
    setMensajes(await res.json())
  }

  return (
    <AppLayout>
      <div className="flex h-screen">
        <div className="w-80 border-r flex flex-col bg-white">
          <div className="p-3 border-b bg-gray-900">
            <h2 className="text-white font-semibold text-sm">Conversaciones</h2>
          </div>
          <ChatFilters {...filters} onChange={(f) => setFilters(prev => ({ ...prev, ...f }))} />
          <ConversationList conversaciones={conversaciones} selectedTel={selectedTel} onSelect={selectConversacion} />
        </div>
        <div className="flex-1">
          {selectedTel
            ? <MessageThread telefono={selectedTel} mensajes={mensajes} />
            : <div className="h-full flex items-center justify-center text-gray-400 text-sm">Seleccioná una conversación</div>
          }
        </div>
      </div>
    </AppLayout>
  )
}
