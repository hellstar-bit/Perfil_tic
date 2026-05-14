export interface HabilidadSugerida {
  nombre: string;
  categoria: string;
  sugerida?: true;
}

export const HABILIDADES_TIC: HabilidadSugerida[] = [
  // Frontend
  { nombre: "HTML",              categoria: "Frontend", sugerida: true },
  { nombre: "CSS",               categoria: "Frontend", sugerida: true },
  { nombre: "JavaScript",        categoria: "Frontend", sugerida: true },
  { nombre: "TypeScript",        categoria: "Frontend" },
  { nombre: "React",             categoria: "Frontend", sugerida: true },
  { nombre: "Next.js",           categoria: "Frontend" },
  { nombre: "Vue.js",            categoria: "Frontend" },
  { nombre: "Angular",           categoria: "Frontend" },
  { nombre: "Tailwind CSS",      categoria: "Frontend" },
  { nombre: "Bootstrap",         categoria: "Frontend" },
  { nombre: "jQuery",            categoria: "Frontend" },
  { nombre: "Sass / SCSS",       categoria: "Frontend" },

  // Backend
  { nombre: "Node.js",           categoria: "Backend" },
  { nombre: "Python",            categoria: "Backend", sugerida: true },
  { nombre: "PHP",               categoria: "Backend" },
  { nombre: "Java",              categoria: "Backend" },
  { nombre: "C#",                categoria: "Backend" },
  { nombre: "Express.js",        categoria: "Backend" },
  { nombre: "Django",            categoria: "Backend" },
  { nombre: "Laravel",           categoria: "Backend" },
  { nombre: "Spring Boot",       categoria: "Backend" },
  { nombre: "REST APIs",         categoria: "Backend" },
  { nombre: "GraphQL",           categoria: "Backend" },

  // Bases de datos
  { nombre: "SQL",               categoria: "Bases de datos", sugerida: true },
  { nombre: "MySQL",             categoria: "Bases de datos" },
  { nombre: "PostgreSQL",        categoria: "Bases de datos" },
  { nombre: "MongoDB",           categoria: "Bases de datos" },
  { nombre: "Firebase",          categoria: "Bases de datos" },
  { nombre: "SQLite",            categoria: "Bases de datos" },
  { nombre: "Redis",             categoria: "Bases de datos" },

  // Diseño
  { nombre: "Figma",             categoria: "Diseño", sugerida: true },
  { nombre: "Canva",             categoria: "Diseño", sugerida: true },
  { nombre: "Adobe XD",          categoria: "Diseño" },
  { nombre: "Photoshop",         categoria: "Diseño" },
  { nombre: "Illustrator",       categoria: "Diseño" },
  { nombre: "UI Design",         categoria: "Diseño" },
  { nombre: "UX Research",       categoria: "Diseño" },
  { nombre: "Prototipado",       categoria: "Diseño" },

  // Datos
  { nombre: "Excel avanzado",    categoria: "Datos", sugerida: true },
  { nombre: "Power BI",          categoria: "Datos", sugerida: true },
  { nombre: "Google Sheets",     categoria: "Datos" },
  { nombre: "Tableau",           categoria: "Datos" },
  { nombre: "Python para datos", categoria: "Datos" },
  { nombre: "Pandas",            categoria: "Datos" },
  { nombre: "Machine Learning",  categoria: "Datos" },
  { nombre: "ChatGPT / IA",      categoria: "Datos", sugerida: true },

  // DevOps
  { nombre: "Git",               categoria: "DevOps", sugerida: true },
  { nombre: "GitHub",            categoria: "DevOps" },
  { nombre: "Docker",            categoria: "DevOps" },
  { nombre: "Linux",             categoria: "DevOps" },
  { nombre: "AWS",               categoria: "DevOps" },
  { nombre: "Google Cloud",      categoria: "DevOps" },
  { nombre: "Azure",             categoria: "DevOps" },
  { nombre: "CI/CD",             categoria: "DevOps" },

  // Soporte
  { nombre: "Soporte nivel 1",   categoria: "Soporte" },
  { nombre: "Soporte nivel 2",   categoria: "Soporte" },
  { nombre: "Redes básicas",     categoria: "Soporte", sugerida: true },
  { nombre: "Hardware",          categoria: "Soporte" },
  { nombre: "Windows Server",    categoria: "Soporte" },
  { nombre: "Active Directory",  categoria: "Soporte" },
  { nombre: "Help Desk",         categoria: "Soporte" },
  { nombre: "ITIL básico",       categoria: "Soporte" },

  // Ofimática
  { nombre: "Microsoft Word",    categoria: "Ofimática" },
  { nombre: "Microsoft Excel",   categoria: "Ofimática" },
  { nombre: "PowerPoint",        categoria: "Ofimática" },
  { nombre: "Office 365",        categoria: "Ofimática", sugerida: true },
  { nombre: "Google Workspace",  categoria: "Ofimática" },
  { nombre: "Outlook",           categoria: "Ofimática" },
  { nombre: "Teams",             categoria: "Ofimática" },
  { nombre: "Notion",            categoria: "Ofimática" },
  { nombre: "Trello",            categoria: "Ofimática" },
  { nombre: "Jira",              categoria: "Ofimática" },

  // Mobile
  { nombre: "React Native",      categoria: "Mobile" },
  { nombre: "Flutter",           categoria: "Mobile" },
  { nombre: "Android Studio",    categoria: "Mobile" },
  { nombre: "Kotlin",            categoria: "Mobile" },

  // Marketing digital
  { nombre: "WordPress",         categoria: "Marketing digital", sugerida: true },
  { nombre: "SEO básico",        categoria: "Marketing digital" },
  { nombre: "Google Analytics",  categoria: "Marketing digital" },
  { nombre: "Redes sociales",    categoria: "Marketing digital" },
  { nombre: "Email marketing",   categoria: "Marketing digital" },
];

export const CATEGORIAS = [
  "Frontend",
  "Backend",
  "Bases de datos",
  "Diseño",
  "Datos",
  "DevOps",
  "Soporte",
  "Ofimática",
  "Mobile",
  "Marketing digital",
];
