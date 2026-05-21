"use client";

import { useEffect, useRef, useState } from "react";

const PASOS = [
  {
    n: "01",
    t: "Llena tu información",
    d: "Datos básicos, habilidades, formación, proyectos. Preguntas concretas, sin lenguaje corporativo.",
  },
  {
    n: "02",
    t: "La IA arma tu perfil",
    d: "Redactamos descripciones, sugerimos categorías y ordenamos la información para que se vea profesional.",
  },
  {
    n: "03",
    t: "Compártelo con el mundo",
    d: "Obtienes un link único y un PDF descargable. Lo envías por WhatsApp o lo adjuntas en una postulación.",
  },
];

const INTERVAL_MS = 3000;

export function PasoCards() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const startCycle = (from: number) => {
    clearInterval(intervalRef.current);
    let cur = from;
    intervalRef.current = setInterval(() => {
      cur = (cur + 1) % PASOS.length;
      setActive(cur);
    }, INTERVAL_MS);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    startCycle(0);
    return () => clearInterval(intervalRef.current);
  }, []);  // intentionally empty — startCycle uses ref, no deps needed

  const select = (i: number) => {
    setActive(i);
    startCycle(i);
  };

  return (
    <div className="grid grid-cols-3 gap-5 items-stretch">
      {PASOS.map((p, i) => {
        const on = active === i;

        return (
          <div
            key={p.n}
            className="relative flex flex-col cursor-pointer"
            onClick={() => select(i)}
          >
            {/* Connector line */}
            {i < PASOS.length - 1 && (
              <div
                className="absolute top-[52px] left-[calc(100%+10px)] right-[-10px] h-px z-0 hidden lg:block"
                style={{
                  background:
                    active === i
                      ? "linear-gradient(90deg,rgba(0,229,160,0.7) 0%,rgba(0,229,160,0.2) 100%)"
                      : "linear-gradient(90deg,rgba(0,229,160,0.18) 0%,rgba(0,229,160,0.04) 100%)",
                  transition: "background 0.5s ease",
                }}
              />
            )}

            {/* Card body */}
            <div
              className="relative z-10 flex flex-col h-full p-8 rounded-[16px]"
              style={{
                background: "#161616",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: on ? "rgba(0,229,160,0.32)" : "rgba(255,255,255,0.07)",
                boxShadow: on
                  ? "0 0 0 1px rgba(0,229,160,0.20), 0 20px 56px rgba(0,0,0,0.65)"
                  : "0 0 0 1px rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.40)",
                transform: on ? "translateY(-6px)" : "translateY(0px)",
                transition:
                  "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Number bubble */}
              <div
                className="h-12 w-12 rounded-full grid place-items-center text-base font-bold mb-6 select-none"
                style={{
                  background: on ? "#00E5A0" : "#1E1E1E",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: on ? "#00E5A0" : "rgba(255,255,255,0.09)",
                  color: on ? "#0E0E0E" : "#8A8A85",
                  transform: on ? "scale(1.12)" : "scale(1)",
                  transition:
                    "background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Title */}
              <div
                className="font-bold text-[18px] leading-snug mb-3"
                style={{
                  color: on ? "#00E5A0" : "#F5F5F0",
                  transition: "color 0.35s ease",
                }}
              >
                {p.t}
              </div>

              {/* Description */}
              <div className="text-[14px] text-ink-500 leading-relaxed flex-1">
                {p.d}
              </div>

              {/* Progress bar — fills over INTERVAL_MS as a countdown */}
              <div className="mt-8 h-[3px] rounded-full bg-ink-200 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    background: "#00E5A0",
                    width: on ? "100%" : "0%",
                    transition: on
                      ? `width ${INTERVAL_MS}ms linear`
                      : "width 0s",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
