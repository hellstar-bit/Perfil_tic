import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Icons = {
  Back:      (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>,
  Arrow:     (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  Check:     (p: P) => <svg viewBox="0 0 24 24" width="14" height="14" strokeWidth="2.25" {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>,
  Plus:      (p: P) => <svg viewBox="0 0 24 24" width="16" height="16" strokeWidth="2"    {...base} {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Edit:      (p: P) => <svg viewBox="0 0 24 24" width="14" height="14" strokeWidth="1.75" {...base} {...p}><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>,
  Trash:     (p: P) => <svg viewBox="0 0 24 24" width="14" height="14" strokeWidth="1.75" {...base} {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/></svg>,
  X:         (p: P) => <svg viewBox="0 0 24 24" width="16" height="16" strokeWidth="1.75" {...base} {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  Chevron:   (p: P) => <svg viewBox="0 0 24 24" width="16" height="16" strokeWidth="1.75" {...base} {...p}><path d="M6 9l6 6 6-6"/></svg>,
  Link:      (p: P) => <svg viewBox="0 0 24 24" width="14" height="14" strokeWidth="1.75" {...base} {...p}><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/></svg>,
  Upload:    (p: P) => <svg viewBox="0 0 24 24" width="22" height="22" strokeWidth="1.75" {...base} {...p}><path d="M12 16V4M12 4l-4 4M12 4l4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>,
  Sparkle:   (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/></svg>,
  Search:    (p: P) => <svg viewBox="0 0 24 24" width="14" height="14" strokeWidth="1.75" {...base} {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  Cap:       (p: P) => <svg viewBox="0 0 24 24" width="22" height="22" strokeWidth="1.75" {...base} {...p}><path d="M3 9l9-4 9 4-9 4-9-4z"/><path d="M7 11v5c0 1 2.5 2.5 5 2.5s5-1.5 5-2.5v-5"/></svg>,
  Diploma:   (p: P) => <svg viewBox="0 0 64 64" width="48" height="48" strokeWidth="2"    {...base} {...p}><path d="M8 16h48v22H8z"/><path d="M14 16v22M50 16v22"/><path d="M22 44h20l-2 12-8-4-8 4z"/><circle cx="32" cy="27" r="3.5"/><path d="M28.5 27h7"/></svg>,
  Folder:    (p: P) => <svg viewBox="0 0 64 64" width="48" height="48" strokeWidth="2"    {...base} {...p}><path d="M8 18a4 4 0 0 1 4-4h12l4 4h24a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z"/><path d="M20 30l-4 4 4 4M28 30l4 4-4 4M22 38l4-8"/></svg>,
  Briefcase: (p: P) => <svg viewBox="0 0 64 64" width="48" height="48" strokeWidth="2"    {...base} {...p}><rect x="8" y="20" width="48" height="32" rx="3"/><path d="M24 20v-4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4M8 34h48"/><circle cx="32" cy="34" r="2"/></svg>,
  Logo:      (p: P) => <svg viewBox="0 0 24 24" strokeWidth="2.25" {...base} {...p}><path d="M5 19V5h7a4 4 0 0 1 0 8H5"/></svg>,

  /* ── Experience type icons ── */
  Work:      (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v3M10.5 13.5h3"/></svg>,
  Clipboard: (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>,
  GradCap:   (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><path d="M3 9l9-4 9 4-9 4-9-4z"/><path d="M7 11v5c0 1 2.5 2.5 5 2.5s5-1.5 5-2.5v-5M21 9v5"/></svg>,
  Building:  (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 21v-5h6v5"/><path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/></svg>,
  Heart:     (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Users:     (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Terminal:  (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 9l3 3-3 3M12 15h5"/></svg>,
  Store:     (p: P) => <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.75" {...base} {...p}><path d="M3 9l1-4h16l1 4H3z"/><path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M3 9a3 3 0 0 0 6 0M9 9a3 3 0 0 0 6 0M15 9a3 3 0 0 0 6 0"/><path d="M9 21v-6h6v6"/></svg>,
};
