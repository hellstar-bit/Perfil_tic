export interface Formacion {
  id: string
  nombre: string
  institucion: string
  nivel: string
  inicio: string
  fin: string
  cert: string
}

export interface Proyecto {
  id: string
  nombre: string
  descripcion: string
  tipo: string
  tecnologias: string[]
  url: string
  imagen: string
  color: string
  iniciales: string
}

export interface Experiencia {
  id: string
  cargo: string
  empresa: string
  tipo: string
  emoji: string
  inicio: string
  fin: string
  descripcion: string
}
