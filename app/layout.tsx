import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Petit_Formal_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500"],
});

const script = Petit_Formal_Script({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Marwa Hassan — Photography",
  description: "Travel and landscape photography portfolio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${script.variable}`}>
      <body className="font-sans antialiased bg-paper">{children}</body>
    </html>
  );
}
