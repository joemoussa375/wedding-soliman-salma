import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { weddingConfig } from "../wedding.config";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: weddingConfig.metadata.title,
  description: weddingConfig.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          href="/green_curtain.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/pink-floral-bg.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/itinerary-bg.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/faq-bg.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className="min-h-full flex flex-col relative bg-[#faf7f5]">
        <div
          className="fixed inset-0 pointer-events-none bg-[url('/pink-floral-bg.jpg')] bg-cover bg-center opacity-40 -z-10"
          aria-hidden="true"
        />
        <div
          className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(250,247,245,0.75)_0%,rgba(250,247,245,0.25)_60%,transparent_100%)] -z-10"
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
