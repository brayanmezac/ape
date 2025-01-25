'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-[#fe9800] p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/bee-logo.svg" alt="ColMaya Logo" width={24} height={24} className="mr-2" style={{ filter: 'brightness(0) invert(1)' }} />
          <Link href="/" className="text-white text-2xl font-bold">ColMaya</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/herramientas" className="text-white hover:text-yellow-200">Herramientas</Link>
          <Link href="./#about" className="text-white hover:text-yellow-200">Acerca de</Link>
          <Link href="/finanzas-con-mp" className="text-white hover:text-yellow-200">Contacto</Link>
        </div>
        <Button className="md:hidden bg-white text-[#fe9800] hover:bg-yellow-100" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <Link href="/herramientas" className="block text-white hover:text-yellow-200 py-2">Herramientas</Link>
          <Link href="./#about" className="block text-white hover:text-yellow-200 py-2">Acerca de</Link>
          <Link href="/finanzas-con-mp" className="block text-white hover:text-yellow-200 py-2">Contacto</Link>
        </div>
      )}
    </header>
  )
}

