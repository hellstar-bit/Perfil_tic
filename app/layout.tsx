import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "PerfilTIC — Tu perfil profesional en el sector TIC",
  description: "Crea tu perfil digital profesional para el sector tecnológico colombiano. Gratis, en 7 minutos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
