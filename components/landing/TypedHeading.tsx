"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  lines: string[];
  className?: string;
  charMs?: number;
}

export function TypedHeading({ lines, className = "", charMs = 50 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [started, setStarted] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  // Start when the heading enters the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Type each line sequentially
  useEffect(() => {
    if (!started) return;
    if (lineIdx >= lines.length) return;

    const line = lines[lineIdx];

    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx((n) => n + 1), charMs);
      return () => clearTimeout(t);
    }

    // Line finished — move to next after a short pause
    if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => {
        setLineIdx((n) => n + 1);
        setCharIdx(0);
      }, 130);
      return () => clearTimeout(t);
    }
  }, [started, lineIdx, charIdx, lines, charMs]);

  const allDone =
    started &&
    lineIdx === lines.length - 1 &&
    charIdx >= lines[lines.length - 1].length;

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, i) => {
        const displayed =
          !started ? " " // non-breaking space so h2 keeps its height before start
          : i < lineIdx ? line
          : i === lineIdx ? line.slice(0, charIdx) || " "
          : " ";

        const isCurrent = started && i === lineIdx && !allDone;

        return (
          <span key={i} style={{ display: "block", whiteSpace: "nowrap" }}>
            {displayed === " " && !started ? (
              // invisible placeholder keeps layout stable
              <span style={{ visibility: "hidden" }}>{line}</span>
            ) : (
              displayed
            )}
            {isCurrent && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "0.78em",
                  background: "#00E5A0",
                  marginLeft: 3,
                  verticalAlign: "text-bottom",
                  borderRadius: 1,
                  animation: "thBlink 0.75s step-end infinite",
                }}
              />
            )}
          </span>
        );
      })}
      <style>{`@keyframes thBlink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </h2>
  );
}
