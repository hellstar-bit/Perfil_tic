import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PerfilData } from "../shared/pdfTypes";
import { NIVEL_LABEL, parseTag } from "../shared/pdfUtils";

const GOLD = "#c0a96b";
const DARK = "#1a1a1a";
const BODY = "#1a1a1a";
const MUTED = "#555555";
const M = 50;

const s = StyleSheet.create({
  page:    { fontFamily: "Times-Roman", fontSize: 10, color: DARK, backgroundColor: "#ffffff", paddingTop: M, paddingBottom: M, paddingLeft: M, paddingRight: M },

  // Header — centered
  name:    { fontFamily: "Times-Bold", fontSize: 28, color: DARK, textAlign: "center", marginBottom: 6 },
  goldLine:{ borderBottomWidth: 1.5, borderBottomColor: GOLD, width: 120, alignSelf: "center", marginBottom: 8 },
  cargo:   { fontSize: 13, color: "#555", textAlign: "center", marginBottom: 5 },
  contact: { fontSize: 9, color: MUTED, textAlign: "center", marginBottom: 2 },

  // Section
  secWrap:  { marginTop: 16 },
  secBorder:{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: DARK, paddingTop: 3, paddingBottom: 3, marginBottom: 10 },
  secLabel: { fontFamily: "Times-Bold", fontSize: 9, textAlign: "center", letterSpacing: 1.5, color: DARK },

  // Items
  itemWrap:   { marginBottom: 10 },
  itemRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  itemTitle:  { fontFamily: "Times-Bold", fontSize: 10.5, color: DARK, flex: 1 },
  itemPeriod: { fontSize: 9, color: MUTED, fontStyle: "italic", marginLeft: 10 },
  itemSub:    { fontSize: 9, color: MUTED, fontStyle: "italic", marginTop: 1 },
  itemDesc:   { fontSize: 9, color: "#444", lineHeight: 1.5, marginTop: 3 },

  // Habilidades — two implicit halves
  skillsWrap: { flexDirection: "row" },
  skillsCol:  { flex: 1 },
  skillItem:  { fontSize: 9, color: BODY, marginBottom: 3 },
  skillLevel: { fontSize: 8.5, color: MUTED, fontStyle: "italic" },

  // Proyectos
  projWrap:  { marginBottom: 8 },
  projTitle: { fontFamily: "Times-Bold", fontSize: 10, color: DARK, marginBottom: 2 },
  projDesc:  { fontSize: 9, color: "#444", lineHeight: 1.45, marginBottom: 2 },
  projTechs: { fontSize: 8.5, color: MUTED, fontStyle: "italic" },
});

function SecHeader({ label }: { label: string }) {
  return (
    <View style={s.secWrap}>
      <View style={s.secBorder}>
        <Text style={s.secLabel}>{label}</Text>
      </View>
    </View>
  );
}

export function ExecutiveTemplate({ perfil }: { perfil: PerfilData }) {
  const contactParts = [
    perfil.email,
    perfil.telefono,
    `${perfil.municipio}, ${perfil.departamento}`,
    `AscendIA.co/${perfil.slug}`,
  ].filter(Boolean);

  const half = Math.ceil(perfil.habilidades.length / 2);
  const leftSkills = perfil.habilidades.slice(0, half);
  const rightSkills = perfil.habilidades.slice(half);

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Header centered ── */}
        <Text style={s.name}>{perfil.nombre}</Text>
        <View style={s.goldLine} />
        <Text style={s.cargo}>{perfil.cargo}</Text>
        {contactParts.map((c, i) => (
          <Text key={i} style={s.contact}>{c}</Text>
        ))}

        {/* ── Perfil Profesional ── */}
        {!!perfil.frase?.trim() && (
          <View wrap={false}>
            <SecHeader label="PERFIL PROFESIONAL" />
            <Text style={{ fontSize: 10, color: "#444", lineHeight: 1.55, fontStyle: "italic", textAlign: "center" }}>
              {perfil.frase}
            </Text>
          </View>
        )}

        {/* ── Habilidades ── */}
        {perfil.habilidades.length > 0 && (
          <View wrap={false}>
            <SecHeader label="HABILIDADES" />
            <View style={s.skillsWrap}>
              <View style={s.skillsCol}>
                {leftSkills.map((h) => (
                  <Text key={h.id} style={s.skillItem}>
                    {h.nombre}{"  "}
                    <Text style={s.skillLevel}>{NIVEL_LABEL[h.nivel - 1]}</Text>
                  </Text>
                ))}
              </View>
              <View style={[s.skillsCol, { marginLeft: 20 }]}>
                {rightSkills.map((h) => (
                  <Text key={h.id} style={s.skillItem}>
                    {h.nombre}{"  "}
                    <Text style={s.skillLevel}>{NIVEL_LABEL[h.nivel - 1]}</Text>
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* ── Experiencia ── */}
        {perfil.experiencia.length > 0 && (
          <View wrap={false}>
            <SecHeader label="EXPERIENCIA" />
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
            <SecHeader label="FORMACION" />
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
            <SecHeader label="PROYECTOS" />
            {perfil.proyectos.map((p) => {
              const { tipo, techs } = parseTag(p.tag);
              return (
                <View key={p.id} style={s.projWrap} wrap={false}>
                  <Text style={s.projTitle}>{p.titulo}{tipo ? `  ·  ${tipo}` : ""}</Text>
                  {!!p.descripcion && <Text style={s.projDesc}>{p.descripcion}</Text>}
                  {techs.length > 0 && <Text style={s.projTechs}>{techs.join("  ·  ")}</Text>}
                  {!!p.enlace && <Text style={{ fontSize: 8.5, color: GOLD, marginTop: 1 }}>{p.enlace}</Text>}
                </View>
              );
            })}
          </View>
        )}

      </Page>
    </Document>
  );
}
