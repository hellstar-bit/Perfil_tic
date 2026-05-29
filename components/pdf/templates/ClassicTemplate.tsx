import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PerfilData } from "../shared/pdfTypes";
import { NIVEL_LABEL, getIniciales, parseTag } from "../shared/pdfUtils";

const ACCENT = "#0f6e56";
const MUTED = "#555555";
const BODY = "#222222";
const BORDER = "#e0e0e0";
const M = 40;

function makeStyles(accent: string) {
  return StyleSheet.create({
    page: { fontFamily: "Helvetica", fontSize: 10, color: BODY, backgroundColor: "#ffffff", paddingTop: M, paddingBottom: M, paddingLeft: M, paddingRight: M },

    // Header
    name:    { fontFamily: "Helvetica-Bold", fontSize: 22, color: accent, marginBottom: 3 },
    cargo:   { fontSize: 12, color: MUTED, marginBottom: 7 },
    hr:      { borderBottomWidth: 1, borderBottomColor: accent, marginBottom: 6 },
    contact: { fontSize: 8.5, color: MUTED },

    // Section
    secWrap:  { marginTop: 14 },
    secLabel: { fontFamily: "Helvetica-Bold", fontSize: 8, color: accent, letterSpacing: 1, marginBottom: 3 },
    secLine:  { borderBottomWidth: 0.5, borderBottomColor: BORDER, marginBottom: 8 },

    // Perfil
    frase: { fontSize: 10, color: "#444", lineHeight: 1.55 },

    // Habilidades
    skills: { fontSize: 9, color: BODY, lineHeight: 1.5 },

    // Experience / Formacion
    itemWrap:    { marginBottom: 9 },
    itemRow:     { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    itemTitle:   { fontFamily: "Helvetica-Bold", fontSize: 10, color: BODY, flex: 1 },
    itemPeriod:  { fontSize: 8.5, color: MUTED, marginLeft: 8 },
    itemSub:     { fontSize: 9, color: MUTED, fontStyle: "italic", marginTop: 1 },
    itemDesc:    { fontSize: 8.5, color: "#444", lineHeight: 1.45, marginTop: 3 },

    // Proyectos
    projWrap:   { marginBottom: 8 },
    projRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 },
    projTitle:  { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: BODY, flex: 1 },
    projLink:   { fontSize: 8, color: accent, marginLeft: 8 },
    projTechs:  { fontSize: 8, color: MUTED, marginBottom: 2 },
    projDesc:   { fontSize: 8.5, color: "#444", lineHeight: 1.4 },
  });
}

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  const s = makeStyles(accent);
  return (
    <View style={s.secWrap}>
      <Text style={s.secLabel}>{label}</Text>
      <View style={s.secLine} />
    </View>
  );
}

export function ClassicTemplate({ perfil }: { perfil: PerfilData }) {
  const accent = perfil.colorTema ?? ACCENT;
  const s = makeStyles(accent);
  const iniciales = getIniciales(perfil.nombre);

  const contactParts = [
    perfil.email,
    perfil.telefono,
    `${perfil.municipio}, ${perfil.departamento}`,
    `AscendIA.co/${perfil.slug}`,
  ].filter(Boolean).join("  ·  ");

  const skillsText = perfil.habilidades
    .map((h) => `${h.nombre} (${NIVEL_LABEL[h.nivel - 1] ?? "Básico"})`)
    .join("  ·  ");

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <Text style={s.name}>{perfil.nombre || iniciales}</Text>
        <Text style={s.cargo}>{perfil.cargo}</Text>
        <View style={s.hr} />
        <Text style={s.contact}>{contactParts}</Text>

        {/* ── Perfil Profesional ── */}
        {!!perfil.frase?.trim() && (
          <View wrap={false}>
            <SectionHeader label="PERFIL PROFESIONAL" accent={accent} />
            <Text style={s.frase}>{perfil.frase}</Text>
          </View>
        )}

        {/* ── Habilidades ── */}
        {perfil.habilidades.length > 0 && (
          <View wrap={false}>
            <SectionHeader label="HABILIDADES" accent={accent} />
            <Text style={s.skills}>{skillsText}</Text>
          </View>
        )}

        {/* ── Experiencia ── */}
        {perfil.experiencia.length > 0 && (
          <View wrap={false}>
            <SectionHeader label="EXPERIENCIA" accent={accent} />
            {perfil.experiencia.map((e) => (
              <View key={e.id} style={s.itemWrap} wrap={false}>
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

        {/* ── Formación ── */}
        {perfil.formacion.length > 0 && (
          <View wrap={false}>
            <SectionHeader label="FORMACION" accent={accent} />
            {perfil.formacion.map((f) => (
              <View key={f.id} style={s.itemWrap} wrap={false}>
                <View style={s.itemRow}>
                  <Text style={s.itemTitle}>{f.programa}  —  {f.institucion}</Text>
                  <Text style={s.itemPeriod}>{f.anioInicio} — {f.anioFin}</Text>
                </View>
                <Text style={s.itemSub}>{f.nivel}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Proyectos ── */}
        {perfil.proyectos.length > 0 && (
          <View wrap={false}>
            <SectionHeader label="PROYECTOS" accent={accent} />
            {perfil.proyectos.map((p) => {
              const { tipo, techs } = parseTag(p.tag);
              return (
                <View key={p.id} style={s.projWrap} wrap={false}>
                  <View style={s.projRow}>
                    <Text style={s.projTitle}>{p.titulo}{tipo ? `  —  ${tipo}` : ""}</Text>
                    {!!p.enlace && <Text style={s.projLink}>{p.enlace}</Text>}
                  </View>
                  {techs.length > 0 && <Text style={s.projTechs}>{techs.join("  ·  ")}</Text>}
                  {!!p.descripcion && <Text style={s.projDesc}>{p.descripcion}</Text>}
                </View>
              );
            })}
          </View>
        )}

      </Page>
    </Document>
  );
}
