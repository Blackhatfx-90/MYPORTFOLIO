import React from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Priyanshu Shukla | Full Stack Architect & AI Engineer",
  description:
    "Full Stack Architect & AI Systems Engineer. Crafting next-gen digital experiences with React, Next.js, Node.js, TypeScript & intelligent automation.",
  keywords: [
    "Full Stack Architect",
    "Priyanshu Shukla",
    "Next.js",
    "React",
    "TypeScript",
    "AI Engineer",
    "AI Systems",
    "Portfolio",
    "Digital Experience",
  ],
  authors: [{ name: "Priyanshu Shukla" }],
  creator: "Priyanshu Shukla",
  openGraph: {
    title: "Priyanshu Shukla | Full Stack Architect & AI Engineer",
    description:
      "Crafting the digital future — engineering cinematic web experiences powered by AI.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Shukla — Architect & AI Engineer",
    creator: "@TheeeRakeee",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
