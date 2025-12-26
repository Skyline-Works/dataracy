import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dataracy | 데이터 분석가 커뮤니티',
  description: '데이터 분석가들이 서로 피드백을 주고받으며 소통하는 공간입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
