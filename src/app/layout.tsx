import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css';

import NavBar from './components/header/page.jsx'
import Footer from './components/footer/page.jsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GECS SkillsUSA',
  description: 'Golden Eagle Skills USA website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={styles.html}>
      <head>
      </head>
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
