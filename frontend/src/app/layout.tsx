import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Before I Die — Life Intention Tracker",
  description:
    "A quiet, honest place to remember the things you don't want to forget to live. Create, manage, and reflect on your life goals.",
  openGraph: {
    title: "Before I Die — Life Intention Tracker",
    description:
      "Create life lists, track your dreams, and reflect on what matters most.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans font-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
