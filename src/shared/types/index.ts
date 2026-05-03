export type Direccion = 'entrada' | 'salida'
export type Agente = 'recepcionista' | 'vendedor'
export type EstadoCita = 'pendiente' | 'confirmada' | 'completada' | 'cancelada'

export interface Mensaje {
  id: string
  telefono: string
  mensaje: string
  direccion: Direccion
  agente: Agente | null
  etiqueta: string | null
  timestamp: string
}

export interface Conversacion {
  telefono: string
  ultimo_mensaje: string
  ultimo_timestamp: string
  ultima_etiqueta: string | null
  total_mensajes: number
}

export interface Cita {
  id: string
  telefono: string
  nombre: string | null
  servicio: string | null
  monto: string | null
  direccion: string | null
  estado: EstadoCita
  fecha_cita: string | null
  notas: string | null
  created_at: string
}

export interface PromptVersion {
  id: string
  agente: Agente
  contenido: string
  notas: string | null
  creado_en: string
}
