'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { AppLayout } from '@/shared/components/AppLayout'
import { PromptEditor } from '@/features/prompts/components/PromptEditor'
import { VariablesPanel } from '@/features/prompts/components/VariablesPanel'
import { VersionHistory } from '@/features/prompts/components/VersionHistory'
import type { Agente, PromptVersion } from '@/shared/types'

export default function PromptsPage() {
  const [agente, setAgente] = useState<Agente>('recepcionista')
  const [contenido, setContenido] = useState('')
  const [versions, setVersions] = useState<PromptVersion[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const insertFnRef = useRef<((text: string) => void) | null>(null)

  async function loadPrompt(ag: Agente) {
    const res = await fetch(`/api/prompts?agente=${ag}`)
    const data = await res.json()
    setContenido(data.contenido ?? '')
  }
  async function loadVersions(ag: Agente) {
    const res = await fetch(`/api/prompts/versions?agente=${ag}`)
    setVersions(await res.json())
  }

  useEffect(() => { loadPrompt(agente); loadVersions(agente) }, [agente])

  async function handleSave() {
    const notas = prompt('Nota opcional (¿Qué cambiaste?):') ?? undefined
    setSaving(true)
    await fetch('/api/prompts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ agente, contenido, notas }) })
    await loadVersions(agente)
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  async function handleRestore(id: string) {
    if (!confirm('¿Restaurar esta versión?')) return
    const res = await fetch('/api/prompts/versions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, agente }) })
    const data = await res.json()
    setContenido(data.contenido)
    await loadVersions(agente)
  }

  const handleInsertRef = useCallback((fn: (text: string) => void) => { insertFnRef.current = fn }, [])

  return (
    <AppLayout>
      <div className="flex flex-col h-screen">
        <div className="p-4 border-b bg-white flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            {(['recepcionista', 'vendedor'] as Agente[]).map(ag => (
              <button key={ag} onClick={() => setAgente(ag)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${agente === ag ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                {ag}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">{contenido.length.toLocaleString()} caracteres</span>
            <button onClick={() => setShowHistory(h => !h)} className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
              {showHistory ? 'Editor' : 'Historial'}
            </button>
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50 hover:bg-blue-700 transition-colors">
              {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar en n8n'}
            </button>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-4 overflow-hidden">
            <PromptEditor value={contenido} onChange={setContenido} onInsertRef={handleInsertRef} />
          </div>
          {showHistory
            ? <div className="w-72 border-l"><VersionHistory versions={versions} agente={agente} onRestore={handleRestore} /></div>
            : <VariablesPanel onInsertVariable={v => insertFnRef.current?.(v)} onInsertSeccion={s => insertFnRef.current?.(s)} />
          }
        </div>
      </div>
    </AppLayout>
  )
}
