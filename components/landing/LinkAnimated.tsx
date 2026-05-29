"use client";

import { useEffect, useState } from "react";

type Phase =
  | "idle"      // URL shown, no chips
  | "type-out"  // slug deletes char by char
  | "type-in"   // new slug types in
  | "sharing"   // destination chips appear one by one
  | "copy";     // URL flashes "Copiado!" then resets

const NAMES = ["tu-nombre", "juan-campo", "maria-dev", "camilo-tic"];

const DESTINATIONS = [
  {
    label: "WhatsApp",
    dot: "#25D366",
    bg: "rgba(37,211,102,0.10)",
    border: "rgba(37,211,102,0.22)",
  },
  {
    label: "Correo",
    dot: "#4F8EF7",
    bg: "rgba(79,142,247,0.10)",
    border: "rgba(79,142,247,0.22)",
  },
  {
    label: "PDF",
    dot: "#FF6B6B",
    bg: "rgba(255,107,107,0.10)",
    border: "rgba(255,107,107,0.22)",
  },
];

export function LinkAnimated() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [nameIdx, setNameIdx] = useState(0);
  const [displayLen, setDisplayLen] = useState(NAMES[0].length); // start full
  const [shownDests, setShownDests] = useState(0);
  const [copied, setCopied] = useState(false);

  const name = NAMES[nameIdx];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    if (phase === "idle") {
      t = setTimeout(() => setPhase("type-out"), 4500);
    } else if (phase === "type-out") {
      if (displayLen > 0) {
        t = setTimeout(() => setDisplayLen((n) => n - 1), 55);
      } else {
        const next = (nameIdx + 1) % NAMES.length;
        setNameIdx(next);
        setPhase("type-in");
      }
    } else if (phase === "type-in") {
      if (displayLen < name.length) {
        t = setTimeout(() => setDisplayLen((n) => n + 1), 52);
      } else {
        setShownDests(0);
        t = setTimeout(() => setPhase("sharing"), 500);
      }
    } else if (phase === "sharing") {
      if (shownDests < DESTINATIONS.length) {
        t = setTimeout(() => setShownDests((n) => n + 1), 320);
      } else {
        t = setTimeout(() => setPhase("copy"), 1000);
      }
    } else if (phase === "copy") {
      setCopied(true);
      t = setTimeout(() => {
        setCopied(false);
        setShownDests(0);
        t = setTimeout(() => setPhase("idle"), 350);
      }, 650);
    }

    return () => clearTimeout(t);
  }, [phase, nameIdx, displayLen, shownDests]);

  const showCursor = phase === "type-out" || phase === "type-in";
  const slug = name.slice(0, displayLen);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* URL pill */}
      <div
        style={{
          borderRadius: 8,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: copied ? "rgba(0,229,160,0.35)" : "rgba(255,255,255,0.10)",
          background: copied ? "rgba(0,229,160,0.07)" : "rgba(255,255,255,0.05)",
          padding: "9px 14px",
          fontFamily: "monospace",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          minHeight: 38,
          transition: "border-color 0.3s, background 0.3s",
        }}
      >
        {copied ? (
          <span
            style={{
              color: "#00E5A0",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {/* check icon */}
            <svg
              viewBox="0 0 16 16"
              width="13"
              height="13"
              fill="none"
              stroke="#00E5A0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8l3.5 3.5L13 4.5" />
            </svg>
            Copiado al portapapeles
          </span>
        ) : (
          <>
            <span style={{ color: "#5A5A55" }}>AscendIA.co/</span>
            <span style={{ color: "#00E5A0", fontWeight: 600 }}>{slug}</span>
            {showCursor && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.1em",
                  background: "#00E5A0",
                  marginLeft: 1,
                  verticalAlign: "text-bottom",
                  animation: "lnkBlink 0.7s step-end infinite",
                }}
              />
            )}
          </>
        )}
      </div>

      {/* Destination chips */}
      <div style={{ display: "flex", gap: 6 }}>
        {DESTINATIONS.map((dest, i) => {
          const shown = i < shownDests;
          return (
            <div
              key={dest.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px",
                borderRadius: 999,
                background: shown ? dest.bg : "transparent",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: shown ? dest.border : "transparent",
                opacity: shown ? 1 : 0,
                transform: `translateY(${shown ? 0 : 6}px) scale(${shown ? 1 : 0.85})`,
                transition: shown
                  ? "opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s, border-color 0.3s"
                  : "none",
                fontSize: 11,
                color: dest.dot,
                fontWeight: 500,
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: dest.dot,
                  flexShrink: 0,
                  boxShadow: shown ? `0 0 6px ${dest.dot}80` : "none",
                  transition: "box-shadow 0.3s",
                }}
              />
              {dest.label}
            </div>
          );
        })}
      </div>

      <style>{`@keyframes lnkBlink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
