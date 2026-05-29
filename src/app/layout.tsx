import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sparkle Elite Cleaning | Limpieza Premium en DC, Virginia & Maryland",
  description:
    "Servicio de limpieza profesional y premium en Washington DC, Virginia y Maryland. Habitaciones, apartamentos, casas, Airbnbs, oficinas y eventos. ¡Cotiza gratis!",
  keywords: [
    "cleaning service DC",
    "limpieza profesional",
    "Washington DC cleaning",
    "Virginia cleaning",
    "Maryland cleaning",
    "Airbnb cleaning",
    "deep cleaning",
    "sparkle elite",
    "limpieza premium",
  ],
  authors: [{ name: "Sparkle Elite Cleaning" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Sparkle Elite Cleaning | Limpieza Premium en DC, VA & MD",
    description:
      "Transforma tu espacio con nuestro servicio de limpieza premium. +2,847 hogares transformados. ¡Cotiza gratis!",
    type: "website",
    locale: "es_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${montserrat.variable} antialiased bg-[#0A0F2E] text-[#E8F0FF]`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
