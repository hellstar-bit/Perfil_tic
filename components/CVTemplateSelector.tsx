"use client";

import { TEMPLATES } from "./pdf/shared/pdfTypes";
import type { TemplateId, TemplateMetadata } from "./pdf/shared/pdfTypes";

/* ─── SVG Previews — one per template, viewBox 0 0 100 141 (A4 ratio) ─── */

function PreviewClasica() {
  const ac = "#0f6e56";
  return (
    <svg viewBox="0 0 100 141" className="absolute inset-0 w-full h-full">
      <rect width="100" height="141" fill="#fff"/>
      {/* Name */}
      <rect x="8" y="9" width="52" height="5.5" rx="1" fill={ac} opacity="0.9"/>
      <rect x="8" y="16.5" width="32" height="3" rx="0.8" fill="#888" opacity="0.5"/>
      {/* HR */}
      <line x1="8" y1="22" x2="92" y2="22" stroke={ac} strokeWidth="0.8"/>
      {/* Contact row */}
      <rect x="8" y="24.5" width="84" height="2" rx="0.5" fill="#aaa" opacity="0.45"/>
      {/* — SECTION: PERFIL — */}
      <rect x="8" y="31" width="26" height="2.5" rx="0.5" fill={ac} opacity="0.85"/>
      <line x1="8" y1="35" x2="92" y2="35" stroke="#ddd" strokeWidth="0.5"/>
      <rect x="8" y="37.5" width="82" height="1.8" rx="0.4" fill="#bbb" opacity="0.65"/>
      <rect x="8" y="41" width="70" height="1.8" rx="0.4" fill="#bbb" opacity="0.65"/>
      {/* — SECTION: HABILIDADES — */}
      <rect x="8" y="48" width="28" height="2.5" rx="0.5" fill={ac} opacity="0.85"/>
      <line x1="8" y1="52" x2="92" y2="52" stroke="#ddd" strokeWidth="0.5"/>
      <rect x="8" y="54.5" width="19" height="4" rx="2" fill={ac} opacity="0.12"/>
      <rect x="29" y="54.5" width="23" height="4" rx="2" fill={ac} opacity="0.12"/>
      <rect x="54" y="54.5" width="17" height="4" rx="2" fill={ac} opacity="0.12"/>
      <rect x="73" y="54.5" width="14" height="4" rx="2" fill={ac} opacity="0.12"/>
      <rect x="8" y="60.5" width="21" height="4" rx="2" fill={ac} opacity="0.12"/>
      <rect x="31" y="60.5" width="18" height="4" rx="2" fill={ac} opacity="0.12"/>
      {/* — SECTION: EXPERIENCIA — */}
      <rect x="8" y="70" width="30" height="2.5" rx="0.5" fill={ac} opacity="0.85"/>
      <line x1="8" y1="74" x2="92" y2="74" stroke="#ddd" strokeWidth="0.5"/>
      <rect x="8" y="77" width="46" height="2.5" rx="0.5" fill="#333" opacity="0.7"/>
      <rect x="74" y="77" width="18" height="2" rx="0.5" fill="#999" opacity="0.5"/>
      <rect x="8" y="81.5" width="28" height="1.8" rx="0.4" fill="#999" opacity="0.45"/>
      <rect x="8" y="85" width="80" height="1.5" rx="0.4" fill="#ccc" opacity="0.7"/>
      <rect x="8" y="88" width="65" height="1.5" rx="0.4" fill="#ccc" opacity="0.7"/>
      <rect x="8" y="96" width="42" height="2.5" rx="0.5" fill="#333" opacity="0.7"/>
      <rect x="74" y="96" width="18" height="2" rx="0.5" fill="#999" opacity="0.5"/>
      <rect x="8" y="100.5" width="26" height="1.8" rx="0.4" fill="#999" opacity="0.45"/>
      <rect x="8" y="104" width="75" height="1.5" rx="0.4" fill="#ccc" opacity="0.7"/>
      {/* — SECTION: FORMACION — */}
      <rect x="8" y="112" width="24" height="2.5" rx="0.5" fill={ac} opacity="0.85"/>
      <line x1="8" y1="116" x2="92" y2="116" stroke="#ddd" strokeWidth="0.5"/>
      <rect x="8" y="118.5" width="44" height="2.5" rx="0.5" fill="#333" opacity="0.7"/>
      <rect x="74" y="118.5" width="18" height="2" rx="0.5" fill="#999" opacity="0.5"/>
      <rect x="8" y="123" width="32" height="1.8" rx="0.4" fill="#999" opacity="0.45"/>
    </svg>
  );
}

function PreviewEjecutiva() {
  const gold = "#c0a96b";
  return (
    <svg viewBox="0 0 100 141" className="absolute inset-0 w-full h-full">
      <rect width="100" height="141" fill="#fff"/>
      {/* Centered name */}
      <rect x="22" y="10" width="56" height="6" rx="1" fill="#1a1a1a" opacity="0.85"/>
      {/* Gold decorative line — centered */}
      <line x1="35" y1="20" x2="65" y2="20" stroke={gold} strokeWidth="1.5"/>
      {/* Cargo centered */}
      <rect x="28" y="23.5" width="44" height="3" rx="0.8" fill="#666" opacity="0.55"/>
      {/* Contact centered */}
      <rect x="20" y="28.5" width="60" height="2" rx="0.5" fill="#aaa" opacity="0.45"/>
      <rect x="30" y="31.5" width="40" height="2" rx="0.5" fill="#aaa" opacity="0.35"/>
      {/* — SECTION box border style — */}
      <rect x="8" y="39" width="84" height="7" fill="none" stroke="#1a1a1a" strokeWidth="0.6"/>
      <rect x="25" y="41.5" width="50" height="2.5" rx="0.5" fill="#1a1a1a" opacity="0.7"/>
      {/* Habilidades — two columns */}
      <rect x="10" y="50" width="36" height="2" rx="0.4" fill="#444" opacity="0.55"/>
      <rect x="54" y="50" width="36" height="2" rx="0.4" fill="#444" opacity="0.55"/>
      <rect x="10" y="53.5" width="30" height="2" rx="0.4" fill="#444" opacity="0.45"/>
      <rect x="54" y="53.5" width="32" height="2" rx="0.4" fill="#444" opacity="0.45"/>
      <rect x="10" y="57" width="34" height="2" rx="0.4" fill="#444" opacity="0.35"/>
      <rect x="54" y="57" width="28" height="2" rx="0.4" fill="#444" opacity="0.35"/>
      {/* — EXPERIENCIA section — */}
      <rect x="8" y="65" width="84" height="7" fill="none" stroke="#1a1a1a" strokeWidth="0.6"/>
      <rect x="22" y="67.5" width="56" height="2.5" rx="0.5" fill="#1a1a1a" opacity="0.7"/>
      <rect x="8" y="76" width="42" height="2.5" rx="0.5" fill="#1a1a1a" opacity="0.65"/>
      <rect x="74" y="76" width="18" height="2" rx="0.5" fill={gold} opacity="0.7"/>
      <rect x="8" y="80" width="28" height="1.8" rx="0.4" fill="#777" opacity="0.5"/>
      <rect x="8" y="83.5" width="80" height="1.5" rx="0.4" fill="#bbb" opacity="0.7"/>
      <rect x="8" y="86.5" width="65" height="1.5" rx="0.4" fill="#bbb" opacity="0.6"/>
      <rect x="8" y="93" width="40" height="2.5" rx="0.5" fill="#1a1a1a" opacity="0.65"/>
      <rect x="74" y="93" width="18" height="2" rx="0.5" fill={gold} opacity="0.7"/>
      <rect x="8" y="97" width="26" height="1.8" rx="0.4" fill="#777" opacity="0.5"/>
      <rect x="8" y="100.5" width="75" height="1.5" rx="0.4" fill="#bbb" opacity="0.7"/>
      {/* — FORMACION section — */}
      <rect x="8" y="109" width="84" height="7" fill="none" stroke="#1a1a1a" strokeWidth="0.6"/>
      <rect x="26" y="111.5" width="48" height="2.5" rx="0.5" fill="#1a1a1a" opacity="0.7"/>
      <rect x="8" y="120" width="44" height="2.5" rx="0.5" fill="#1a1a1a" opacity="0.65"/>
      <rect x="74" y="120" width="18" height="2" rx="0.5" fill={gold} opacity="0.7"/>
      <rect x="8" y="124" width="32" height="1.8" rx="0.4" fill="#777" opacity="0.5"/>
    </svg>
  );
}

function PreviewTech() {
  const ac = "#0f6e56";
  return (
    <svg viewBox="0 0 100 141" className="absolute inset-0 w-full h-full">
      <rect width="100" height="141" fill="#fff"/>
      {/* Sidebar */}
      <rect x="0" y="0" width="30" height="141" fill={ac}/>
      {/* Avatar circle */}
      <circle cx="15" cy="18" r="9" fill={`${ac}bb`} stroke="#fff" strokeWidth="1.5"/>
      <rect x="11" y="15.5" width="8" height="5" rx="1.5" fill="#fff" opacity="0.5"/>
      {/* Name lines sidebar */}
      <rect x="4" y="30" width="22" height="3" rx="0.7" fill="#fff" opacity="0.9"/>
      <rect x="4" y="34.5" width="16" height="2" rx="0.5" fill="#fff" opacity="0.55"/>
      {/* Sidebar section: CONTACTO */}
      <rect x="4" y="41" width="18" height="1.8" rx="0.4" fill="#fff" opacity="0.4"/>
      <line x1="4" y1="44" x2="26" y2="44" stroke="#fff" strokeWidth="0.4" opacity="0.2"/>
      <rect x="4" y="46" width="22" height="1.5" rx="0.4" fill="#fff" opacity="0.65"/>
      <rect x="4" y="49" width="20" height="1.5" rx="0.4" fill="#fff" opacity="0.55"/>
      <rect x="4" y="52" width="22" height="1.5" rx="0.4" fill="#fff" opacity="0.55"/>
      {/* Sidebar section: HABILIDADES */}
      <rect x="4" y="59" width="20" height="1.8" rx="0.4" fill="#fff" opacity="0.4"/>
      <line x1="4" y1="62" x2="26" y2="62" stroke="#fff" strokeWidth="0.4" opacity="0.2"/>
      {/* Skill bars */}
      {[["React", 5], ["Node.js", 4], ["Figma", 3], ["SQL", 4], ["Python", 2]].map(([, lvl], i) => (
        <g key={i}>
          <rect x="4" y={66 + i * 9} width="22" height="1.8" rx="0.4" fill="#fff" opacity="0.7"/>
          {[0,1,2,3,4].map((b) => (
            <rect key={b} x={4 + b * 4.6} y={69 + i * 9} width="3.8" height="2" rx="0.8"
              fill="#fff" opacity={b < (lvl as number) ? 0.9 : 0.2}/>
          ))}
        </g>
      ))}
      {/* Main column */}
      {/* Section PERFIL */}
      <rect x="34" y="8" width="24" height="2" rx="0.5" fill={ac} opacity="0.8"/>
      <line x1="34" y1="12" x2="96" y2="12" stroke="#ddd" strokeWidth="0.5"/>
      <rect x="34" y="14" width="60" height="1.5" rx="0.4" fill="#bbb" opacity="0.7"/>
      <rect x="34" y="17" width="50" height="1.5" rx="0.4" fill="#bbb" opacity="0.65"/>
      {/* Section EXPERIENCIA */}
      <rect x="34" y="24" width="28" height="2" rx="0.5" fill={ac} opacity="0.8"/>
      <line x1="34" y1="28" x2="96" y2="28" stroke="#ddd" strokeWidth="0.5"/>
      {/* Timeline items */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="34" y={31 + i * 20} width="16" height="2" rx="0.4" fill={ac} opacity="0.6"/>
          <rect x="34" y={35 + i * 20} width="40" height="2.5" rx="0.5" fill="#333" opacity="0.7"/>
          <rect x="34" y={39 + i * 20} width="28" height="1.5" rx="0.4" fill={ac} opacity="0.5"/>
          <rect x="34" y={42 + i * 20} width="56" height="1.5" rx="0.4" fill="#bbb" opacity="0.7"/>
          <rect x="34" y={45 + i * 20} width="46" height="1.5" rx="0.4" fill="#bbb" opacity="0.6"/>
        </g>
      ))}
      {/* Section FORMACION */}
      <rect x="34" y="95" width="24" height="2" rx="0.5" fill={ac} opacity="0.8"/>
      <line x1="34" y1="99" x2="96" y2="99" stroke="#ddd" strokeWidth="0.5"/>
      <rect x="34" y="102" width="16" height="2" rx="0.4" fill={ac} opacity="0.6"/>
      <rect x="34" y="106" width="38" height="2.5" rx="0.5" fill="#333" opacity="0.7"/>
      <rect x="34" y="110" width="26" height="1.5" rx="0.4" fill={ac} opacity="0.5"/>
      <rect x="34" y="118" width="16" height="2" rx="0.4" fill={ac} opacity="0.6"/>
      <rect x="34" y="122" width="34" height="2.5" rx="0.5" fill="#333" opacity="0.7"/>
    </svg>
  );
}

function PreviewMinimalista() {
  return (
    <svg viewBox="0 0 100 141" className="absolute inset-0 w-full h-full">
      <rect width="100" height="141" fill="#fff"/>
      {/* Very large name */}
      <rect x="10" y="12" width="62" height="9" rx="1" fill="#000" opacity="0.88"/>
      <rect x="10" y="23" width="38" height="4" rx="0.8" fill="#666" opacity="0.5"/>
      {/* Thick separator */}
      <line x1="10" y1="31" x2="90" y2="31" stroke="#000" strokeWidth="2"/>
      {/* Contact with | separators */}
      <rect x="10" y="34.5" width="78" height="2" rx="0.5" fill="#888" opacity="0.45"/>
      {/* Wide whitespace — section 1 */}
      <rect x="10" y="47" width="20" height="2" rx="0.5" fill="#000" opacity="0.75" style={{ letterSpacing: 4 }}/>
      <line x1="10" y1="51" x2="90" y2="51" stroke="#ccc" strokeWidth="0.3"/>
      <rect x="10" y="55" width="78" height="2" rx="0.4" fill="#999" opacity="0.5"/>
      <rect x="10" y="60" width="60" height="2" rx="0.4" fill="#999" opacity="0.45"/>
      {/* Section 2 */}
      <rect x="10" y="70" width="26" height="2" rx="0.5" fill="#000" opacity="0.75"/>
      <line x1="10" y1="74" x2="90" y2="74" stroke="#ccc" strokeWidth="0.3"/>
      {/* Skills — just names */}
      <rect x="10" y="78" width="78" height="2" rx="0.4" fill="#555" opacity="0.55"/>
      {/* Section 3 */}
      <rect x="10" y="88" width="30" height="2" rx="0.5" fill="#000" opacity="0.75"/>
      <line x1="10" y1="92" x2="90" y2="92" stroke="#ccc" strokeWidth="0.3"/>
      <rect x="10" y="96" width="46" height="3" rx="0.5" fill="#000" opacity="0.65"/>
      <rect x="74" y="96.5" width="16" height="2" rx="0.4" fill="#aaa" opacity="0.6"/>
      <rect x="10" y="101" width="30" height="2" rx="0.4" fill="#888" opacity="0.5"/>
      <rect x="10" y="106" width="76" height="1.8" rx="0.4" fill="#ccc" opacity="0.7"/>
      <rect x="10" y="109.5" width="62" height="1.8" rx="0.4" fill="#ccc" opacity="0.65"/>
      <rect x="10" y="119" width="42" height="3" rx="0.5" fill="#000" opacity="0.65"/>
      <rect x="74" y="119.5" width="16" height="2" rx="0.4" fill="#aaa" opacity="0.6"/>
      <rect x="10" y="124" width="28" height="2" rx="0.4" fill="#888" opacity="0.5"/>
    </svg>
  );
}

function PreviewCompacta() {
  const navy = "#1B2A4A";
  const blue = "#2563EB";
  return (
    <svg viewBox="0 0 100 141" className="absolute inset-0 w-full h-full">
      <rect width="100" height="141" fill="#fff"/>
      {/* Dense header */}
      <rect x="5" y="7" width="45" height="5" rx="0.8" fill={navy} opacity="0.9"/>
      <rect x="5" y="13.5" width="90" height="1.8" rx="0.4" fill="#666" opacity="0.5"/>
      <line x1="5" y1="17" x2="95" y2="17" stroke={blue} strokeWidth="1.5"/>
      {/* Section — compact */}
      <rect x="5" y="20.5" width="22" height="2" rx="0.4" fill={blue} opacity="0.85"/>
      <line x1="5" y1="24" x2="95" y2="24" stroke="#d0d8e8" strokeWidth="0.4"/>
      <rect x="5" y="26" width="90" height="1.5" rx="0.4" fill="#555" opacity="0.55"/>
      {/* Dense skills — one line */}
      <rect x="5" y="30.5" width="20" height="2" rx="0.4" fill={blue} opacity="0.85"/>
      <line x1="5" y1="34" x2="95" y2="34" stroke="#d0d8e8" strokeWidth="0.4"/>
      <rect x="5" y="36" width="90" height="1.5" rx="0.4" fill="#555" opacity="0.6"/>
      {/* Dense experience items */}
      <rect x="5" y="40.5" width="30" height="2" rx="0.4" fill={blue} opacity="0.85"/>
      <line x1="5" y1="44" x2="95" y2="44" stroke="#d0d8e8" strokeWidth="0.4"/>
      {[0,1,2,3,4].map((i) => (
        <g key={i}>
          <rect x="5" y={46.5 + i * 10} width="52" height="2" rx="0.4" fill={navy} opacity="0.7"/>
          <rect x="74" y={46.5 + i * 10} width="21" height="1.8" rx="0.4" fill="#aaa" opacity="0.55"/>
          <rect x="5" y={50 + i * 10} width="36" height="1.5" rx="0.4" fill="#777" opacity="0.45"/>
          <rect x="5" y={53 + i * 10} width="82" height="1.2" rx="0.3" fill="#ccc" opacity="0.7"/>
        </g>
      ))}
      {/* Formacion — compact */}
      <rect x="5" y="101" width="24" height="2" rx="0.4" fill={blue} opacity="0.85"/>
      <line x1="5" y1="105" x2="95" y2="105" stroke="#d0d8e8" strokeWidth="0.4"/>
      {[0,1,2].map((i) => (
        <g key={i}>
          <rect x="5" y={107.5 + i * 9} width="48" height="2" rx="0.4" fill={navy} opacity="0.7"/>
          <rect x="74" y={107.5 + i * 9} width="21" height="1.8" rx="0.4" fill="#aaa" opacity="0.55"/>
          <rect x="5" y={111 + i * 9} width="30" height="1.5" rx="0.4" fill="#777" opacity="0.45"/>
        </g>
      ))}
    </svg>
  );
}

function PreviewInternacional() {
  const blue = "#0066CC";
  return (
    <svg viewBox="0 0 100 141" className="absolute inset-0 w-full h-full">
      <rect width="100" height="141" fill="#fff"/>
      {/* Name */}
      <rect x="8" y="9" width="55" height="6" rx="1" fill="#2D2D2D" opacity="0.88"/>
      {/* City — single line, no address */}
      <rect x="8" y="17" width="34" height="2.5" rx="0.6" fill="#777" opacity="0.55"/>
      {/* Contact line */}
      <rect x="8" y="21.5" width="84" height="2" rx="0.5" fill="#aaa" opacity="0.45"/>
      {/* Blue thick bar */}
      <line x1="8" y1="26" x2="92" y2="26" stroke={blue} strokeWidth="1.8"/>
      {/* PROFESSIONAL SUMMARY */}
      <rect x="8" y="31" width="38" height="2.5" rx="0.5" fill={blue} opacity="0.85"/>
      <line x1="8" y1="35.5" x2="92" y2="35.5" stroke="#d0d8e8" strokeWidth="0.5"/>
      <rect x="8" y="38" width="82" height="1.8" rx="0.4" fill="#bbb" opacity="0.65"/>
      <rect x="8" y="41.5" width="72" height="1.8" rx="0.4" fill="#bbb" opacity="0.6"/>
      {/* SKILLS — two columns */}
      <rect x="8" y="49" width="20" height="2.5" rx="0.5" fill={blue} opacity="0.85"/>
      <line x1="8" y1="53.5" x2="92" y2="53.5" stroke="#d0d8e8" strokeWidth="0.5"/>
      {[0,1,2].map((i) => (
        <g key={i}>
          <rect x="8" y={56 + i * 6} width="36" height="1.8" rx="0.4" fill="#444" opacity="0.55"/>
          <rect x="52" y={56 + i * 6} width="36" height="1.8" rx="0.4" fill="#444" opacity="0.55"/>
        </g>
      ))}
      {/* WORK EXPERIENCE */}
      <rect x="8" y="77" width="36" height="2.5" rx="0.5" fill={blue} opacity="0.85"/>
      <line x1="8" y1="81.5" x2="92" y2="81.5" stroke="#d0d8e8" strokeWidth="0.5"/>
      {[0,1].map((i) => (
        <g key={i}>
          <rect x="8" y={84 + i * 19} width="46" height="2.5" rx="0.5" fill="#2D2D2D" opacity="0.7"/>
          <rect x="74" y={84 + i * 19} width="18" height="2" rx="0.4" fill="#aaa" opacity="0.55"/>
          <rect x="8" y={88.5 + i * 19} width="30" height="1.8" rx="0.4" fill="#888" opacity="0.45"/>
          <rect x="8" y={92 + i * 19} width="80" height="1.5" rx="0.4" fill="#ccc" opacity="0.7"/>
          <rect x="8" y={95.5 + i * 19} width="65" height="1.5" rx="0.4" fill="#ccc" opacity="0.65"/>
        </g>
      ))}
      {/* EDUCATION */}
      <rect x="8" y="125" width="28" height="2.5" rx="0.5" fill={blue} opacity="0.85"/>
      <line x1="8" y1="129.5" x2="92" y2="129.5" stroke="#d0d8e8" strokeWidth="0.5"/>
      <rect x="8" y="132" width="46" height="2.5" rx="0.5" fill="#2D2D2D" opacity="0.7"/>
      <rect x="74" y="132" width="18" height="2" rx="0.4" fill="#aaa" opacity="0.55"/>
    </svg>
  );
}

function PreviewCreativa() {
  const neon = "#00E5A0";
  return (
    <svg viewBox="0 0 100 141" className="absolute inset-0 w-full h-full">
      <rect width="100" height="141" fill="#FAFAFA"/>
      {/* Dark sidebar */}
      <rect x="0" y="0" width="35" height="141" fill="#0E0E0E"/>
      {/* Avatar — neon ring */}
      <circle cx="17.5" cy="20" r="9" fill="#1a1a1a" stroke={neon} strokeWidth="1.5"/>
      <circle cx="17.5" cy="18" r="3.5" fill="#2a2a2a"/>
      <ellipse cx="17.5" cy="24" rx="5" ry="3" fill="#2a2a2a"/>
      {/* Name + cargo in sidebar */}
      <rect x="4" y="33" width="27" height="3.5" rx="0.7" fill="#fff" opacity="0.92"/>
      <rect x="4" y="38.5" width="20" height="2.5" rx="0.6" fill={neon} opacity="0.85"/>
      <rect x="4" y="43" width="27" height="1.5" rx="0.4" fill={neon} opacity="0.35"/>
      {/* Contact section */}
      <rect x="4" y="50" width="18" height="1.8" rx="0.4" fill={neon} opacity="0.55"/>
      <line x1="4" y1="53" x2="31" y2="53" stroke="#fff" strokeWidth="0.3" opacity="0.15"/>
      <rect x="4" y="55.5" width="27" height="1.5" rx="0.4" fill="#fff" opacity="0.6"/>
      <rect x="4" y="58.5" width="24" height="1.5" rx="0.4" fill="#fff" opacity="0.55"/>
      <rect x="4" y="61.5" width="27" height="1.5" rx="0.4" fill="#fff" opacity="0.55"/>
      {/* Skills section with neon bars */}
      <rect x="4" y="68" width="20" height="1.8" rx="0.4" fill={neon} opacity="0.55"/>
      <line x1="4" y1="71" x2="31" y2="71" stroke="#fff" strokeWidth="0.3" opacity="0.15"/>
      {[0,1,2,3,4].map((i) => (
        <g key={i}>
          <rect x="4" y={73.5 + i * 9} width="20" height="1.8" rx="0.4" fill="#fff" opacity="0.75"/>
          {[0,1,2,3,4].map((b) => (
            <rect key={b} x={4 + b * 5.6} y={77 + i * 9} width="4.8" height="2" rx="0.8"
              fill={neon} opacity={b < 4 - i % 3 ? 0.9 : 0.2}/>
          ))}
        </g>
      ))}
      {/* Right main column */}
      {/* Frase with neon left border */}
      <rect x="39" y="8" width="2" height="14" rx="1" fill={neon} opacity="0.8"/>
      <rect x="44" y="9" width="52" height="2" rx="0.4" fill="#444" opacity="0.55"/>
      <rect x="44" y="13" width="48" height="2" rx="0.4" fill="#444" opacity="0.5"/>
      <rect x="44" y="17" width="38" height="2" rx="0.4" fill="#444" opacity="0.45"/>
      {/* EXPERIENCIA section */}
      <rect x="39" y="28" width="26" height="2" rx="0.5" fill="#222" opacity="0.75"/>
      <rect x="39" y="31.5" width="18" height="1.5" rx="1" fill={neon} opacity="0.7"/>
      {/* Timeline with neon dots */}
      {[0,1,2].map((i) => (
        <g key={i}>
          <circle cx="42" cy={39 + i * 22} r="2.5" fill={neon} opacity="0.85"/>
          <rect x="48" y={36 + i * 22} width="36" height="2.5" rx="0.5" fill="#222" opacity="0.7"/>
          <rect x="48" y={40 + i * 22} width="24" height="1.8" rx="0.4" fill="#777" opacity="0.55"/>
          <rect x="48" y={44 + i * 22} width="46" height="1.5" rx="0.4" fill="#bbb" opacity="0.65"/>
          <rect x="48" y={47 + i * 22} width="38" height="1.5" rx="0.4" fill="#bbb" opacity="0.55"/>
        </g>
      ))}
      {/* PROYECTOS — cards with neon border */}
      <rect x="39" y="108" width="22" height="2" rx="0.5" fill="#222" opacity="0.75"/>
      <rect x="39" y="111.5" width="14" height="1.5" rx="1" fill={neon} opacity="0.7"/>
      <rect x="39" y="115" width="57" height="14" rx="2" fill="none" stroke={neon} strokeWidth="0.6" opacity="0.4"/>
      <rect x="43" y="118" width="30" height="2" rx="0.4" fill="#333" opacity="0.7"/>
      <rect x="43" y="122" width="46" height="1.5" rx="0.4" fill="#bbb" opacity="0.65"/>
    </svg>
  );
}

export const PREVIEW_MAP: Record<TemplateId, () => React.ReactElement> = {
  clasica:       PreviewClasica,
  ejecutiva:     PreviewEjecutiva,
  tech:          PreviewTech,
  minimalista:   PreviewMinimalista,
  compacta:      PreviewCompacta,
  internacional: PreviewInternacional,
  creativa:      PreviewCreativa,
};

/* ─── ATS badge ─── */
function AtsBadge({ score }: { score: number }) {
  const color =
    score >= 90 ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
    score >= 75 ? "bg-amber-100 text-amber-700 border-amber-200" :
                  "bg-red-100 text-red-700 border-red-200";
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${color}`}>
      ATS {score}%
    </span>
  );
}

/* ─── Mini card (left panel) ─── */
function TemplateCard({
  tpl, selected, onSelect,
}: { tpl: TemplateMetadata; selected: boolean; onSelect: () => void }) {
  const Preview = PREVIEW_MAP[tpl.id];
  return (
    <button
      onClick={onSelect}
      className={`relative w-full text-left rounded-[10px] border-2 transition-all overflow-hidden
        ${selected
          ? "border-neon shadow-[0_0_0_3px_rgba(0,229,160,0.15)]"
          : "border-ink-200 hover:border-ink-300"}`}
    >
      {/* A4 thumbnail */}
      <div className="w-full relative overflow-hidden rounded-t-[8px]" style={{ paddingBottom: "141.4%" }}>
        <Preview />
        {selected && (
          <div className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-neon grid place-items-center z-10">
            <svg viewBox="0 0 14 14" width="10" height="10" fill="none" stroke="#0E0E0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 7l3.5 3.5 5.5-6" />
            </svg>
          </div>
        )}
      </div>
      {/* Name + badge */}
      <div className="px-2 py-2 flex items-center justify-between gap-1">
        <span className="font-semibold text-[11px] text-ink-900 leading-tight truncate">{tpl.nombre}</span>
        <AtsBadge score={tpl.atsScore} />
      </div>
    </button>
  );
}

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
);

/* ─── Main export ─── */
interface Props {
  perfilId?: string;
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

export function CVTemplateSelector({ perfilId, selected, onSelect }: Props) {
  const active = TEMPLATES.find((t) => t.id === selected) ?? TEMPLATES[0];
  const ActivePreview = PREVIEW_MAP[active.id];

  return (
    <div className="md:grid md:grid-cols-[1fr_200px] md:gap-5 md:items-start">

      {/* ── Left: template grid ── */}
      <div>
        <p className="text-[11px] text-ink-500 mb-3">Selecciona una plantilla</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2.5">
          {TEMPLATES.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              tpl={tpl}
              selected={selected === tpl.id}
              onSelect={() => onSelect(tpl.id)}
            />
          ))}
        </div>

        {/* Mobile-only download button */}
        {perfilId && (
          <a
            href={`/api/cv/${perfilId}?template=${selected}`}
            download
            className="md:hidden mt-4 w-full flex items-center justify-center gap-2 h-11 rounded-[8px] bg-neon text-noir font-semibold text-[13px] hover:brightness-90 transition-all"
          >
            <DownloadIcon />
            Descargar {active.nombre}
          </a>
        )}
      </div>

      {/* ── Right: detail panel (desktop only) ── */}
      <div className="hidden md:flex md:flex-col md:sticky md:top-0">
        {/* Large preview */}
        <div className="w-full relative overflow-hidden rounded-[10px] border border-ink-200 shadow-sm" style={{ paddingBottom: "141.4%" }}>
          <ActivePreview />
        </div>

        {/* Info */}
        <div className="mt-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <span className="font-semibold text-[13px] text-ink-900 leading-snug">{active.nombre}</span>
            <AtsBadge score={active.atsScore} />
          </div>
          <p className="text-[11px] text-ink-500 leading-snug">{active.descripcion}</p>
          {active.idealPara && (
            <p className="text-[10px] text-ink-400 leading-snug">
              <span className="font-medium text-ink-600">Ideal para: </span>{active.idealPara}
            </p>
          )}
          {active.warning && (
            <div className="flex items-start gap-1.5 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded-[6px] px-2 py-1.5 leading-snug">
              <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" className="shrink-0 mt-0.5">
                <path d="M8 1l7 13H1L8 1z"/>
                <path d="M8 6v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="8" cy="11.5" r="0.7" fill="#fff"/>
              </svg>
              ATS reducido — diseño creativo
            </div>
          )}
          {perfilId && (
            <a
              href={`/api/cv/${perfilId}?template=${selected}`}
              download
              className="mt-1 w-full flex items-center justify-center gap-2 h-10 rounded-[8px] bg-neon text-noir font-semibold text-[12px] hover:brightness-90 transition-all"
            >
              <DownloadIcon />
              Descargar PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
