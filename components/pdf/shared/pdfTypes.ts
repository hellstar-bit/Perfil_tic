export type PerfilData = {
  id: string;
  slug: string;
  nombre: string;
  cargo: string;
  departamento: string;
  municipio: string;
  email: string;
  telefono?: string | null;
  foto?: string | null;
  frase?: string | null;
  modalidad?: string | null;
  colorTema?: string | null;
  disponible: boolean;
  habilidades: { id: string; nombre: string; nivel: number }[];
  proyectos: { id: string; titulo: string; descripcion: string; tag?: string | null; enlace?: string | null }[];
  formacion: { id: string; programa: string; institucion: string; nivel: string; anioInicio: string; anioFin: string }[];
  experiencia: { id: string; cargo: string; empresa: string; periodo: string; descripcion: string; tipo: string }[];
};

export type TemplateId =
  | "clasica"
  | "ejecutiva"
  | "tech"
  | "minimalista"
  | "compacta"
  | "internacional"
  | "creativa";

export interface TemplateMetadata {
  id: TemplateId;
  nombre: string;
  descripcion: string;
  atsScore: number;
  atsLabel: string;
  idealPara: string[];
  warning?: string;
  preview: string;
  previewAccent: string;
}

export const TEMPLATES: TemplateMetadata[] = [
  {
    id: "clasica",
    nombre: "Clásica",
    descripcion: "Una columna limpia. Compatible con todos los sistemas ATS.",
    atsScore: 100,
    atsLabel: "100% compatible",
    idealPara: ["Primera búsqueda de empleo", "Cualquier empresa", "Sector corporativo"],
    preview: "#ffffff",
    previewAccent: "#0f6e56",
  },
  {
    id: "ejecutiva",
    nombre: "Ejecutiva",
    descripcion: "Estilo formal con tipografía serif. Para cargos senior.",
    atsScore: 100,
    atsLabel: "100% compatible",
    idealPara: ["Cargos senior", "Banca y finanzas", "Gobierno", "Grandes empresas"],
    preview: "#ffffff",
    previewAccent: "#c0a96b",
  },
  {
    id: "tech",
    nombre: "Tech",
    descripcion: "Dos columnas con sidebar de color. Visual y funcional.",
    atsScore: 92,
    atsLabel: "92% compatible",
    idealPara: ["Desarrolladores", "Diseñadores", "Perfiles digitales"],
    preview: "#0f6e56",
    previewAccent: "#00E5A0",
  },
  {
    id: "minimalista",
    nombre: "Minimalista",
    descripcion: "Espaciado amplio, solo blanco y negro. Elegancia pura.",
    atsScore: 98,
    atsLabel: "98% compatible",
    idealPara: ["Diseñadores UX/UI", "Creativos", "Agencias"],
    preview: "#ffffff",
    previewAccent: "#000000",
  },
  {
    id: "compacta",
    nombre: "Compacta",
    descripcion: "Máximo contenido en mínimo espacio. Todo en una página.",
    atsScore: 100,
    atsLabel: "100% compatible",
    idealPara: ["Perfiles completos", "Experiencia extensa", "Postulaciones masivas"],
    preview: "#1B2A4A",
    previewAccent: "#2563EB",
  },
  {
    id: "internacional",
    nombre: "Internacional",
    descripcion: "Formato USA/UK. Secciones en inglés, sin foto.",
    atsScore: 100,
    atsLabel: "100% compatible",
    idealPara: ["Empresas extranjeras", "Multinacionales", "Trabajo remoto global"],
    preview: "#ffffff",
    previewAccent: "#0066CC",
  },
  {
    id: "creativa",
    nombre: "Creativa",
    descripcion: "Sidebar oscuro con acento neón. Máximo impacto visual.",
    atsScore: 75,
    atsLabel: "75% compatible",
    idealPara: ["Diseño y marketing", "Medios y comunicación", "Startups"],
    warning: "Esta plantilla tiene compatibilidad ATS reducida (75%). Ideal para agencias creativas y startups.",
    preview: "#0E0E0E",
    previewAccent: "#00E5A0",
  },
];
