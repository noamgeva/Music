import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noam Geva — Film Music Licensing",
  description:
    "Atmospheric, cinematic music for independent filmmakers. License unique tracks or commission original scores from composer Noam Geva.",
  openGraph: {
    title: "Noam Geva — Film Music",
    description: "Atmospheric music for independent film.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain antialiased min-h-screen">{children}</body>
    </html>
  );
}
