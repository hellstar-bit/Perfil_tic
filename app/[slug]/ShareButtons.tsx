"use client";

import { useState } from "react";

const Share = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/></svg>
);
const Copy = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
);

function useClipboard(slug: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const url = `${window.location.origin}/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copy, copied };
}

export function ShareButtonMobile({ slug }: { slug: string }) {
  const { copy, copied } = useClipboard(slug);
  return (
    <button
      onClick={copy}
      className="text-xs font-medium text-neon inline-flex items-center gap-1"
    >
      {copied ? <><Check /> ¡Copiado!</> : <><Share /> Compartir</>}
    </button>
  );
}

export function CopyButtonInline({ slug }: { slug: string }) {
  const { copy, copied } = useClipboard(slug);
  return (
    <button
      onClick={copy}
      className="shrink-0 inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2 py-1 rounded-md text-xs"
    >
      {copied ? <><Check /> Copiado</> : <><Copy /> Copiar</>}
    </button>
  );
}

export function ShareButtonDesktop({ slug }: { slug: string }) {
  const { copy, copied } = useClipboard(slug);
  return (
    <button onClick={copy} className="btn-outline h-10 gap-2">
      {copied ? <><Check /> ¡Copiado!</> : <><Share /> Compartir</>}
    </button>
  );
}

export function CopyButtonDesktop({ slug }: { slug: string }) {
  const { copy, copied } = useClipboard(slug);
  return (
    <button
      onClick={copy}
      className="shrink-0 inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2 py-1 rounded-md text-xs text-white"
    >
      {copied ? <><Check /> Copiado</> : <><Copy /> Copiar</>}
    </button>
  );
}
