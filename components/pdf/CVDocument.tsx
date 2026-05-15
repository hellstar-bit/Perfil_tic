import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { getLightColor } from "@/lib/paleta";

/* ─── Static tokens (layout & typography only) ─── */
const C = {
  text:     "#15130f",
  muted:    "#57514a",
  border:   "#e6e2db",
  white:    "#ffffff",
  wA75:     "rgba(255,255,255,0.75)",
  wA60:     "rgba(255,255,255,0.60)",
  wA50:     "rgba(255,255,255,0.50)",
  wA20:     "rgba(255,255,255,0.20)",
  wA15:     "rgba(255,255,255,0.15)",
  wA85:     "rgba(255,255,255,0.85)",
};

const styles = StyleSheet.create({
  page:     { flexDirection: "row", fontFamily: "Helvetica", fontSize: 9 },

  sidebar:  { width: "32%", padding: 20, color: C.white },
  avatar:   { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  avatarText: { color: C.white, fontSize: 22, fontFamily: "Helvetica-Bold" },
  nombre:   { fontSize: 14, fontFamily: "Helvetica-Bold", color: C.white, lineHeight: 1.2, marginBottom: 3 },
  cargo:    { fontSize: 9, color: C.wA75, marginBottom: 14 },

  sideHeader: {
    fontSize: 7, fontFamily: "Helvetica-Bold", color: C.wA50, letterSpacing: 1.2,
    borderBottomWidth: 0.5, borderBottomColor: C.wA20, paddingBottom: 4, marginBottom: 8, marginTop: 14,
  },
  contactRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  contactText: { fontSize: 8, color: C.wA85 },

  skillItem:  { marginBottom: 8 },
  skillName:  { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 2 },
  skillLevel: { fontSize: 7.5, color: C.wA60, marginBottom: 3 },
  skillBars:  { flexDirection: "row" },
  skillBar:   { height: 3, flex: 1, borderRadius: 2 },
  skillBarFill:  { backgroundColor: C.white },
  skillBarEmpty: { backgroundColor: C.wA20 },

  chip:     { backgroundColor: C.wA15, borderRadius: 4, paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, marginRight: 4, marginBottom: 4 },
  chipText: { fontSize: 8, color: C.white },

  footer: {
    position: "absolute", bottom: 14, left: 20, right: 20,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    borderTopWidth: 0.5, borderTopColor: C.wA15, paddingTop: 6,
  },
  footerText: { fontSize: 7, color: C.wA50 },
  footerBold: { fontSize: 7, color: C.wA50, fontFamily: "Helvetica-Bold" },

  main: { width: "68%", backgroundColor: C.white, padding: 24 },

  mainHeader: {
    fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1.5,
    borderBottomWidth: 1, borderBottomColor: C.border, paddingBottom: 4, marginBottom: 10, marginTop: 14,
  },
  frase: { fontSize: 10, color: "#3c3833", lineHeight: 1.55, marginBottom: 4, fontStyle: "italic" },

  timelineItem:   { flexDirection: "row", marginBottom: 10 },
  timelineYear:   { width: 72, fontSize: 7.5, fontFamily: "Helvetica-Bold", paddingTop: 1, marginRight: 10 },
  timelineContent: { flex: 1 },
  timelineTitle:  { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.text, marginBottom: 1 },
  timelineInst:   { fontSize: 8.5, marginBottom: 2 },
  timelineDesc:   { fontSize: 8, color: C.muted, lineHeight: 1.4 },

  proyectoCard: { borderWidth: 1, borderColor: C.border, borderRadius: 6, padding: 8, marginBottom: 6 },
  proyectoHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 3 },
  proyectoNombre: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: C.text },
  proyectoTipo:   { fontSize: 7.5, paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, borderRadius: 4 },
  proyectoDesc:   { fontSize: 8, color: C.muted, lineHeight: 1.4, marginBottom: 4 },
  proyectoTecs:   { fontSize: 7.5, color: "#7a7368" },
  proyectoLink:   { fontSize: 7.5, textDecoration: "underline", marginTop: 2 },
});

/* ─── Types ─── */
type PerfilData = {
  id: string;
  slug: string;
  nombre: string;
  cargo: string;
  departamento: string;
  municipio: string;
  email: string;
  telefono?: string | null;
  frase?: string | null;
  modalidad?: string | null;
  colorTema?: string | null;
  disponible: boolean;
  habilidades: { id: string; nombre: string; nivel: number }[];
  proyectos: { id: string; titulo: string; descripcion: string; tag?: string | null; enlace?: string | null }[];
  formacion: { id: string; programa: string; institucion: string; nivel: string; anioInicio: string; anioFin: string }[];
  experiencia: { id: string; cargo: string; empresa: string; periodo: string; descripcion: string; tipo: string }[];
};

const LEVELS = ["Sé poco", "Básico", "Intermedio", "Avanzado", "Experto"];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

function parseTag(tag: string | null | undefined): { tipo: string; techs: string[] } {
  const parts = (tag ?? "").split(", ").map((s) => s.trim()).filter(Boolean);
  return { tipo: parts[0] ?? "", techs: parts.slice(1) };
}

/* ─── Sub-components ─── */
function SkillBar({ nombre, nivel }: { nombre: string; nivel: number }) {
  return (
    <View style={styles.skillItem}>
      <Text style={styles.skillName}>{nombre}</Text>
      <Text style={styles.skillLevel}>{LEVELS[nivel - 1] ?? ""}</Text>
      <View style={styles.skillBars}>
        {[1, 2, 3, 4, 5].map((i, idx) => (
          <View key={i} style={[styles.skillBar, i <= nivel ? styles.skillBarFill : styles.skillBarEmpty, { marginRight: idx < 4 ? 2 : 0 }]} />
        ))}
      </View>
    </View>
  );
}

function TimelineItem({ titulo, institucion, periodo, descripcion, color }: {
  titulo: string; institucion?: string; periodo: string; descripcion?: string | null; color: string;
}) {
  return (
    <View style={styles.timelineItem}>
      <Text style={[styles.timelineYear, { color }]}>{periodo}</Text>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineTitle}>{titulo}</Text>
        {!!institucion && <Text style={[styles.timelineInst, { color }]}>{institucion}</Text>}
        {!!descripcion && <Text style={styles.timelineDesc}>{descripcion}</Text>}
      </View>
    </View>
  );
}

function ProyectoCard({ titulo, descripcion, tag, enlace, color, colorLight }: {
  titulo: string; descripcion: string; tag?: string | null; enlace?: string | null; color: string; colorLight: string;
}) {
  const { tipo, techs } = parseTag(tag);
  return (
    <View style={styles.proyectoCard}>
      <View style={styles.proyectoHeader}>
        <Text style={styles.proyectoNombre}>{titulo}</Text>
        {!!tipo && (
          <Text style={[styles.proyectoTipo, { color, backgroundColor: colorLight }]}>{tipo}</Text>
        )}
      </View>
      {!!descripcion && <Text style={styles.proyectoDesc}>{descripcion}</Text>}
      {techs.length > 0 && <Text style={styles.proyectoTecs}>{techs.join(" · ")}</Text>}
      {!!enlace && <Text style={[styles.proyectoLink, { color }]}>{enlace}</Text>}
    </View>
  );
}

/* ─── Main document ─── */
export function CVDocument({ perfil }: { perfil: PerfilData }) {
  const tema = perfil.colorTema ?? "#0f6e56";
  const temaLight = getLightColor(tema);
  const iniciales = initials(perfil.nombre);
  const fraseVisible = !!(perfil.frase?.trim());

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ══ SIDEBAR ══ */}
        <View style={[styles.sidebar, { backgroundColor: tema }]}>
          <View style={[styles.avatar, { backgroundColor: `${tema}cc` }]}>
            <Text style={styles.avatarText}>{iniciales}</Text>
          </View>
          <Text style={styles.nombre}>{perfil.nombre}</Text>
          <Text style={styles.cargo}>{perfil.cargo}</Text>

          <Text style={styles.sideHeader}>CONTACTO</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactText}>{perfil.email}</Text>
          </View>
          {!!perfil.telefono && (
            <View style={styles.contactRow}>
              <Text style={styles.contactText}>{perfil.telefono}</Text>
            </View>
          )}
          <View style={styles.contactRow}>
            <Text style={styles.contactText}>{perfil.municipio}, {perfil.departamento}</Text>
          </View>

          {perfil.habilidades.length > 0 && (
            <View>
              <Text style={styles.sideHeader}>HABILIDADES</Text>
              {perfil.habilidades.map((h) => (
                <SkillBar key={h.id} nombre={h.nombre} nivel={h.nivel} />
              ))}
            </View>
          )}

          <Text style={styles.sideHeader}>DISPONIBILIDAD</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {perfil.disponible && <View style={styles.chip}><Text style={styles.chipText}>Disponible</Text></View>}
            {!!perfil.modalidad && <View style={styles.chip}><Text style={styles.chipText}>{perfil.modalidad}</Text></View>}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Generado por PerfilTIC</Text>
            <Text style={styles.footerBold}>perfiltic.co/{perfil.slug}</Text>
          </View>
        </View>

        {/* ══ MAIN ══ */}
        <View style={styles.main}>
          {fraseVisible && (
            <View>
              <Text style={[styles.mainHeader, { marginTop: 0, color: tema }]}>PERFIL</Text>
              <Text style={styles.frase}>{perfil.frase}</Text>
            </View>
          )}

          {perfil.formacion.length > 0 && (
            <View>
              <Text style={[styles.mainHeader, { marginTop: fraseVisible ? 14 : 0, color: tema }]}>
                FORMACIÓN ACADÉMICA
              </Text>
              {perfil.formacion.map((f) => (
                <TimelineItem key={f.id} titulo={f.programa}
                  institucion={`${f.institucion} · ${f.nivel}`}
                  periodo={`${f.anioInicio} — ${f.anioFin}`} color={tema} />
              ))}
            </View>
          )}

          {perfil.experiencia.length > 0 && (
            <View>
              <Text style={[styles.mainHeader, { color: tema }]}>EXPERIENCIA</Text>
              {perfil.experiencia.map((e) => (
                <TimelineItem key={e.id} titulo={e.cargo} institucion={e.empresa}
                  periodo={e.periodo} descripcion={e.descripcion} color={tema} />
              ))}
            </View>
          )}

          {perfil.proyectos.length > 0 && (
            <View>
              <Text style={[styles.mainHeader, { color: tema }]}>PROYECTOS DESTACADOS</Text>
              {perfil.proyectos.map((p) => (
                <ProyectoCard key={p.id} titulo={p.titulo} descripcion={p.descripcion}
                  tag={p.tag} enlace={p.enlace} color={tema} colorLight={temaLight} />
              ))}
            </View>
          )}
        </View>

      </Page>
    </Document>
  );
}
