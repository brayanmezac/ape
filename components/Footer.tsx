import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#fe9800] text-white py-10">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="https://facebook.com" className="hover:text-yellow-200">
            <Facebook size={24} />
          </Link>
          <Link href="https://twitter.com" className="hover:text-yellow-200">
            <Twitter size={24} />
          </Link>
          <Link href="https://instagram.com" className="hover:text-yellow-200">
            <Instagram size={24} />
          </Link>
          <Link href="https://linkedin.com" className="hover:text-yellow-200">
            <Linkedin size={24} />
          </Link>
        </div>
        <p className="mb-2">elzumbidoquetegia@ape.com.co</p>
        <p className="mb-4">www.ape.com</p>
        <p>&copy; 2023 Ape. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

