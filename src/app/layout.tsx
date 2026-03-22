import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["100","200","300","400","500","600","700","800","900"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["100","200","300","400","500","600","700","800","900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noam Geva — Film Music",
  description: "Atmospheric, cinematic music for independent filmmakers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="antialiased bg-white text-black">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
