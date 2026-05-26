import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PerfilData } from "../shared/pdfTypes";
import { NIVEL_LABEL, parseTag } from "../shared/pdfUtils";

const DARK  = "#2D2D2D";
const BLUE  = "#0066CC";
const MUTED = "#555555";
const BODY  = "#222222";
const M = 45;

const s = StyleSheet.create({
  page:    { fontFamily: "Helvetica", fontSize: 10, color: BODY, backgroundColor: "#ffffff", paddingTop: M, paddingBottom: M, paddingLeft: M, paddingRight: M },

  // Header
  name:    { fontFamily: "Helvetica-Bold", fontSize: 24, color: DARK, marginBottom: 3 },
  location:{ fontSize: 10, color: MUTED, marginBottom: 5 },
  contact: { fontSize: 9, color: MUTED, marginBottom: 4 },
  bar:     { borderBottomWidth: 2, borderBottomColor: BLUE, marginTop: 2, marginBottom: 0 },

  // Section
  secWrap:  { marginTop: 14 },
  secLabel: { fontFamily: "Helvetica-Bold", fontSize: 8, color: BLUE, letterSpacing: 0.8, marginBottom: 4 },
  secLine:  { borderBottomWidth: 0.5, borderBottomColor: "#d0d8e8", marginBottom: 8 },

  // Items
  itemWrap:   { marginBottom: 10 },
  itemRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  itemTitle:  { fontFamily: "Helvetica-Bold", fontSize: 10, color: DARK, flex: 1 },
  itemPeriod: { fontSize: 9, color: MUTED, marginLeft: 10 },
  itemSub:    { fontSize: 9, color: MUTED, fontStyle: "italic", marginTop: 1.5 },
  itemDesc:   { fontSize: 9, color: "#444", lineHeight: 1.45, marginTop: 3 },

  // Skills
  skillsWrap: { flexDirection: "row" },
  skillsCol:  { flex: 1 },
  skillItem:  { fontSize: 9, color: BODY, marginBottom: 3 },

  // Projects
  projWrap:  { marginBottom: 8 },
  projTitle: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: DARK, marginBottom: 2 },
  projDesc:  { fontSize: 9, color: "#444", lineHeight: 1.4, marginBottom: 2 },
  projTechs: { fontSize: 8.5, color: MUTED },
});

function SecHeader({ label }: { label: string }) {
  return (
    <View style={s.secWrap}>
      <Text style={s.secLabel}>{label}</Text>
      <View style={s.secLine} />
    </View>
  );
}

export function InternationalTemplate({ perfil }: { perfil: PerfilData }) {
  const phone = perfil.telefono
    ? (perfil.telefono.startsWith("+") ? perfil.telefono : `+57 ${perfil.telefono}`)
    : null;

  const contactParts = [
    perfil.email,
    phone,
    `perfiltic.co/${perfil.slug}`,
  ].filter(Boolean).join("  ·  ");

  const half = Math.ceil(perfil.habilidades.length / 2);
  const leftSkills = perfil.habilidades.slice(0, half);
  const rightSkills = perfil.habilidades.slice(half);

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <Text style={s.name}>{perfil.nombre}</Text>
        <Text style={s.location}>{perfil.municipio}, {perfil.departamento}, Colombia</Text>
        <Text style={s.contact}>{contactParts}</Text>
        <View style={s.bar} />

        {/* ── Professional Summary ── */}
        {!!perfil.frase?.trim() && (
          <View>
            <SecHeader label="PROFESSIONAL SUMMARY" />
            <Text style={{ fontSize: 10, color: "#444", lineHeight: 1.5 }}>{perfil.frase}</Text>
          </View>
        )}

        {/* ── Skills ── */}
        {perfil.habilidades.length > 0 && (
          <View>
            <SecHeader label="SKILLS" />
            <View style={s.skillsWrap}>
              <View style={s.skillsCol}>
                {leftSkills.map((h) => (
                  <Text key={h.id} style={s.skillItem}>
                    {h.nombre}
                    {"  "}<Text style={{ fontSize: 8.5, color: MUTED }}>{NIVEL_LABEL[h.nivel - 1]}</Text>
                  </Text>
                ))}
              </View>
              <View style={[s.skillsCol, { marginLeft: 20 }]}>
                {rightSkills.map((h) => (
                  <Text key={h.id} style={s.skillItem}>
                    {h.nombre}
                    {"  "}<Text style={{ fontSize: 8.5, color: MUTED }}>{NIVEL_LABEL[h.nivel - 1]}</Text>
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* ── Work Experience ── */}
        {perfil.experiencia.length > 0 && (
          <View>
            <SecHeader label="WORK EXPERIENCE" />
            {perfil.experiencia.map((e) => (
              <View key={e.id} style={s.itemWrap}>
                <View style={s.itemRow}>
                  <Text style={s.itemTitle}>{e.cargo}  —  {e.empresa}</Text>
                  <Text style={s.itemPeriod}>{e.periodo}</Text>
                </View>
                <Text style={s.itemSub}>{e.tipo}</Text>
                {!!e.descripcion && <Text style={s.itemDesc}>{e.descripcion}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* ── Education ── */}
        {perfil.formacion.length > 0 && (
          <View>
            <SecHeader label="EDUCATION" />
            {perfil.formacion.map((f) => (
              <View key={f.id} style={s.itemWrap}>
                <View style={s.itemRow}>
                  <Text style={s.itemTitle}>{f.programa}  —  {f.institucion}</Text>
                  <Text style={s.itemPeriod}>{f.anioInicio} — {f.anioFin}</Text>
                </View>
                <Text style={s.itemSub}>{f.nivel}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Projects ── */}
        {perfil.proyectos.length > 0 && (
          <View>
            <SecHeader label="PROJECTS" />
            {perfil.proyectos.map((p) => {
              const { tipo, techs } = parseTag(p.tag);
              return (
                <View key={p.id} style={s.projWrap}>
                  <Text style={s.projTitle}>{p.titulo}{tipo ? `  ·  ${tipo}` : ""}</Text>
                  {!!p.descripcion && <Text style={s.projDesc}>{p.descripcion}</Text>}
                  {techs.length > 0 && <Text style={s.projTechs}>{techs.join("  ·  ")}</Text>}
                  {!!p.enlace && <Text style={{ fontSize: 8.5, color: BLUE, marginTop: 1 }}>{p.enlace}</Text>}
                </View>
              );
            })}
          </View>
        )}

      </Page>
    </Document>
  );
}
