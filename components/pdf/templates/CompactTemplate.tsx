import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PerfilData } from "../shared/pdfTypes";
import { NIVEL_LABEL, parseTag } from "../shared/pdfUtils";

const NAVY   = "#1B2A4A";
const BLUE   = "#2563EB";
const BODY   = "#222222";
const MUTED  = "#666666";
const M = 30;

const s = StyleSheet.create({
  page:    { fontFamily: "Helvetica", fontSize: 9, color: BODY, backgroundColor: "#ffffff", paddingTop: M, paddingBottom: M, paddingLeft: M, paddingRight: M },

  // Header
  name:    { fontFamily: "Helvetica-Bold", fontSize: 18, color: NAVY, marginBottom: 3 },
  subLine: { fontSize: 8, color: MUTED, marginBottom: 5 },
  bar:     { borderBottomWidth: 2, borderBottomColor: BLUE, marginBottom: 8 },

  // Section
  secWrap:  { marginTop: 8 },
  secLabel: { fontFamily: "Helvetica-Bold", fontSize: 8, color: BLUE, letterSpacing: 0.5, marginBottom: 3 },
  secLine:  { borderBottomWidth: 0.3, borderBottomColor: "#d0d8e8", marginBottom: 5 },

  // Skills — one line
  skills:  { fontSize: 8.5, color: BODY, lineHeight: 1.3 },

  // Items compact
  itemWrap:   { marginBottom: 5 },
  itemRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  itemTitle:  { fontFamily: "Helvetica-Bold", fontSize: 9, color: BODY, flex: 1 },
  itemPeriod: { fontSize: 8, color: MUTED, marginLeft: 6 },
  itemSub:    { fontSize: 8, color: MUTED, marginTop: 0.5 },
  itemDesc:   { fontSize: 8, color: "#444", lineHeight: 1.3, marginTop: 2 },
});

function SecHeader({ label }: { label: string }) {
  return (
    <View style={s.secWrap}>
      <Text style={s.secLabel}>{label}</Text>
      <View style={s.secLine} />
    </View>
  );
}

export function CompactTemplate({ perfil }: { perfil: PerfilData }) {
  const contactParts = [
    perfil.cargo,
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
        <Text style={s.name}>{perfil.nombre}</Text>
        <Text style={s.subLine}>{contactParts}</Text>
        <View style={s.bar} />

        {/* ── Perfil ── */}
        {!!perfil.frase?.trim() && (
          <View wrap={false}>
            <SecHeader label="PERFIL PROFESIONAL" />
            <Text style={{ fontSize: 8.5, color: "#444", lineHeight: 1.35 }}>{perfil.frase}</Text>
          </View>
        )}

        {/* ── Habilidades ── */}
        {perfil.habilidades.length > 0 && (
          <View wrap={false}>
            <SecHeader label="HABILIDADES" />
            <Text style={s.skills}>{skillsText}</Text>
          </View>
        )}

        {/* ── Experiencia ── */}
        {perfil.experiencia.length > 0 && (
          <View wrap={false}>
            <SecHeader label="EXPERIENCIA" />
            {perfil.experiencia.map((e) => (
              <View key={e.id} style={s.itemWrap} wrap={false}>
                <View style={s.itemRow}>
                  <Text style={s.itemTitle}>{e.cargo}  ·  {e.empresa}</Text>
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
            <SecHeader label="FORMACION" />
            {perfil.formacion.map((f) => (
              <View key={f.id} style={s.itemWrap} wrap={false}>
                <View style={s.itemRow}>
                  <Text style={s.itemTitle}>{f.programa}  ·  {f.institucion}</Text>
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
            <SecHeader label="PROYECTOS" />
            {perfil.proyectos.map((p) => {
              const { tipo, techs } = parseTag(p.tag);
              return (
                <View key={p.id} style={s.itemWrap} wrap={false}>
                  <View style={s.itemRow}>
                    <Text style={s.itemTitle}>{p.titulo}{tipo ? `  ·  ${tipo}` : ""}</Text>
                    {!!p.enlace && <Text style={{ fontSize: 7.5, color: BLUE, marginLeft: 6 }}>{p.enlace}</Text>}
                  </View>
                  {techs.length > 0 && <Text style={s.itemSub}>{techs.join("  ·  ")}</Text>}
                  {!!p.descripcion && <Text style={s.itemDesc}>{p.descripcion}</Text>}
                </View>
              );
            })}
          </View>
        )}

      </Page>
    </Document>
  );
}
