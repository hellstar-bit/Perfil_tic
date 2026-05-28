import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PerfilData } from "../shared/pdfTypes";
import { NIVEL_LABEL, getIniciales, parseTag } from "../shared/pdfUtils";

const WHITE  = "#ffffff";
const W75    = "rgba(255,255,255,0.75)";
const W50    = "rgba(255,255,255,0.50)";
const W20    = "rgba(255,255,255,0.20)";
const W15    = "rgba(255,255,255,0.15)";
const BODY   = "#1a1a1a";
const MUTED  = "#555555";
const BORDER = "#e8e8e8";

const s = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: 9, backgroundColor: WHITE },

  // Sidebar
  sidebar: { width: "30%", paddingTop: 24, paddingBottom: 24, paddingLeft: 18, paddingRight: 18 },
  avatar:  { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", marginBottom: 10, borderWidth: 2, borderColor: WHITE },
  avatarTx:{ fontFamily: "Helvetica-Bold", fontSize: 20, color: WHITE },
  name:    { fontFamily: "Helvetica-Bold", fontSize: 13, color: WHITE, lineHeight: 1.2, marginBottom: 3 },
  cargo:   { fontSize: 9, color: W75, marginBottom: 16 },

  sideHead:{ fontFamily: "Helvetica-Bold", fontSize: 7, color: W50, letterSpacing: 1.2, borderBottomWidth: 0.5, borderBottomColor: W20, paddingBottom: 3, marginBottom: 7, marginTop: 14 },
  contactRow: { marginBottom: 3 },
  contactTx:  { fontSize: 8, color: W75 },

  skillItem:  { marginBottom: 7 },
  skillName:  { fontFamily: "Helvetica-Bold", fontSize: 8.5, color: WHITE, marginBottom: 1 },
  skillLevel: { fontSize: 7, color: W50, marginBottom: 2 },
  skillBars:  { flexDirection: "row" },
  skillBar:   { height: 2.5, flex: 1, borderRadius: 2 },

  chip:    { backgroundColor: W15, borderRadius: 3, paddingLeft: 5, paddingRight: 5, paddingTop: 2.5, paddingBottom: 2.5, marginRight: 3, marginBottom: 3 },
  chipTx:  { fontSize: 7.5, color: WHITE },

  footer:  { position: "absolute", bottom: 12, left: 18, right: 18, borderTopWidth: 0.5, borderTopColor: W15, paddingTop: 5 },
  footerTx:{ fontSize: 7, color: W50 },

  // Main
  main:    { width: "70%", backgroundColor: WHITE, paddingTop: 28, paddingBottom: 28, paddingLeft: 22, paddingRight: 22 },
  mainHead:{ fontFamily: "Helvetica-Bold", fontSize: 7, letterSpacing: 1.3, borderBottomWidth: 1, borderBottomColor: BORDER, paddingBottom: 3, marginBottom: 9, marginTop: 14 },
  frase:   { fontSize: 9.5, color: "#3c3833", lineHeight: 1.55, fontStyle: "italic", marginBottom: 4 },

  tlItem:   { flexDirection: "row", marginBottom: 9 },
  tlYear:   { width: 68, fontSize: 7.5, fontFamily: "Helvetica-Bold", paddingTop: 1, marginRight: 8 },
  tlContent:{ flex: 1 },
  tlTitle:  { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: BODY, marginBottom: 1 },
  tlInst:   { fontSize: 8.5, marginBottom: 2 },
  tlSub:    { fontSize: 8, color: MUTED, fontStyle: "italic", marginBottom: 1 },
  tlDesc:   { fontSize: 8, color: MUTED, lineHeight: 1.4 },

  projCard:  { borderWidth: 1, borderColor: BORDER, borderRadius: 5, padding: 7, marginBottom: 5 },
  projRow:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 2 },
  projName:  { fontFamily: "Helvetica-Bold", fontSize: 9, color: BODY, flex: 1 },
  projTipo:  { fontSize: 7.5, marginLeft: 6 },
  projDesc:  { fontSize: 8, color: MUTED, lineHeight: 1.4, marginBottom: 3 },
  projTechs: { fontSize: 7.5, color: "#7a7368" },
});

export function TechTemplate({ perfil }: { perfil: PerfilData }) {
  const accent = perfil.colorTema ?? "#0f6e56";
  const iniciales = getIniciales(perfil.nombre);

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ══ SIDEBAR ══ */}
        <View style={[s.sidebar, { backgroundColor: accent }]}>
          <View style={[s.avatar, { backgroundColor: `${accent}bb` }]}>
            <Text style={s.avatarTx}>{iniciales}</Text>
          </View>
          <Text style={s.name}>{perfil.nombre}</Text>
          <Text style={s.cargo}>{perfil.cargo}</Text>

          <Text style={s.sideHead}>CONTACTO</Text>
          <View style={s.contactRow}><Text style={s.contactTx}>{perfil.email}</Text></View>
          {!!perfil.telefono && <View style={s.contactRow}><Text style={s.contactTx}>{perfil.telefono}</Text></View>}
          <View style={s.contactRow}><Text style={s.contactTx}>{perfil.municipio}, {perfil.departamento}</Text></View>
          <View style={s.contactRow}><Text style={s.contactTx}>StartIA.co/{perfil.slug}</Text></View>

          {perfil.habilidades.length > 0 && (
            <View>
              <Text style={s.sideHead}>HABILIDADES</Text>
              {perfil.habilidades.slice(0, 8).map((h) => (
                <View key={h.id} style={s.skillItem}>
                  <Text style={s.skillName}>{h.nombre}</Text>
                  <Text style={s.skillLevel}>{NIVEL_LABEL[h.nivel - 1] ?? ""}</Text>
                  <View style={s.skillBars}>
                    {[1,2,3,4,5].map((i, idx) => (
                      <View key={i} style={[s.skillBar, { backgroundColor: i <= h.nivel ? WHITE : W20, marginRight: idx < 4 ? 2 : 0 }]} />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          <Text style={s.sideHead}>DISPONIBILIDAD</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {perfil.disponible && <View style={s.chip}><Text style={s.chipTx}>Disponible</Text></View>}
            {!!perfil.modalidad && <View style={s.chip}><Text style={s.chipTx}>{perfil.modalidad}</Text></View>}
          </View>

          <View style={s.footer}>
            <Text style={s.footerTx}>Generado por StartIA  ·  StartIA.co/{perfil.slug}</Text>
          </View>
        </View>

        {/* ══ MAIN ══ */}
        <View style={s.main}>
          {!!perfil.frase?.trim() && (
            <View wrap={false}>
              <Text style={[s.mainHead, { marginTop: 0, color: accent }]}>PERFIL PROFESIONAL</Text>
              <Text style={s.frase}>{perfil.frase}</Text>
            </View>
          )}

          {perfil.experiencia.length > 0 && (
            <View wrap={false}>
              <Text style={[s.mainHead, { color: accent }]}>EXPERIENCIA</Text>
              {perfil.experiencia.map((e) => (
                <View key={e.id} style={s.tlItem} wrap={false}>
                  <Text style={[s.tlYear, { color: accent }]}>{e.periodo}</Text>
                  <View style={s.tlContent}>
                    <Text style={s.tlTitle}>{e.cargo}</Text>
                    <Text style={[s.tlInst, { color: accent }]}>{e.empresa}</Text>
                    <Text style={s.tlSub}>{e.tipo}</Text>
                    {!!e.descripcion && <Text style={s.tlDesc}>{e.descripcion}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {perfil.formacion.length > 0 && (
            <View wrap={false}>
              <Text style={[s.mainHead, { color: accent }]}>FORMACION</Text>
              {perfil.formacion.map((f) => (
                <View key={f.id} style={s.tlItem} wrap={false}>
                  <Text style={[s.tlYear, { color: accent }]}>{f.anioInicio} — {f.anioFin}</Text>
                  <View style={s.tlContent}>
                    <Text style={s.tlTitle}>{f.programa}</Text>
                    <Text style={[s.tlInst, { color: accent }]}>{f.institucion}</Text>
                    <Text style={s.tlSub}>{f.nivel}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {perfil.proyectos.length > 0 && (
            <View wrap={false}>
              <Text style={[s.mainHead, { color: accent }]}>PROYECTOS DESTACADOS</Text>
              {perfil.proyectos.slice(0, 4).map((p) => {
                const { tipo, techs } = parseTag(p.tag);
                return (
                  <View key={p.id} style={s.projCard} wrap={false}>
                    <View style={s.projRow}>
                      <Text style={s.projName}>{p.titulo}</Text>
                      {!!tipo && <Text style={[s.projTipo, { color: accent }]}>{tipo}</Text>}
                    </View>
                    {!!p.descripcion && <Text style={s.projDesc}>{p.descripcion}</Text>}
                    {techs.length > 0 && <Text style={s.projTechs}>{techs.join("  ·  ")}</Text>}
                    {!!p.enlace && <Text style={{ fontSize: 7.5, color: accent, marginTop: 2 }}>{p.enlace}</Text>}
                  </View>
                );
              })}
            </View>
          )}
        </View>

      </Page>
    </Document>
  );
}
