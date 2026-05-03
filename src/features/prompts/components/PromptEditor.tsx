'use client'
import { useEffect, useRef, useCallback } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, lineNumbers } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'

interface Props { value: string; onChange: (v: string) => void; onInsertRef?: (fn: (text: string) => void) => void }

export function PromptEditor({ value, onChange, onInsertRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  useEffect(() => { onChangeRef.current = onChange }, [onChange])

  const insertText = useCallback((text: string) => {
    if (!viewRef.current) return
    const view = viewRef.current
    const { from } = view.state.selection.main
    view.dispatch({ changes: { from, insert: text }, selection: { anchor: from + text.length } })
    view.focus()
  }, [])

  useEffect(() => { if (onInsertRef) onInsertRef(insertText) }, [onInsertRef, insertText])

  useEffect(() => {
    if (!containerRef.current) return
    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(), history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        markdown(),
        EditorView.updateListener.of(u => { if (u.docChanged) onChangeRef.current(u.state.doc.toString()) }),
        EditorView.theme({ '&': { height: '100%', fontSize: '13px' }, '.cm-scroller': { overflow: 'auto', fontFamily: 'monospace' } }),
      ],
    })
    const view = new EditorView({ state, parent: containerRef.current })
    viewRef.current = view
    return () => view.destroy()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef} className="h-full border rounded-md overflow-hidden bg-white" />
}
