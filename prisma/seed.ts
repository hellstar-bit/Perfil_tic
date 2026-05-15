import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

function slug(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

const SEED_SLUGS = ["laura-mendoza", "juan-luis-campo-simanca", "andres-felipe-torres"];
const SEED_EMAILS = ["laura.mendoza@perfiltic.dev", "juan.campo@perfiltic.dev", "andres.torres@perfiltic.dev"];

async function main() {
  console.log("🌱 Limpiando datos anteriores...");
  await prisma.perfil.deleteMany({ where: { slug: { in: SEED_SLUGS } } });
  await prisma.user.deleteMany({ where: { email: { in: SEED_EMAILS } } });

  const password = await hash("Password123", 12);

  /* ── 1. Laura Mendoza · Front-end · Esmeralda ─────────────── */
  const laura = await prisma.user.create({
    data: { email: "laura.mendoza@perfiltic.dev", password, name: "Laura Mendoza" },
  });

  {
    const p = await prisma.perfil.create({
      data: {
        slug: "laura-mendoza",
        nombre: "Laura Mendoza",
        cargo: "Desarrolladora Front-end Junior",
        departamento: "Atlántico",
        municipio: "Barranquilla",
        email: "laura.mendoza@perfiltic.dev",
        telefono: "+57 310 234 5678",
        frase: "Diseño interfaces que la gente disfruta usar. Me apasiona unir estética y funcionalidad en cada pixel: si algo es difícil de explicar, el problema está en el diseño, no en el usuario.",
        modalidad: "Híbrido",
        colorTema: "#0f6e56",
        userId: laura.id,
      },
    });

    await prisma.habilidad.createMany({
      data: [
        { nombre: "HTML5 / CSS3", nivel: 5, perfilId: p.id },
        { nombre: "JavaScript (ES2024)", nivel: 4, perfilId: p.id },
        { nombre: "React / Next.js", nivel: 4, perfilId: p.id },
        { nombre: "Tailwind CSS", nivel: 5, perfilId: p.id },
        { nombre: "Figma", nivel: 4, perfilId: p.id },
        { nombre: "Git / GitHub", nivel: 3, perfilId: p.id },
        { nombre: "TypeScript", nivel: 3, perfilId: p.id },
        { nombre: "Accesibilidad Web (WCAG)", nivel: 3, perfilId: p.id },
      ],
    });

    await prisma.formacion.createMany({
      data: [
        {
          programa: "Tecnología en Análisis y Desarrollo de Software",
          institucion: "SENA",
          nivel: "Técnico/Tecnólogo",
          anioInicio: "2020",
          anioFin: "2022",
          urlCert: "",
          perfilId: p.id,
        },
        {
          programa: "Diseño UX/UI — Fundamentos y Prototipado",
          institucion: "Platzi",
          nivel: "Curso/Certificación",
          anioInicio: "2022",
          anioFin: "2022",
          urlCert: "",
          perfilId: p.id,
        },
        {
          programa: "React: De Cero a Experto (Hooks y MERN)",
          institucion: "Udemy",
          nivel: "Curso/Certificación",
          anioInicio: "2023",
          anioFin: "2023",
          urlCert: "",
          perfilId: p.id,
        },
        {
          programa: "Accesibilidad Web para Desarrolladores",
          institucion: "Google (Developers Training)",
          nivel: "Curso/Certificación",
          anioInicio: "2024",
          anioFin: "2024",
          urlCert: "",
          perfilId: p.id,
        },
      ],
    });

    await prisma.proyecto.createMany({
      data: [
        {
          titulo: "PerfilTIC",
          descripcion: "Plataforma web de código abierto para crear CVs digitales y portafolios dirigida a profesionales TIC colombianos. Implementé el sistema de diseño completo en Tailwind v4, los formularios multi-paso y la generación de PDF con react-pdf.",
          tag: "Académico, Next.js, Tailwind CSS, Prisma, react-pdf",
          enlace: "https://github.com/laura/perfiltic",
          perfilId: p.id,
        },
        {
          titulo: "Tienda Artesanal 'Palma del Río'",
          descripcion: "E-commerce para artesanos del Atlántico con catálogo dinámico, carrito persistente y pasarela de pagos con Wompi. Logré que el tiempo de carga inicial fuera menor a 1.2 s en conexiones 3G.",
          tag: "Freelance, Next.js, Stripe, Firebase, Tailwind CSS",
          enlace: "",
          perfilId: p.id,
        },
        {
          titulo: "Dashboard de Métricas Educativas",
          descripcion: "Panel administrativo para el SENA Regional Atlántico que centraliza indicadores de 4 centros de formación. Visualizaciones con Recharts y exportación a Excel. Reducción del 80 % en tiempo de generación de informes mensuales.",
          tag: "Laboral, React, Recharts, Node.js, PostgreSQL",
          enlace: "",
          perfilId: p.id,
        },
        {
          titulo: "App de Turnos — Clínica Verde",
          descripcion: "Aplicación web progresiva para gestión de turnos en consultorios. Incluye notificaciones push, vista en pantalla para sala de espera y exportación de estadísticas. Eliminó el 100 % del proceso en papel.",
          tag: "Freelance, React, PWA, Firebase, Tailwind CSS",
          enlace: "",
          perfilId: p.id,
        },
      ],
    });

    await prisma.experiencia.createMany({
      data: [
        {
          cargo: "Desarrolladora Front-end Junior",
          empresa: "Agencia Digital Costa Norte",
          periodo: "Feb 2023 — Presente",
          descripcion: "Desarrollo interfaces para clientes del sector financiero y retail. Migré un sistema legacy de jQuery a React reduciendo el bundle en un 45 %. Implementé un design system con 40+ componentes reutilizables adoptado por 3 equipos.",
          tipo: "empleo",
          perfilId: p.id,
        },
        {
          cargo: "Desarrolladora Web (Práctica Empresarial)",
          empresa: "Alcaldía Distrital de Barranquilla",
          periodo: "Jul 2022 — Ene 2023",
          descripcion: "Rediseñé el portal de trámites ciudadanos mejorando la usabilidad y reduciendo las llamadas de soporte en un 35 %. Apliqué auditorías de accesibilidad WCAG 2.1 nivel AA en 12 formularios clave.",
          tipo: "empleo",
          perfilId: p.id,
        },
        {
          cargo: "Instructora Auxiliar de Diseño Web",
          empresa: "SENA Regional Atlántico",
          periodo: "Ago 2021 — Jun 2022",
          descripcion: "Acompañé a 30 aprendices del programa Diseño Web en sus proyectos finales. Dicté talleres de HTML/CSS accesible y responsive design. El 85 % de mis aprendices aprobó con valoración sobresaliente.",
          tipo: "sena",
          perfilId: p.id,
        },
        {
          cargo: "Voluntaria — Formación Digital",
          empresa: "Fundación Barranquilla Digital",
          periodo: "Ene 2021 — Jul 2021",
          descripcion: "Enseñé fundamentos de computación e internet a 60 adultos mayores de comunidades vulnerables del suroccidente de Barranquilla como parte del programa 'Conectados Sin Edad'.",
          tipo: "voluntariado",
          perfilId: p.id,
        },
      ],
    });

    console.log("  ✓ Laura Mendoza →", p.slug, "· Color:", p.colorTema);
  }

  /* ── 2. Juan Luis Campo Simanca · Full Stack · Azul marino ─── */
  const juan = await prisma.user.create({
    data: { email: "juan.campo@perfiltic.dev", password, name: "Juan Luis Campo Simanca" },
  });

  {
    const p = await prisma.perfil.create({
      data: {
        slug: "juan-luis-campo-simanca",
        nombre: "Juan Luis Campo Simanca",
        cargo: "Desarrollador Full Stack",
        departamento: "Bolívar",
        municipio: "Cartagena",
        email: "juan.campo@perfiltic.dev",
        telefono: "+57 301 456 7890",
        frase: "Full Stack con 3 años construyendo APIs REST escalables y UIs en React. Me especializo en arquitecturas limpias y en escribir código que otros disfrutan mantener.",
        modalidad: "Remoto",
        colorTema: "#1a3a6b",
        userId: juan.id,
      },
    });

    await prisma.habilidad.createMany({
      data: [
        { nombre: "Node.js / Express", nivel: 5, perfilId: p.id },
        { nombre: "React / Next.js", nivel: 4, perfilId: p.id },
        { nombre: "PostgreSQL", nivel: 4, perfilId: p.id },
        { nombre: "TypeScript", nivel: 4, perfilId: p.id },
        { nombre: "Docker", nivel: 3, perfilId: p.id },
        { nombre: "AWS (EC2, S3, RDS)", nivel: 2, perfilId: p.id },
        { nombre: "Python / FastAPI", nivel: 3, perfilId: p.id },
      ],
    });

    await prisma.formacion.createMany({
      data: [
        { programa: "Ingeniería de Sistemas", institucion: "Universidad de Cartagena", nivel: "Universitario", anioInicio: "2018", anioFin: "2023", urlCert: "", perfilId: p.id },
        { programa: "AWS Cloud Practitioner", institucion: "Amazon Web Services", nivel: "Curso/Certificación", anioInicio: "2024", anioFin: "2024", urlCert: "", perfilId: p.id },
      ],
    });

    await prisma.proyecto.createMany({
      data: [
        { titulo: "API de Gestión Municipal", descripcion: "Sistema REST para la Alcaldía de Cartagena que digitalizó trámites ciudadanos. Reducción del 60 % en tiempos de atención presencial.", tag: "Laboral, Node.js, PostgreSQL, Docker", enlace: "", perfilId: p.id },
        { titulo: "LMS Educativo", descripcion: "Plataforma de aprendizaje con módulos de video, quizzes y reportes de progreso para 2 000+ estudiantes.", tag: "Académico, Next.js, TypeScript, Prisma", enlace: "https://github.com/juancampo/lms", perfilId: p.id },
        { titulo: "App de Domicilios Local", descripcion: "Aplicación móvil-friendly para restaurantes locales con seguimiento en tiempo real usando WebSockets.", tag: "Freelance, React, Socket.io, Express", enlace: "", perfilId: p.id },
      ],
    });

    await prisma.experiencia.createMany({
      data: [
        { cargo: "Desarrollador Full Stack", empresa: "Softex Colombia S.A.S.", periodo: "Feb 2023 — Presente", descripcion: "Lideré la migración de una aplicación legacy PHP a Node.js + React, mejorando el rendimiento en un 45 %.", tipo: "empleo", perfilId: p.id },
        { cargo: "Desarrollador Back-end (Prácticas)", empresa: "TechCaribe SAS", periodo: "Jul 2022 — Ene 2023", descripcion: "Diseñé APIs REST para plataforma B2B. Documenté con Swagger y escribí pruebas con Jest.", tipo: "empleo", perfilId: p.id },
        { cargo: "Tutor de Programación", empresa: "Fundación Código Caribe", periodo: "Ene 2021 — Jun 2022", descripcion: "Enseñé programación a 40 jóvenes de comunidades vulnerables de Cartagena.", tipo: "voluntariado", perfilId: p.id },
      ],
    });

    console.log("  ✓ Juan Luis Campo Simanca →", p.slug, "· Color:", p.colorTema);
  }

  /* ── 3. Andrés Felipe Torres · Soporte TIC · Antracita ─────── */
  const andres = await prisma.user.create({
    data: { email: "andres.torres@perfiltic.dev", password, name: "Andrés Felipe Torres" },
  });

  {
    const p = await prisma.perfil.create({
      data: {
        slug: "andres-felipe-torres",
        nombre: "Andrés Felipe Torres",
        cargo: "Técnico de Soporte TIC",
        departamento: "Antioquia",
        municipio: "Medellín",
        email: "andres.torres@perfiltic.dev",
        telefono: "+57 315 678 9012",
        frase: "Técnico certificado con 4 años resolviendo problemas de infraestructura y redes. Me motiva que los sistemas funcionen bien para que las personas puedan hacer su trabajo sin pensar en la tecnología.",
        modalidad: "Presencial",
        colorTema: "#2d3748",
        userId: andres.id,
      },
    });

    await prisma.habilidad.createMany({
      data: [
        { nombre: "Soporte técnico N1/N2", nivel: 5, perfilId: p.id },
        { nombre: "Redes LAN/WAN", nivel: 4, perfilId: p.id },
        { nombre: "Windows Server 2019", nivel: 4, perfilId: p.id },
        { nombre: "Linux (Ubuntu Server)", nivel: 3, perfilId: p.id },
        { nombre: "Active Directory", nivel: 4, perfilId: p.id },
        { nombre: "ITIL v4", nivel: 3, perfilId: p.id },
        { nombre: "Cisco IOS", nivel: 3, perfilId: p.id },
      ],
    });

    await prisma.formacion.createMany({
      data: [
        { programa: "Técnico en Sistemas", institucion: "SENA", nivel: "Técnico/Tecnólogo", anioInicio: "2017", anioFin: "2019", urlCert: "", perfilId: p.id },
        { programa: "Tecnología en Redes de Computadores", institucion: "Politécnico Colombiano Jaime Isaza Cadavid", nivel: "Técnico/Tecnólogo", anioInicio: "2019", anioFin: "2021", urlCert: "", perfilId: p.id },
        { programa: "CompTIA A+", institucion: "CompTIA", nivel: "Curso/Certificación", anioInicio: "2022", anioFin: "2022", urlCert: "", perfilId: p.id },
      ],
    });

    await prisma.proyecto.createMany({
      data: [
        { titulo: "Migración a Nube Híbrida", descripcion: "Lideré la migración de 80 equipos y 3 servidores a entorno híbrido Azure + local. Reducción del 70 % en tiempos de inactividad.", tag: "Laboral, Azure, Windows Server, VMware", enlace: "", perfilId: p.id },
        { titulo: "Mesa de Ayuda con GLPI", descripcion: "Implementé GLPI para gestión de tickets en empresa con 200 usuarios. Tiempo de resolución promedio: de 48 a 12 horas.", tag: "Laboral, GLPI, PHP, MySQL", enlace: "", perfilId: p.id },
      ],
    });

    await prisma.experiencia.createMany({
      data: [
        { cargo: "Coordinador de Soporte TIC", empresa: "Grupo Empresarial Andino", periodo: "Mar 2022 — Presente", descripcion: "Administro infraestructura de 3 sedes con 200 usuarios. Gestiono Windows Server, Active Directory, VPN y backups diarios.", tipo: "empleo", perfilId: p.id },
        { cargo: "Técnico de Soporte", empresa: "Servicio de Internet Comunal", periodo: "Ago 2019 — Feb 2022", descripcion: "Instalación y mantenimiento de redes inalámbricas para comunidades rurales de Antioquia. Conecté más de 500 hogares sin acceso previo a internet.", tipo: "comunitario", perfilId: p.id },
        { cargo: "Aprendiz SENA", empresa: "Secretaría de Educación de Medellín", periodo: "Ene 2019 — Jul 2019", descripcion: "Soporte técnico en 5 colegios públicos. Mantenimiento preventivo de 300 equipos e instalación de software educativo.", tipo: "sena", perfilId: p.id },
      ],
    });

    console.log("  ✓ Andrés Felipe Torres →", p.slug, "· Color:", p.colorTema);
  }

  console.log("\n✅ Seed completado. Contraseña: Password123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
