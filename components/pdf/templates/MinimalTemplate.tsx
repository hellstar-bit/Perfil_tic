import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PerfilData } from "../shared/pdfTypes";
import { parseTag } from "../shared/pdfUtils";

const BLACK = "#000000";
const GRAY  = "#666666";
const LGRAY = "#cccccc";
const MH = 50; // margin horizontal
const MV = 50; // margin vertical

const s = StyleSheet.create({
  page:    { fontFamily: "Helvetica", fontSize: 10, color: BLACK, backgroundColor: "#ffffff", paddingTop: MV, paddingBottom: MV, paddingLeft: MH, paddingRight: MH },

  // Header
  name:    { fontFamily: "Helvetica-Bold", fontSize: 32, color: BLACK, marginBottom: 5 },
  cargo:   { fontSize: 11, color: GRAY, marginBottom: 10 },
  hr:      { borderBottomWidth: 2, borderBottomColor: BLACK, marginBottom: 8 },
  contact: { fontSize: 9, color: GRAY, marginBottom: 0 },

  // Section
  secWrap: { marginTop: 16 },
  secLabel:{ fontFamily: "Helvetica-Bold", fontSize: 7, color: BLACK, letterSpacing: 2, marginBottom: 5 },
  secLine: { borderBottomWidth: 0.3, borderBottomColor: LGRAY, marginBottom: 9 },

  // Items — lots of whitespace
  itemWrap:   { marginBottom: 11 },
  itemRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  itemTitle:  { fontFamily: "Helvetica-Bold", fontSize: 10, color: BLACK, flex: 1 },
  itemPeriod: { fontSize: 9, color: GRAY, marginLeft: 10 },
  itemSub:    { fontSize: 9, color: GRAY, marginTop: 1.5 },
  itemDesc:   { fontSize: 9, color: GRAY, lineHeight: 1.6, marginTop: 4 },

  // Skills — plain text, no levels
  skills:  { fontSize: 10, color: BLACK, lineHeight: 1.6 },

  // Projects
  projWrap: { marginBottom: 11 },
  projRow:  { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  projName: { fontFamily: "Helvetica-Bold", fontSize: 10, color: BLACK, flex: 1 },
  projDesc: { fontSize: 9, color: GRAY, lineHeight: 1.55, marginTop: 3 },
  projLink: { fontSize: 8.5, color: GRAY, marginTop: 2 },
});

function SecHeader({ label }: { label: string }) {
  return (
    <View style={s.secWrap}>
      <Text style={s.secLabel}>{label}</Text>
      <View style={s.secLine} />
    </View>
  );
}

export function MinimalTemplate({ perfil }: { perfil: PerfilData }) {
  const contactParts = [
    perfil.email,
    perfil.telefono,
    `${perfil.municipio}, ${perfil.departamento}`,
    `AscendIA.co/${perfil.slug}`,
  ].filter(Boolean).join("  |  ");

  const skillsText = perfil.habilidades.map((h) => h.nombre).join("  ·  ");

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <Text style={s.name}>{perfil.nombre}</Text>
        <Text style={s.cargo}>{perfil.cargo}</Text>
        <View style={s.hr} />
        <Text style={s.contact}>{contactParts}</Text>

        {/* ── Perfil ── */}
        {!!perfil.frase?.trim() && (
          <View wrap={false}>
            <SecHeader label="PERFIL PROFESIONAL" />
            <Text style={{ fontSize: 10, color: GRAY, lineHeight: 1.6 }}>{perfil.frase}</Text>
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
                  <Text style={s.itemTitle}>{e.cargo}</Text>
                  <Text style={s.itemPeriod}>{e.periodo}</Text>
                </View>
                <Text style={s.itemSub}>{e.empresa}  ·  {e.tipo}</Text>
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
                  <Text style={s.itemTitle}>{f.programa}</Text>
                  <Text style={s.itemPeriod}>{f.anioInicio} — {f.anioFin}</Text>
                </View>
                <Text style={s.itemSub}>{f.institucion}  ·  {f.nivel}</Text>
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
                <View key={p.id} style={s.projWrap} wrap={false}>
                  <View style={s.projRow}>
                    <Text style={s.projName}>{p.titulo}{tipo ? `  ·  ${tipo}` : ""}</Text>
                  </View>
                  {techs.length > 0 && <Text style={{ fontSize: 9, color: LGRAY, marginTop: 1 }}>{techs.join("  ·  ")}</Text>}
                  {!!p.descripcion && <Text style={s.projDesc}>{p.descripcion}</Text>}
                  {!!p.enlace && <Text style={s.projLink}>{p.enlace}</Text>}
                </View>
              );
            })}
          </View>
        )}

      </Page>
    </Document>
  );
}
