"use client";

import { useEffect, useState } from "react";

const WORDS = ["dirección.", "visibilidad.", "presencia.", "futuro.", "valor."];

type Phase = "show" | "delete" | "type";

export function HeroTitle({ mobile = false }: { mobile?: boolean }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [len, setLen] = useState(WORDS[0].length); // start full
  const [phase, setPhase] = useState<Phase>("show");

  const word = WORDS[wordIdx];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    if (phase === "show") {
      t = setTimeout(() => setPhase("delete"), 2800);
    } else if (phase === "delete") {
      if (len > 0) {
        t = setTimeout(() => setLen((n) => n - 1), 55);
      } else {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setPhase("type");
      }
    } else if (phase === "type") {
      if (len < word.length) {
        t = setTimeout(() => setLen((n) => n + 1), 65);
      } else {
        t = setTimeout(() => setPhase("show"), 2800);
      }
    }

    return () => clearTimeout(t);
  }, [phase, len, word.length]);

  const showCursor = phase !== "show";
  const displayWord = word.slice(0, len);

  const cursor = (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: mobile ? 2 : 3,
        height: "0.78em",
        background: "#00E5A0",
        marginLeft: mobile ? 1 : 2,
        verticalAlign: "text-bottom",
        borderRadius: 1,
        animation: showCursor ? "none" : "heroBlink 0.8s step-end infinite",
        opacity: showCursor ? 1 : undefined,
      }}
    />
  );

  if (mobile) {
    return (
      <h1 className="text-[34px] leading-[1.05] font-bold tracking-tight text-ink-900">
        Tu talento tiene nombre.
        <br />
        Ahora tiene{" "}
        <span className="text-neon">
          {displayWord}
          {cursor}
        </span>
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-[66px] leading-[0.98] font-bold tracking-[-0.03em] text-ink-900">
        Tu talento
        <br />
        tiene nombre.
        <br />
        Ahora tiene
        <br />
        <span className="text-neon">
          {displayWord}
          {cursor}
        </span>
      </h1>
      <style>{`@keyframes heroBlink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </>
  );
}
