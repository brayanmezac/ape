import type { Metadata } from 'next'
import React from 'react';
import './globals.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'


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
      <body>
        <Header />
          {children}
        <Footer />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || (() => { throw new Error('NEXT_PUBLIC_GA_ID is not defined') })()} />
      </body>
    </html>
  )
}

