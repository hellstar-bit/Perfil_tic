"use client";

import { useEffect, useState } from "react";

type Phase = "idle" | "exit" | "enter" | "fill";

const CARDS = [
  {
    bg: "#091510",
    accent: "#00E5A0",
    border: "rgba(0,229,160,0.12)",
    tags: ["React", "Node.js"],
  },
  {
    bg: "#160F04",
    accent: "#FFD166",
    border: "rgba(255,209,102,0.12)",
    tags: ["Next.js", "MySQL"],
  },
];

// Fill steps — card 0 first, then card 1
// Step 1: card 0 accent bar
// Steps 2..n0: card 0 tags
// Step n0+1: card 1 accent bar
// Steps n0+2..total: card 1 tags
const TITLE_STEPS = [1, 1 + CARDS[0].tags.length + 1] as const;
const TOTAL = TITLE_STEPS[1] + CARDS[1].tags.length;

export function PortafolioAnimated() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(TOTAL); // start full

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    if (phase === "idle") {
      t = setTimeout(() => setPhase("exit"), 5500);
    } else if (phase === "exit") {
      t = setTimeout(() => {
        setStep(0);
        setPhase("enter");
      }, 480);
    } else if (phase === "enter") {
      t = setTimeout(() => setPhase("fill"), 420);
    } else if (phase === "fill") {
      if (step < TOTAL) {
        t = setTimeout(() => setStep((n) => n + 1), 220);
      } else {
        t = setTimeout(() => setPhase("idle"), 4500);
      }
    }

    return () => clearTimeout(t);
  }, [phase, step]);

  const exiting = phase === "exit";
  const entering = phase === "enter";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {CARDS.map((card, ci) => {
        const ts = TITLE_STEPS[ci];
        const titleVisible = step >= ts;
        const visibleTags = Math.min(
          card.tags.length,
          Math.max(0, step - ts)
        );

        const dy = exiting ? 14 : entering ? -10 : 0;
        const op = exiting || entering ? 0 : 1;
        const delay = `${ci * 70}ms`;

        return (
          <div
            key={ci}
            style={{
              height: 68,
              borderRadius: 10,
              background: card.bg,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: card.border,
              overflow: "hidden",
              transform: `translateY(${dy}px)`,
              opacity: op,
              transition: `transform 0.42s cubic-bezier(0.16,1,0.3,1) ${delay}, opacity 0.38s ease ${delay}`,
              padding: "9px 11px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {/* Accent bar (title representation) */}
            <div
              style={{
                height: 8,
                borderRadius: 999,
                background: card.accent,
                width: titleVisible ? "68%" : "0%",
                opacity: 0.9,
                transition: titleVisible
                  ? "width 0.42s cubic-bezier(0.16,1,0.3,1)"
                  : "none",
              }}
            />

            {/* Tag chips */}
            <div style={{ display: "flex", gap: 5 }}>
              {card.tags.map((tag, ti) => {
                const shown = ti < visibleTags;
                return (
                  <span
                    key={ti}
                    style={{
                      fontSize: 9,
                      fontFamily: "monospace",
                      padding: "2px 7px",
                      borderRadius: 999,
                      background: shown ? `${card.accent}18` : "transparent",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: shown ? `${card.accent}35` : "transparent",
                      color: card.accent,
                      opacity: shown ? 1 : 0,
                      transform: `scale(${shown ? 1 : 0.65})`,
                      transition: shown
                        ? "opacity 0.28s ease, transform 0.32s cubic-bezier(0.16,1,0.3,1), background 0.28s, border-color 0.28s"
                        : "none",
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
