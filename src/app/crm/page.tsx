'use client'
import { useEffect, useState } from 'react'
import { AppLayout } from '@/shared/components/AppLayout'
import { Search, CheckCircle2, MoreVertical, Bot } from 'lucide-react'
import type { Conversacion } from '@/shared/types'

export default function CrmPage() {
  const [leads, setLeads] = useState<Conversacion[]>([])
  const [buscar, setBuscar] = useState('')

  useEffect(() => {
    fetch('/api/chats').then(r => r.json()).then(d => Array.isArray(d) && setLeads(d))
  }, [])

  const filtered = leads.filter(l => l.telefono.includes(buscar))

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none">Gestión de Leads</h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1 italic">Contactos capturados por WhatsApp</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Buscar número..."
                value={buscar}
                onChange={e => setBuscar(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none w-64 shadow-sm focus:ring-1 focus:ring-[#FF6B00] transition-all"
              />
            </div>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <th className="px-10 py-6">CONTACTO</th>
                  <th className="px-6 py-6 text-center">MENSAJES</th>
                  <th className="px-6 py-6 text-center">ETIQUETA</th>
                  <th className="px-6 py-6 text-center">ÚLTIMO MENSAJE</th>
                  <th className="px-10 py-6 text-right">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-10 py-8 text-center text-slate-400 text-xs italic">Sin contactos</td></tr>
                )}
                {filtered.map(lead => (
                  <tr key={lead.telefono} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-10 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-[#FF6B00]">
                          <Bot size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 leading-none group-hover:text-[#FF6B00] transition-colors">{lead.telefono}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 italic truncate max-w-[200px]">{lead.ultimo_mensaje}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-sm font-black text-slate-700">{lead.total_mensajes}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {lead.ultima_etiqueta
                        ? <span className="px-3 py-1 bg-orange-50 text-[#FF6B00] rounded-lg text-[9px] font-black uppercase tracking-widest">{lead.ultima_etiqueta}</span>
                        : <span className="text-slate-300 text-xs">—</span>
                      }
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(lead.ultimo_timestamp).toLocaleDateString('es-GT')}
                      </span>
                    </td>
                    <td className="px-10 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2 text-slate-300">
                        <button className="p-2 hover:text-emerald-500 transition-colors"><CheckCircle2 size={16} /></button>
                        <button className="p-2 hover:text-[#FF6B00] transition-colors"><MoreVertical size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
