"use client";

import { useEffect, useState } from "react";

type Phase =
  | "idle"        // CV visible, all lines full — pause
  | "slide-out"   // CV slides down
  | "prompt-in"   // prompt fades in
  | "typing"      // text types character by character
  | "prompt-out"  // prompt fades out
  | "slide-in"    // CV enters from above
  | "filling";    // lines fill one by one

const PROMPT = "Genera mi perfil con mi experiencia en el SENA y proyectos freelance...";

const LINES: Array<{ w: number; accent?: boolean }> = [
  { w: 80 },
  { w: 60 },
  { w: 90 },
  { w: 55, accent: true }, // neon line
  { w: 75 },
  { w: 45 },
  { w: 88 },
];

const SMALL_LINES = [88, 68, 80, 55];

export function CVMockupAnimated() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [chars, setChars] = useState(PROMPT.length); // start full
  const [filled, setFilled] = useState(LINES.length); // start full

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    if (phase === "idle") {
      t = setTimeout(() => setPhase("slide-out"), 5000);
    } else if (phase === "slide-out") {
      t = setTimeout(() => {
        setFilled(0);
        setChars(0);
        setPhase("prompt-in");
      }, 700);
    } else if (phase === "prompt-in") {
      t = setTimeout(() => setPhase("typing"), 350);
    } else if (phase === "typing") {
      if (chars < PROMPT.length) {
        t = setTimeout(() => setChars((n) => n + 1), 38);
      } else {
        t = setTimeout(() => setPhase("prompt-out"), 700);
      }
    } else if (phase === "prompt-out") {
      t = setTimeout(() => setPhase("slide-in"), 400);
    } else if (phase === "slide-in") {
      t = setTimeout(() => setPhase("filling"), 700);
    } else if (phase === "filling") {
      if (filled < LINES.length) {
        t = setTimeout(() => setFilled((n) => n + 1), 190);
      } else {
        t = setTimeout(() => setPhase("idle"), 4000);
      }
    }

    return () => clearTimeout(t);
  }, [phase, chars, filled]);

  const cvVisible = !["prompt-in", "typing", "prompt-out"].includes(phase);
  const promptVisible = !cvVisible;

  /* ── CV panel style ── */
  let cvTransform = "rotate(2deg) translateY(0px)";
  let cvOpacity = 1;
  let cvTransition = "transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease";

  if (phase === "slide-out") {
    cvTransform = "rotate(2deg) translateY(112%)";
    cvOpacity = 0;
    cvTransition = "transform 0.65s cubic-bezier(0.4,0,0.8,1), opacity 0.5s ease";
  } else if (phase === "slide-in") {
    cvTransform = "rotate(2deg) translateY(-18px)";
    cvOpacity = 0;
    cvTransition = "none";
  }

  /* ── Prompt opacity ── */
  const promptOpacity =
    phase === "prompt-in" ? 0 : phase === "prompt-out" ? 0 : 1;

  /* ── Progress bar width ── */
  const barWidth =
    phase === "prompt-out"
      ? "100%"
      : phase === "typing"
      ? `${(chars / PROMPT.length) * 100}%`
      : "0%";

  return (
    <div
      style={{
        position: "absolute",
        right: 32,
        top: 32,
        bottom: 32,
        width: 260,
      }}
    >
      {/* ── CV panel ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#F7F3EC",
          borderRadius: 14,
          boxShadow: "0 32px 80px rgba(0,0,0,0.72)",
          overflow: "hidden",
          display: cvVisible ? "block" : "none",
          transform: cvTransform,
          opacity: cvOpacity,
          transition: cvTransition,
        }}
      >
        <div style={{ padding: 20 }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                height: 36,
                width: 36,
                borderRadius: "50%",
                background: "#1E2A50",
                display: "grid",
                placeItems: "center",
                color: "white",
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              JC
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#1E2A50",
                  lineHeight: 1.2,
                }}
              >
                Juan Luis Campo
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: "#00B880",
                  marginTop: 2,
                  lineHeight: 1.2,
                }}
              >
                Desarrollador de Software Junior
              </div>
            </div>
          </div>

          <div
            style={{ height: 1, background: "#DDD9CF", marginBottom: 16 }}
          />

          {/* Main lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {LINES.map((line, i) => (
              <div
                key={i}
                style={{
                  height: 10,
                  borderRadius: 999,
                  background: line.accent ? "#00E5A0" : "#C8C3B8",
                  opacity: line.accent ? 1 : 0.65,
                  width: i < filled ? `${line.w}%` : "0%",
                  transition:
                    i === filled - 1 && phase === "filling"
                      ? "width 0.45s cubic-bezier(0.16,1,0.3,1)"
                      : "none",
                }}
              />
            ))}
          </div>

          {/* Small lines — fade in when all main lines are filled */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              opacity: filled === LINES.length ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            {SMALL_LINES.map((w, i) => (
              <div
                key={i}
                style={{
                  height: 8,
                  borderRadius: 999,
                  background: "#C8C3B8",
                  width: `${w}%`,
                  opacity: 0.4,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Prompt panel ── */}
      {promptVisible && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#0A0A0A",
            borderRadius: 14,
            border: "1px solid rgba(0,229,160,0.25)",
            boxShadow:
              "0 0 0 1px rgba(0,229,160,0.06), 0 0 48px rgba(0,229,160,0.10)",
            opacity: promptOpacity,
            transition: "opacity 0.35s ease",
            display: "flex",
            flexDirection: "column",
            padding: 20,
            gap: 12,
          }}
        >
          {/* AI label */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#00E5A0",
                boxShadow: "0 0 8px rgba(0,229,160,0.8)",
                animation: "cvPulseDot 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "rgba(0,229,160,0.85)",
                fontFamily: "monospace",
                letterSpacing: "0.02em",
              }}
            >
              IA · generando perfil
            </span>
          </div>

          {/* Text area */}
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "10px 12px",
              fontFamily: "monospace",
              fontSize: 12,
              lineHeight: 1.65,
              wordBreak: "break-word",
            }}
          >
            <span style={{ color: "#F0EDE8" }}>{PROMPT.slice(0, chars)}</span>
            {phase === "typing" && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.1em",
                  background: "#00E5A0",
                  marginLeft: 2,
                  verticalAlign: "text-bottom",
                  animation: "cvBlinkCursor 0.75s step-end infinite",
                }}
              />
            )}
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 2,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: barWidth,
                background: "linear-gradient(90deg, #00E5A0, #00C896)",
                borderRadius: 999,
                transition:
                  phase === "prompt-out"
                    ? "width 0.4s ease"
                    : "width 0.06s linear",
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes cvBlinkCursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes cvPulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(0.75)} }
      `}</style>
    </div>
  );
}
