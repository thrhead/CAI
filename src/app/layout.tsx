import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "@/shared/app/globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenLedger TR - Karbon Ayak İzi Yönetimi",
  description: "KOBİ'ler için ISO 14064 ve CBAM uyumlu karbon ayak izi hesaplama platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased bg-white text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
