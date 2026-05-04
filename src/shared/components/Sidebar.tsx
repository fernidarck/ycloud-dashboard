'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, MessageSquare, Users, Calendar, Brain, Database, Zap, ShieldCheck, Power } from 'lucide-react'

const navNegocio = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chats', label: 'Conversaciones', icon: MessageSquare },
  { href: '/crm', label: 'CRM & Leads', icon: Users },
  { href: '/calendario', label: 'Agenda IA', icon: Calendar },
]

const navInteligencia = [
  { href: '/prompts', label: 'Agente IA', icon: Brain },
  { href: '/rag', label: 'Base RAG', icon: Database },
]

export function Sidebar() {
  const pathname = usePathname()
  const [botEnabled, setBotEnabled] = useState(true)

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-10">
          <div className="bg-[#FF6B00] p-2.5 rounded-2xl shadow-xl shadow-orange-100 ring-4 ring-orange-50">
            <Zap className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black leading-none tracking-tighter uppercase italic text-slate-800">OneControl</h1>
            <span className="text-[9px] text-[#FF6B00] font-black uppercase tracking-[0.3em]">SaaS Elite v4.0</span>
          </div>
        </div>

        <nav className="space-y-6">
          <div>
            <p className="px-4 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Negocio</p>
            <div className="space-y-1">
              {navNegocio.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href)
                return (
                  <Link key={href} href={href} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${active ? 'bg-orange-50 text-[#FF6B00] border border-orange-100/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
                    <Icon size={18} className={active ? 'text-[#FF6B00]' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span className="text-sm font-bold tracking-tight">{label}</span>
                    {active && <div className="ml-auto w-1.5 h-1.5 bg-[#FF6B00] rounded-full" />}
                  </Link>
                )
              })}
            </div>
          </div>
          <div>
            <p className="px-4 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inteligencia</p>
            <div className="space-y-1">
              {navInteligencia.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href)
                return (
                  <Link key={href} href={href} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${active ? 'bg-orange-50 text-[#FF6B00] border border-orange-100/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
                    <Icon size={18} className={active ? 'text-[#FF6B00]' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span className="text-sm font-bold tracking-tight">{label}</span>
                    {active && <div className="ml-auto w-1.5 h-1.5 bg-[#FF6B00] rounded-full" />}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-slate-100 bg-slate-50/30">
        <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Sistema Activo</span>
        </div>
        <button
          onClick={() => setBotEnabled(!botEnabled)}
          className={`w-full py-3 rounded-2xl flex items-center justify-center space-x-2 font-black text-[10px] uppercase tracking-widest transition-all ${botEnabled ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-200 text-slate-500'}`}
        >
          <Power size={14} />
          <span>IA {botEnabled ? 'Encendida' : 'Manual'}</span>
        </button>
      </div>
    </aside>
  )
}
