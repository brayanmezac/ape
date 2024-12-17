import type { Metadata } from 'next'
import React from 'react';
import './globals.css'

export const metadata: Metadata = {
  title: 'APE - Comunidad Financiera',
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
      <body>{children}</body>
    </html>
  )
}

