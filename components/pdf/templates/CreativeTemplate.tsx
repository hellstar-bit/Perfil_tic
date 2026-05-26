import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PerfilData } from "../shared/pdfTypes";
import { NIVEL_LABEL, getIniciales, parseTag } from "../shared/pdfUtils";

const NEON   = "#00E5A0";
const NOIR   = "#0E0E0E";
const LIGHT  = "#FAFAFA";
const WHITE  = "#ffffff";
const W20    = "rgba(255,255,255,0.20)";
const W12    = "rgba(255,255,255,0.12)";
const W70    = "rgba(255,255,255,0.70)";
const W50    = "rgba(255,255,255,0.50)";
const BODY   = "#1a1a1a";
const MUTED  = "#555555";
const BORDER = "#e0e0e0";
const NEONB  = "rgba(0,229,160,0.25)";

const s = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: 9, backgroundColor: LIGHT },

  // Left dark sidebar
  sidebar: { width: "35%", backgroundColor: NOIR, paddingTop: 26, paddingBottom: 26, paddingLeft: 18, paddingRight: 16 },

  avatar:   { width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", marginBottom: 12, borderWidth: 2, borderColor: NEON },
  avatarTx: { fontFamily: "Helvetica-Bold", fontSize: 20, color: WHITE },

  sName:  { fontFamily: "Helvetica-Bold", fontSize: 15, color: WHITE, lineHeight: 1.2, marginBottom: 3 },
  sCargo: { fontSize: 9.5, color: NEON, marginBottom: 3 },
  sUrl:   { fontSize: 8, color: NEONB, marginBottom: 14 },

  sHead:  { fontFamily: "Helvetica-Bold", fontSize: 7, color: NEON, letterSpacing: 1.2, marginBottom: 4, marginTop: 14, borderBottomWidth: 0.5, borderBottomColor: W12, paddingBottom: 3 },

  contactRow: { marginBottom: 3 },
  contactTx:  { fontSize: 7.5, color: W70 },

  skillItem:  { marginBottom: 7 },
  skillName:  { fontFamily: "Helvetica-Bold", fontSize: 8, color: WHITE, marginBottom: 1 },
  skillLvl:   { fontSize: 7, color: W50, marginBottom: 2 },
  skillBars:  { flexDirection: "row" },
  skillBar:   { height: 2.5, flex: 1, borderRadius: 2 },

  chip:    { backgroundColor: W12, borderRadius: 3, paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, marginRight: 3, marginBottom: 3 },
  chipTx:  { fontSize: 7.5, color: WHITE },

  // Right light body
  main:    { width: "65%", backgroundColor: LIGHT, paddingTop: 26, paddingBottom: 26, paddingLeft: 20, paddingRight: 22 },

  fraseWrap:{ borderLeftWidth: 2, borderLeftColor: NEON, paddingLeft: 10, marginBottom: 14 },
  frase:    { fontSize: 11, color: "#3a3a3a", lineHeight: 1.55, fontStyle: "italic" },

  secWrap:  { marginTop: 13 },
  secLabel: { fontFamily: "Helvetica-Bold", fontSize: 7.5, color: BODY, letterSpacing: 1, marginBottom: 4 },
  secAccent:{ borderBottomWidth: 1.5, borderBottomColor: NEON, width: 24, marginBottom: 7 },

  tlWrap:   { flexDirection: "row", marginBottom: 9 },
  tlDot:    { width: 7, height: 7, borderRadius: 4, backgroundColor: NEON, marginRight: 9, marginTop: 2 },
  tlContent:{ flex: 1 },
  tlTitle:  { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: BODY, marginBottom: 1 },
  tlInst:   { fontSize: 8.5, color: MUTED, marginBottom: 1 },
  tlPeriod: { fontSize: 7.5, color: MUTED, fontStyle: "italic", marginBottom: 2 },
  tlDesc:   { fontSize: 8, color: "#555", lineHeight: 1.4 },

  projCard: { borderWidth: 0.5, borderColor: NEONB, borderRadius: 5, padding: 7, marginBottom: 5 },
  projRow:  { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 2 },
  projName: { fontFamily: "Helvetica-Bold", fontSize: 9, color: BODY, flex: 1 },
  projTipo: { fontSize: 7.5, color: NEON, marginLeft: 6 },
  projDesc: { fontSize: 8, color: MUTED, lineHeight: 1.4, marginBottom: 3 },
  projTecs: { fontSize: 7.5, color: "#7a7368" },
});

function SecHeader({ label }: { label: string }) {
  return (
    <View style={s.secWrap}>
      <Text style={s.secLabel}>{label}</Text>
      <View style={s.secAccent} />
    </View>
  );
}

export function CreativeTemplate({ perfil }: { perfil: PerfilData }) {
  const iniciales = getIniciales(perfil.nombre);

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ══ SIDEBAR ══ */}
        <View style={s.sidebar}>
          <View style={s.avatar}>
            <Text style={s.avatarTx}>{iniciales}</Text>
          </View>
          <Text style={s.sName}>{perfil.nombre}</Text>
          <Text style={s.sCargo}>{perfil.cargo}</Text>
          <Text style={s.sUrl}>perfiltic.co/{perfil.slug}</Text>

          <Text style={s.sHead}>CONTACTO</Text>
          <View style={s.contactRow}><Text style={s.contactTx}>{perfil.email}</Text></View>
          {!!perfil.telefono && <View style={s.contactRow}><Text style={s.contactTx}>{perfil.telefono}</Text></View>}
          <View style={s.contactRow}><Text style={s.contactTx}>{perfil.municipio}, {perfil.departamento}</Text></View>

          {perfil.habilidades.length > 0 && (
            <View>
              <Text style={s.sHead}>HABILIDADES</Text>
              {perfil.habilidades.slice(0, 7).map((h) => (
                <View key={h.id} style={s.skillItem}>
                  <Text style={s.skillName}>{h.nombre}</Text>
                  <Text style={s.skillLvl}>{NIVEL_LABEL[h.nivel - 1] ?? ""}</Text>
                  <View style={s.skillBars}>
                    {[1,2,3,4,5].map((i, idx) => (
                      <View key={i} style={[s.skillBar, { backgroundColor: i <= h.nivel ? NEON : W20, marginRight: idx < 4 ? 2 : 0 }]} />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          <Text style={s.sHead}>DISPONIBILIDAD</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {perfil.disponible && <View style={s.chip}><Text style={s.chipTx}>Disponible</Text></View>}
            {!!perfil.modalidad && <View style={s.chip}><Text style={s.chipTx}>{perfil.modalidad}</Text></View>}
          </View>
        </View>

        {/* ══ MAIN ══ */}
        <View style={s.main}>
          {!!perfil.frase?.trim() && (
            <View style={s.fraseWrap}>
              <Text style={s.frase}>{perfil.frase}</Text>
            </View>
          )}

          {perfil.experiencia.length > 0 && (
            <View>
              <SecHeader label="EXPERIENCIA" />
              {perfil.experiencia.map((e) => (
                <View key={e.id} style={s.tlWrap}>
                  <View style={s.tlDot} />
                  <View style={s.tlContent}>
                    <Text style={s.tlTitle}>{e.cargo}</Text>
                    <Text style={s.tlInst}>{e.empresa}  ·  {e.tipo}</Text>
                    <Text style={s.tlPeriod}>{e.periodo}</Text>
                    {!!e.descripcion && <Text style={s.tlDesc}>{e.descripcion}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {perfil.formacion.length > 0 && (
            <View>
              <SecHeader label="FORMACION" />
              {perfil.formacion.map((f) => (
                <View key={f.id} style={s.tlWrap}>
                  <View style={s.tlDot} />
                  <View style={s.tlContent}>
                    <Text style={s.tlTitle}>{f.programa}</Text>
                    <Text style={s.tlInst}>{f.institucion}  ·  {f.nivel}</Text>
                    <Text style={s.tlPeriod}>{f.anioInicio} — {f.anioFin}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {perfil.proyectos.length > 0 && (
            <View>
              <SecHeader label="PROYECTOS" />
              {perfil.proyectos.slice(0, 4).map((p) => {
                const { tipo, techs } = parseTag(p.tag);
                return (
                  <View key={p.id} style={s.projCard}>
                    <View style={s.projRow}>
                      <Text style={s.projName}>{p.titulo}</Text>
                      {!!tipo && <Text style={s.projTipo}>{tipo}</Text>}
                    </View>
                    {!!p.descripcion && <Text style={s.projDesc}>{p.descripcion}</Text>}
                    {techs.length > 0 && <Text style={s.projTecs}>{techs.join("  ·  ")}</Text>}
                    {!!p.enlace && <Text style={{ fontSize: 7.5, color: NEON, marginTop: 2 }}>{p.enlace}</Text>}
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
