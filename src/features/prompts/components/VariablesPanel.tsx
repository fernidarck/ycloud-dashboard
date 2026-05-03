'use client'
const VARIABLES = ['{{nombre}}', '{{pais}}', '{{descripcion}}', '{{tono}}']
const SECCIONES = [
  { label: '# PROTOCOLO', text: '\n\n# 📋 NUEVO PROTOCOLO\n\n## Descripción\n[Describe aquí]\n\n## Pasos\n1. Paso 1\n2. Paso 2\n' },
  { label: '# REGLA CRÍTICA', text: '\n\n## Regla N: [Nombre]\n[Descripción]\n\n✅ "[Ejemplo bueno]"\n❌ "[Ejemplo malo]"\n' },
  { label: '# EJEMPLO', text: '\n\n## Ejemplo N: [Situación]\n\n**Cliente**: "[mensaje]"\n\n✅ BIEN:\n"[respuesta correcta]"\n\n❌ MAL:\n"[respuesta incorrecta]"\n' },
]
interface Props { onInsertVariable: (v: string) => void; onInsertSeccion: (s: string) => void }
export function VariablesPanel({ onInsertVariable, onInsertSeccion }: Props) {
  return (
    <div className="w-60 border-l bg-gray-50 p-4 space-y-4 shrink-0 overflow-y-auto">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Variables</h3>
        <div className="space-y-1">
          {VARIABLES.map(v => <button key={v} onClick={() => onInsertVariable(v)} className="w-full text-left px-3 py-1.5 text-xs bg-white border rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors font-mono">{v}</button>)}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Agregar Sección</h3>
        <div className="space-y-1">
          {SECCIONES.map(s => <button key={s.label} onClick={() => onInsertSeccion(s.text)} className="w-full text-left px-3 py-1.5 text-xs bg-white border rounded-md hover:bg-green-50 hover:border-green-300 transition-colors">+ {s.label}</button>)}
        </div>
      </div>
    </div>
  )
}
