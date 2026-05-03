'use client'
import type { PromptVersion, Agente } from '@/shared/types'
interface Props { versions: PromptVersion[]; agente: Agente; onRestore: (id: string) => Promise<void> }
export function VersionHistory({ versions, onRestore }: Props) {
  if (versions.length === 0) return <p className="text-xs text-gray-400 p-4">Sin versiones aún.</p>
  return (
    <div className="space-y-2 p-4 overflow-y-auto">
      <h3 className="text-xs font-semibold text-gray-500 uppercase">Últimas versiones</h3>
      {versions.map(v => (
        <div key={v.id} className="bg-gray-50 border rounded-md p-3 text-xs">
          <div className="flex justify-between items-start mb-1">
            <span className="text-gray-400">{new Date(v.creado_en).toLocaleString('es-GT')}</span>
            <button onClick={() => onRestore(v.id)} className="text-blue-600 hover:underline text-xs shrink-0 ml-2">Restaurar</button>
          </div>
          {v.notas && <p className="text-gray-600 italic mb-1">"{v.notas}"</p>}
          <p className="text-gray-400 truncate font-mono">{v.contenido.slice(0, 80)}...</p>
        </div>
      ))}
    </div>
  )
}
