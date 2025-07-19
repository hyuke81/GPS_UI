import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "특허 검색 시스템",
  description: "AI 기반 특허 검색 및 분석 시스템",
  icons: {
    icon: [
      { url: "/images/main_icon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/main_icon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/images/main_icon.png",
    apple: "/images/main_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/images/main_icon.png" type="image/png" />
        <link rel="shortcut icon" href="/images/main_icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/main_icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
