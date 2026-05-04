'use client'
import { AppLayout } from '@/shared/components/AppLayout'
import { CheckCircle2, Trash2, Upload } from 'lucide-react'

const docs = [
  { t: 'Precios Motores 2026', c: 'Ventas', s: 'Sincronizado' },
  { t: 'Manual Instalación FAAC', c: 'Técnico', s: 'Sincronizado' },
  { t: 'Políticas de Garantía', c: 'Legal', s: 'Sincronizado' },
]

export default function RagPage() {
  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Base de Conocimientos</h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1 italic">Entrenamiento de la IA con manuales y documentos</p>
            </div>
            <button className="bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase shadow-xl shadow-emerald-100 flex items-center space-x-2 hover:bg-emerald-600 transition-all">
              <Upload size={16} />
              <span>Subir Documento</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {docs.map((doc, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:border-[#FF6B00]/30 transition-all flex flex-col justify-between group">
                <div>
                  <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-4 block">{doc.c}</span>
                  <h4 className="text-lg font-black text-slate-800 mb-2 italic group-hover:text-[#FF6B00] transition-colors">{doc.t}</h4>
                </div>
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50">
                  <div className="flex items-center space-x-2 text-emerald-500">
                    <CheckCircle2 size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{doc.s}</span>
                  </div>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 p-10 rounded-[40px] text-white">
            <p className="text-[10px] font-black text-[#FF6B00] uppercase tracking-[0.3em] mb-3">Próximamente</p>
            <h4 className="text-xl font-black italic mb-2">RAG con Supabase + pgvector</h4>
            <p className="text-slate-400 text-sm font-medium">Integración de base vectorial para respuestas precisas basadas en tus documentos.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
