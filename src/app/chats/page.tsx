'use client'
import { useState, useEffect, useCallback } from 'react'
import { AppLayout } from '@/shared/components/AppLayout'
import type { Conversacion, Mensaje } from '@/shared/types'
import { Search, Bot, SendHorizontal, Paperclip } from 'lucide-react'

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

export default function ChatsPage() {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([])
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [selectedTel, setSelectedTel] = useState<string | null>(null)
  const [buscar, setBuscar] = useState('')

  const fetchConversaciones = useCallback(async () => {
    const params = new URLSearchParams()
    if (buscar) params.set('buscar', buscar)
    const res = await fetch(`/api/chats?${params}`)
    const data = await res.json()
    if (Array.isArray(data)) setConversaciones(data)
  }, [buscar])

  useEffect(() => { fetchConversaciones() }, [fetchConversaciones])

  async function selectConversacion(tel: string) {
    setSelectedTel(tel)
    const res = await fetch(`/api/chats/${encodeURIComponent(tel)}`)
    const data = await res.json()
    if (Array.isArray(data)) setMensajes(data)
  }

  const selected = selectedTel ? conversaciones.find(c => c.telefono === selectedTel) : null

  return (
    <AppLayout>
      <div className="flex h-full bg-white border-t border-slate-100 overflow-hidden">
        {/* Left: conversation list */}
        <div className="w-80 border-r border-slate-100 flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-50">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 italic">Bandeja de entrada</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Buscar por número..."
                value={buscar}
                onChange={e => setBuscar(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#FF6B00] transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {conversaciones.length === 0 && (
              <p className="p-6 text-xs text-slate-400 italic text-center mt-8">Sin conversaciones</p>
            )}
            {conversaciones.map(conv => (
              <button
                key={conv.telefono}
                onClick={() => selectConversacion(conv.telefono)}
                className={`w-full p-5 text-left hover:bg-slate-50 transition-all ${selectedTel === conv.telefono ? 'bg-orange-50/30' : ''}`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-800 truncate">{conv.telefono}</p>
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">
                      {conv.total_mensajes} msgs
                    </p>
                  </div>
                  <span className="text-[9px] font-bold text-slate-300">{timeAgo(conv.ultimo_timestamp)}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate italic font-medium">{conv.ultimo_mensaje}</p>
                {conv.ultima_etiqueta && (
                  <span className="inline-block mt-1.5 text-[9px] font-black px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B00] uppercase tracking-widest">
                    {conv.ultima_etiqueta}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Middle: chat thread */}
        <div className="flex-1 flex flex-col bg-[#FDFDFD]">
          <div className="h-20 border-b border-slate-100 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md shrink-0">
            {selectedTel ? (
              <>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-800 text-[#FF6B00] flex items-center justify-center font-black text-sm border border-[#FF6B00]">OC</div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{selectedTel}</p>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">IA Gestionando</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mensajes.length} mensajes</span>
              </>
            ) : (
              <p className="text-sm font-bold text-slate-400 italic">Seleccioná una conversación</p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-4">
            {!selectedTel && (
              <div className="h-full flex items-center justify-center text-slate-300 text-sm font-bold italic">
                Seleccioná una conversación para ver los mensajes
              </div>
            )}
            {mensajes.map(msg => (
              <div key={msg.id} className={`flex ${msg.direccion === 'entrada' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[70%] p-4 rounded-[24px] text-sm shadow-sm ${
                  msg.direccion === 'entrada'
                    ? 'bg-white border border-slate-200 rounded-tl-none text-slate-800'
                    : 'bg-slate-800 text-white rounded-tr-none border-r-4 border-[#FF6B00]'
                }`}>
                  <p className="whitespace-pre-wrap font-medium leading-relaxed">{msg.mensaje}</p>
                  <div className={`flex justify-between items-center mt-2 gap-4 text-[10px] ${msg.direccion === 'salida' ? 'text-slate-400' : 'text-slate-400'}`}>
                    {msg.agente && <span className="font-black uppercase tracking-widest">{msg.agente}</span>}
                    <span>{new Date(msg.timestamp).toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white border-t border-slate-100 shrink-0">
            <div className="flex space-x-4">
              <div className="flex-1 relative flex items-center">
                <Paperclip size={18} className="absolute left-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Intervenir chat..."
                  className="w-full bg-slate-50 border border-slate-200 pl-12 pr-6 py-4 rounded-3xl text-sm outline-none font-medium italic focus:ring-1 focus:ring-[#FF6B00] transition-all"
                />
              </div>
              <button className="bg-slate-800 text-[#FF6B00] p-4 rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95">
                <SendHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: contact info */}
        {selected && (
          <div className="w-72 border-l border-slate-100 p-8 flex flex-col space-y-6 bg-white overflow-y-auto shrink-0">
            <div className="text-center">
              <div className="h-16 w-16 rounded-[24px] bg-slate-900 mx-auto mb-4 flex items-center justify-center text-[#FF6B00] text-xl font-black shadow-xl border border-[#FF6B00]">
                OC
              </div>
              <h4 className="text-base font-black text-slate-800 italic">{selected.telefono}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Contacto WhatsApp</p>
            </div>

            <div className="bg-orange-50 p-5 rounded-[24px] border border-orange-100">
              <p className="text-[10px] font-black text-[#FF6B00] uppercase tracking-widest mb-1 text-center">Total Mensajes</p>
              <p className="text-3xl font-black text-[#FF6B00] text-center tracking-tighter">{selected.total_mensajes}</p>
            </div>

            {selected.ultima_etiqueta && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Última Etiqueta</p>
                <span className="text-xs font-black text-slate-700 uppercase">{selected.ultima_etiqueta}</span>
              </div>
            )}

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Último Mensaje</p>
              <p className="text-xs font-medium text-slate-600 italic leading-relaxed">{selected.ultimo_mensaje}</p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
