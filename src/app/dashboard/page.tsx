'use client'
import { useEffect, useState } from 'react'
import { AppLayout } from '@/shared/components/AppLayout'
import { LayoutDashboard, Calendar, TrendingUp, Zap, ArrowUpRight, PieChart, MessageSquare } from 'lucide-react'

export default function DashboardPage() {
  const [totalConv, setTotalConv] = useState(0)
  const [totalCitas, setTotalCitas] = useState(0)

  useEffect(() => {
    fetch('/api/chats').then(r => r.json()).then(d => Array.isArray(d) && setTotalConv(d.length))
    fetch('/api/citas').then(r => r.json()).then(d => Array.isArray(d) && setTotalCitas(d.length))
  }, [])

  const stats = [
    { l: 'Conversaciones', v: totalConv, i: MessageSquare, c: 'text-blue-600', bg: 'bg-blue-50' },
    { l: 'Citas Agendadas', v: totalCitas, i: Calendar, c: 'text-emerald-600', bg: 'bg-emerald-50' },
    { l: 'Score Promedio', v: '78%', i: TrendingUp, c: 'text-indigo-600', bg: 'bg-indigo-50' },
    { l: 'Ahorro ROI', v: 'Q24.5k', i: Zap, c: 'text-[#FF6B00]', bg: 'bg-orange-50' },
  ]

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Resumen Elite</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Gestión de impacto y conversiones</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-7 rounded-[32px] border border-slate-200 shadow-sm hover:border-[#FF6B00]/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{s.l}</p>
                  <div className={`${s.bg} p-2 rounded-xl`}><s.i size={16} className={s.c} /></div>
                </div>
                <h3 className={`text-3xl font-black tracking-tighter ${s.c}`}>{s.v}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-10 rounded-[40px] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-black text-[#FF6B00] uppercase tracking-[0.3em] mb-4">Performance IA</p>
                <h4 className="text-2xl font-black italic mb-2 tracking-tight">
                  Tu Agente IA ha ahorrado <span className="text-emerald-400">42 horas</span> de atención este mes.
                </h4>
                <p className="text-slate-400 text-xs font-medium mt-4">Basado en {totalConv} conversaciones gestionadas automáticamente.</p>
              </div>
              <ArrowUpRight className="absolute -right-8 -top-8 text-white/5 w-64 h-64" />
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Distribución de Contactos</p>
                <PieChart size={20} className="text-slate-300" />
              </div>
              <div className="space-y-4">
                {[['WhatsApp Directo', 70], ['Facebook Ads', 50], ['Orgánico', 30]].map(([origin, pct], idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{origin}</span>
                    <div className="flex-1 mx-4 h-1.5 bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF6B00] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-slate-800">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
