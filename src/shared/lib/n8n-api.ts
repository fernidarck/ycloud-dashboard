import type { Agente } from '@/shared/types'

const N8N_API_URL = process.env.N8N_API_URL!
const N8N_API_KEY = process.env.N8N_API_KEY!
const WORKFLOW_ID = process.env.N8N_WORKFLOW_ID!

const NODE_NAMES: Record<Agente, string> = {
  recepcionista: 'recepcionista1',
  vendedor: 'VENDEDOR1',
}

async function fetchWorkflow() {
  const res = await fetch(`${N8N_API_URL}/api/v1/workflows/${WORKFLOW_ID}`, {
    headers: { 'X-N8N-API-KEY': N8N_API_KEY },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`n8n API error: ${res.status}`)
  return res.json()
}

export async function getSystemPrompt(agente: Agente): Promise<string> {
  const workflow = await fetchWorkflow()
  const nodeName = NODE_NAMES[agente]
  const node = workflow.nodes.find((n: any) => n.name === nodeName)
  return node?.parameters?.options?.systemMessage ?? ''
}

export async function updateSystemPrompt(agente: Agente, prompt: string): Promise<void> {
  const workflow = await fetchWorkflow()
  const nodeName = NODE_NAMES[agente]
  const updatedNodes = workflow.nodes.map((node: any) => {
    if (node.name !== nodeName) return node
    return {
      ...node,
      parameters: {
        ...node.parameters,
        options: { ...node.parameters.options, systemMessage: prompt },
      },
    }
  })
  const res = await fetch(`${N8N_API_URL}/api/v1/workflows/${WORKFLOW_ID}`, {
    method: 'PUT',
    headers: { 'X-N8N-API-KEY': N8N_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...workflow, nodes: updatedNodes }),
  })
  if (!res.ok) throw new Error(`n8n update error: ${res.status}`)
}
