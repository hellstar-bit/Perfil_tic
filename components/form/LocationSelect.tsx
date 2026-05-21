"use client";

import { useState, useEffect } from "react";

type Departamento = { codigo: string; nombre: string };
type Municipio = { codigo: string; nombre: string };

interface LocationSelectProps {
  departamento: string;
  municipio: string;
  onChange: (field: "departamento" | "municipio", value: string) => void;
}

export function LocationSelect({ departamento, municipio, onChange }: LocationSelectProps) {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loadingDeps, setLoadingDeps] = useState(true);
  const [loadingMuns, setLoadingMuns] = useState(false);
  const [codigoDpto, setCodigoDpto] = useState("");

  useEffect(() => {
    fetch("/api/colombia/departamentos")
      .then((r) => r.json())
      .then((data: Departamento[]) => {
        setDepartamentos(data);
        if (departamento) {
          const found = data.find((d) => d.nombre === departamento);
          if (found) setCodigoDpto(found.codigo);
        }
        setLoadingDeps(false);
      })
      .catch(() => setLoadingDeps(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-sync code when departamento prop changes after deps are loaded (localStorage restore)
  useEffect(() => {
    if (!departamento || !departamentos.length) return;
    const found = departamentos.find((d) => d.nombre === departamento);
    if (found && found.codigo !== codigoDpto) setCodigoDpto(found.codigo);
  }, [departamento, departamentos, codigoDpto]);

  useEffect(() => {
    if (!codigoDpto) {
      setMunicipios([]);
      return;
    }
    setLoadingMuns(true);
    fetch(`/api/colombia/municipios?dpto=${codigoDpto}`)
      .then((r) => r.json())
      .then((data: Municipio[]) => {
        setMunicipios(data);
        setLoadingMuns(false);
      })
      .catch(() => setLoadingMuns(false));
  }, [codigoDpto]);

  const handleDepChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const codigo = e.target.value;
    const dep = departamentos.find((d) => d.codigo === codigo);
    setCodigoDpto(codigo);
    onChange("departamento", dep?.nombre ?? "");
    onChange("municipio", "");
  };

  const selectedCodigo =
    departamentos.find((d) => d.nombre === departamento)?.codigo ?? "";

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium text-ink-600 tracking-wide">Departamento *</label>
        <select
          className="field"
          value={selectedCodigo}
          onChange={handleDepChange}
          required
          disabled={loadingDeps}
        >
          <option value="">
            {loadingDeps ? "Cargando…" : "Departamento"}
          </option>
          {departamentos.map((d) => (
            <option key={d.codigo} value={d.codigo}>
              {d.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium text-ink-600 tracking-wide">Municipio *</label>
        <select
          className={`field ${!departamento ? "opacity-40 cursor-not-allowed" : ""}`}
          value={municipio}
          onChange={(e) => onChange("municipio", e.target.value)}
          disabled={!departamento || loadingMuns}
          required
        >
          <option value="">
            {loadingMuns ? "Cargando…" : departamento ? "Municipio" : "— elige depto —"}
          </option>
          {municipios.map((m) => (
            <option key={m.codigo} value={m.nombre}>
              {m.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
