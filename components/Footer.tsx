import { FaWhatsapp, FaYoutube, FaInstagram,  FaTiktok, FaFacebookF } from "react-icons/fa6";
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#fe9800] text-white py-10">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="https://www.facebook.com/share/1yeCSz8Ndb/" className="hover:text-yellow-200">
            <FaFacebookF size={24} />
          </Link>
          <Link href="https://instagram.com/finanzasconmp" className="hover:text-yellow-200">
            <FaInstagram size={24} />
          </Link>
          <Link href="https://www.tiktok.com/@finanzas.con.mp" className="hover:text-yellow-200">
            <FaTiktok size={24} />
          </Link>
          <Link href="https://www.youtube.com/@FinanzasconMP" className="hover:text-yellow-200">
            <FaYoutube size={24} />
          </Link>
          <Link href="https://wa.me/+573245075348" className="hover:text-yellow-200">
            <FaWhatsapp size={24} />
          </Link>
        </div>
        <p className="mb-2">finanzasconmp@gmail.com</p>
        <p>&copy; 2023 ColMaya. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

