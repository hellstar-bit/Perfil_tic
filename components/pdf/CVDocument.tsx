import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

const PRIMARY = "#0f6e56";
const TEXT = "#15130f";
const MUTED = "#57514a";
const BORDER = "#e6e2db";
const SURFACE = "#faf9f7";
const BRAND_LIGHT = "#ecf7f2";
const BRAND_MID = "#1d9e75";

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: TEXT,
    flexDirection: "row",
  },
  left: {
    width: "30%",
    backgroundColor: SURFACE,
    padding: 20,
    gap: 16,
  },
  right: {
    width: "70%",
    padding: 20,
    gap: 16,
  },
  header: {
    backgroundColor: PRIMARY,
    padding: "20 24",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BRAND_MID,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
  },
  headerName: {
    color: "white",
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    letterSpacing: -0.3,
  },
  headerRole: {
    color: "#d2ede2",
    fontSize: 10,
    marginTop: 2,
  },
  headerMeta: {
    color: "#ecf7f2",
    fontSize: 8,
    marginTop: 6,
    gap: 3,
  },
  sectionTitle: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: PRIMARY,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 4,
    marginBottom: 8,
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  skillName: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: TEXT,
  },
  skillLevel: {
    fontSize: 7,
    color: MUTED,
  },
  barTrack: {
    flexDirection: "row",
    gap: 2,
    marginTop: 2,
  },
  barFill: {
    height: 3,
    flex: 1,
    borderRadius: 2,
    backgroundColor: BRAND_MID,
  },
  barEmpty: {
    height: 3,
    flex: 1,
    borderRadius: 2,
    backgroundColor: BORDER,
  },
  chip: {
    backgroundColor: BRAND_LIGHT,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    fontSize: 7,
    color: PRIMARY,
    fontFamily: "Helvetica-Bold",
  },
  timelineRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  timelineYear: {
    fontSize: 7,
    fontFamily: "Helvetica",
    color: MUTED,
    width: 64,
    paddingTop: 1,
  },
  timelineTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: TEXT,
  },
  timelineWhere: {
    fontSize: 8,
    color: PRIMARY,
    fontFamily: "Helvetica-Bold",
    marginTop: 1,
  },
  timelineDesc: {
    fontSize: 8,
    color: MUTED,
    marginTop: 2,
    lineHeight: 1.4,
  },
  projectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  projectCard: {
    width: "47%",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    padding: 8,
  },
  projectTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: TEXT,
  },
  projectTag: {
    fontSize: 6,
    color: PRIMARY,
    fontFamily: "Helvetica-Bold",
    backgroundColor: BRAND_LIGHT,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  projectDesc: {
    fontSize: 7,
    color: MUTED,
    marginTop: 3,
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 12,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: MUTED,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 6,
  },
});

const LEVELS = ["Sé poco", "Básico", "Intermedio", "Avanzado", "Experto"];

type PerfilData = {
  nombre: string;
  cargo: string;
  region: string;
  email: string;
  telefono?: string | null;
  frase?: string | null;
  modalidad?: string | null;
  slug: string;
  habilidades: { nombre: string; nivel: number }[];
  proyectos: { titulo: string; descripcion: string; tag?: string | null }[];
  formacion: { titulo: string; institucion: string; periodo: string; descripcion?: string | null }[];
  experiencia: { cargo: string; empresa: string; periodo: string; descripcion: string; tipo: string }[];
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function CVDocument({ perfil }: { perfil: PerfilData }) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header band — full width, placed as absolute so it doesn't affect the two-col layout */}
        <View style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
          <View style={s.header}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{initials(perfil.nombre)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.headerName}>{perfil.nombre}</Text>
              <Text style={s.headerRole}>{perfil.cargo}</Text>
              <View style={s.headerMeta}>
                <Text>{perfil.region}</Text>
                <Text>{perfil.email}{perfil.telefono ? `  ·  ${perfil.telefono}` : ""}</Text>
                <Text>perfiltic.co/{perfil.slug}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Spacer to push columns below header */}
        <View style={{ width: "100%", height: 100 }} />

        {/* Left column */}
        <View style={s.left}>
          {perfil.frase && (
            <View>
              <Text style={s.sectionTitle}>Perfil</Text>
              <Text style={{ fontSize: 8, color: MUTED, lineHeight: 1.5 }}>{perfil.frase}</Text>
            </View>
          )}

          {perfil.habilidades.length > 0 && (
            <View>
              <Text style={s.sectionTitle}>Habilidades</Text>
              {perfil.habilidades.map((h, i) => (
                <View key={i} style={{ marginBottom: 7 }}>
                  <View style={s.skillRow}>
                    <Text style={s.skillName}>{h.nombre}</Text>
                    <Text style={s.skillLevel}>{LEVELS[h.nivel - 1]}</Text>
                  </View>
                  <View style={s.barTrack}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <View key={n} style={n <= h.nivel ? s.barFill : s.barEmpty} />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {perfil.modalidad && (
            <View>
              <Text style={s.sectionTitle}>Disponibilidad</Text>
              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 8, color: MUTED }}>Disponible · Inmediata</Text>
                <Text style={{ fontSize: 8, color: MUTED }}>{perfil.modalidad}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Right column */}
        <View style={s.right}>
          {perfil.formacion.length > 0 && (
            <View>
              <Text style={s.sectionTitle}>Formación académica</Text>
              {perfil.formacion.map((f, i) => (
                <View key={i} style={s.timelineRow}>
                  <Text style={s.timelineYear}>{f.periodo}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={s.timelineTitle}>{f.titulo}</Text>
                    <Text style={s.timelineWhere}>{f.institucion}</Text>
                    {f.descripcion && <Text style={s.timelineDesc}>{f.descripcion}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {perfil.experiencia.length > 0 && (
            <View>
              <Text style={s.sectionTitle}>Experiencia laboral</Text>
              {perfil.experiencia.map((e, i) => (
                <View key={i} style={s.timelineRow}>
                  <Text style={s.timelineYear}>{e.periodo}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={s.timelineTitle}>{e.cargo}</Text>
                    <Text style={s.timelineWhere}>{e.empresa}</Text>
                    <Text style={s.timelineDesc}>{e.descripcion}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {perfil.proyectos.length > 0 && (
            <View>
              <Text style={s.sectionTitle}>Proyectos destacados</Text>
              <View style={s.projectGrid}>
                {perfil.proyectos.slice(0, 4).map((p, i) => (
                  <View key={i} style={s.projectCard}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Text style={s.projectTitle}>{p.titulo}</Text>
                      {p.tag && <Text style={s.projectTag}>{p.tag}</Text>}
                    </View>
                    <Text style={s.projectDesc}>{p.descripcion}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={s.footer} fixed>
          <Text>Generado por PerfilTIC · perfiltic.co/{perfil.slug}</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
