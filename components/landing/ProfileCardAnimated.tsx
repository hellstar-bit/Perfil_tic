"use client";

import { useEffect, useState } from "react";

type Phase = "filling" | "idle" | "exit" | "enter";

const PROFILES = [
  {
    initials: "JC",
    avatarBg: "#1a3a6b",
    name: "Juan Luis Campo Simanca",
    role: "Desarrollador Junior",
    stack: ["JavaScript", "Python", "MySQL", "HTML/CSS", "React", "Node.js", "Git"],
    pct: 84,
    location: "Barranquilla, Atlántico",
    modality: "Remoto · Híbrido",
    tag: "recién publicado",
    tagBg: "#00E5A0",
  },
  {
    initials: "MG",
    avatarBg: "#5B1A6B",
    name: "María González Ruiz",
    role: "Diseñadora UX/UI",
    stack: ["Figma", "Adobe XD", "React", "CSS", "Illustrator", "Prototyping"],
    pct: 92,
    location: "Bogotá, Cundinamarca",
    modality: "Remoto",
    tag: "disponible ahora",
    tagBg: "#00E5A0",
  },
  {
    initials: "CV",
    avatarBg: "#1A5B3A",
    name: "Carlos Vargas Méndez",
    role: "Analista de Datos",
    stack: ["Python", "SQL", "Power BI", "Excel", "Pandas", "Tableau"],
    pct: 78,
    location: "Medellín, Antioquia",
    modality: "Híbrido",
    tag: "buscando empleo",
    tagBg: "#FFD166",
  },
];

export function ProfileCardAnimated() {
  const [profileIdx, setProfileIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("filling");
  const [step, setStep] = useState(0);

  const profile = PROFILES[profileIdx];
  // steps: 1 header · 2+i chips · 2+N progress · 3+N footer
  const totalSteps = profile.stack.length + 3;

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    if (phase === "filling") {
      if (step < totalSteps) {
        t = setTimeout(() => setStep((n) => n + 1), 160);
      } else {
        t = setTimeout(() => setPhase("idle"), 1200);
      }
    } else if (phase === "idle") {
      t = setTimeout(() => setPhase("exit"), 5500);
    } else if (phase === "exit") {
      t = setTimeout(() => {
        setProfileIdx((i) => (i + 1) % PROFILES.length);
        setStep(0);
        setPhase("enter");
      }, 600);
    } else if (phase === "enter") {
      t = setTimeout(() => setPhase("filling"), 500);
    }

    return () => clearTimeout(t);
  }, [phase, step, totalSteps]);

  /* ── card container transform ── */
  const exiting = phase === "exit";
  const entering = phase === "enter";
  const cardStyle: React.CSSProperties = {
    transform: exiting
      ? "translateY(24px) scale(0.97)"
      : entering
      ? "translateY(-18px) scale(0.97)"
      : "translateY(0px) scale(1)",
    opacity: exiting || entering ? 0 : 1,
    transition:
      exiting
        ? "transform 0.55s cubic-bezier(0.4,0,0.8,1), opacity 0.45s ease"
        : "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
  };

  /* ── visibility helpers ── */
  const headerVis = step >= 1;
  const stackVis = step >= 2;
  const chipVis = (i: number) => step >= 2 + i;
  const progressVis = step >= 2 + profile.stack.length;
  const footerVis = step >= 3 + profile.stack.length;

  const fadeIn = (visible: boolean, delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: `translateY(${visible ? 0 : 5}px)`,
    transition: visible
      ? `opacity 0.3s ease ${delay}ms, transform 0.35s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
      : "none",
  });

  return (
    <div className="relative" style={cardStyle}>
      {/* Glow */}
      <div
        className="absolute -inset-8 rounded-[32px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,229,160,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative card p-5">
        {/* ── Header ── */}
        <div className="flex items-start gap-3 mb-4" style={fadeIn(headerVis)}>
          <div
            className="h-12 w-12 rounded-full grid place-items-center text-white font-bold text-base shrink-0"
            style={{ background: profile.avatarBg }}
          >
            {profile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[15px] text-ink-900 leading-tight">
              {profile.name}
            </div>
            <div className="text-[12px] text-ink-500 mt-0.5">{profile.role}</div>
          </div>
          <span className="chip text-[10px] shrink-0">Disponible para empleo</span>
        </div>

        {/* ── Stack ── */}
        <div className="mb-4" style={fadeIn(stackVis)}>
          <div className="text-[10px] uppercase tracking-widest text-ink-500 mb-2">
            Stack
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.stack.map((s, i) => (
              <span
                key={s}
                className="text-[11px] px-2 py-0.5 rounded-md bg-ink-100 border border-ink-200 text-ink-700"
                style={{
                  opacity: chipVis(i) ? 1 : 0,
                  transform: `scale(${chipVis(i) ? 1 : 0.75})`,
                  transition: chipVis(i)
                    ? "opacity 0.22s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1)"
                    : "none",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── Progress ── */}
        <div
          className="mb-4 p-3 rounded-[8px] bg-ink-100 border border-ink-200"
          style={fadeIn(progressVis)}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-ink-500">Perfil completo</span>
            <span className="text-[11px] font-semibold text-neon">
              {profile.pct}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-ink-200">
            <div
              className="h-full rounded-full bg-neon"
              style={{
                width: progressVis ? `${profile.pct}%` : "0%",
                transition: progressVis
                  ? "width 0.9s cubic-bezier(0.16,1,0.3,1)"
                  : "none",
              }}
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="flex items-center justify-between text-[11px] text-ink-500"
          style={fadeIn(footerVis)}
        >
          <span>{profile.location}</span>
          <span className="text-ink-400">{profile.modality}</span>
        </div>
      </div>

      {/* ── Floating tag ── */}
      <div
        className="absolute -top-3 -right-3 px-3 py-1.5 rounded-[8px] text-noir text-[11px] font-bold shadow-lg rotate-1 flex items-center gap-1.5"
        style={{
          background: profile.tagBg,
          opacity: headerVis ? 1 : 0,
          transform: `scale(${headerVis ? 1 : 0.85}) rotate(1deg)`,
          transition: headerVis
            ? "opacity 0.4s ease 0.15s, transform 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s"
            : "none",
        }}
      >
        ★ {profile.tag}
      </div>
    </div>
  );
}
