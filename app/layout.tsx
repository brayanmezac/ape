import type { Metadata } from 'next'
import React from 'react';
import './globals.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const metadata: Metadata = {
  title: 'APE - Comunidad Financiera',
  description: 'El zumbido de unas finanzas sanas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

