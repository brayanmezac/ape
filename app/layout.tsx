import type { Metadata } from 'next'
import React from 'react';
import './globals.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'ColMaya - Comunidad Financiera',
  description: 'El zumbido de unas finanzas sanas',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <Analytics/>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

