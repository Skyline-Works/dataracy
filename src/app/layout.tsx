import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dataracy | 데이터에 인문학을 더하다",
  description: "기술은 AI에게, 분석은 사람이. 공공 데이터 마켓 및 분석가 커뮤니티.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
