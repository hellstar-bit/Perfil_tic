const DANE_URL = "https://www.datos.gov.co/resource/gdxc-w37w.json";

type DaneRow = {
  cod_dpto: string;
  dpto: string;
  cod_mpio: string;
  nom_mpio: string;
};

export type Departamento = { codigo: string; nombre: string };
export type Municipio = { codigo: string; nombre: string };

let _cache: DaneRow[] | null = null;

async function fetchAll(): Promise<DaneRow[]> {
  if (_cache) return _cache;
  const url = `${DANE_URL}?$limit=1500&$select=cod_dpto,dpto,cod_mpio,nom_mpio`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`DANE API error: ${res.status}`);
  _cache = (await res.json()) as DaneRow[];
  return _cache;
}

function toTitle(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace(/\bd\.c\./gi, "D.C.");
}

export async function getDepartamentos(): Promise<Departamento[]> {
  const rows = await fetchAll();
  const seen = new Set<string>();
  const result: Departamento[] = [];
  for (const row of rows) {
    if (!seen.has(row.cod_dpto)) {
      seen.add(row.cod_dpto);
      result.push({ codigo: row.cod_dpto, nombre: toTitle(row.dpto) });
    }
  }
  return result.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

export async function getMunicipios(codigoDpto: string): Promise<Municipio[]> {
  const rows = await fetchAll();
  return rows
    .filter((r) => r.cod_dpto === codigoDpto)
    .map((r) => ({ codigo: r.cod_mpio, nombre: toTitle(r.nom_mpio) }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}
