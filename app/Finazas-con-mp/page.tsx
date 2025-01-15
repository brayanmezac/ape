'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Instagram, Mail, TwitterIcon as TikTok, Youtube } from 'lucide-react'
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useEffect, useState } from "react"

export default function FinancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsModalOpen(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2025-01-14_at_9.42.54_PM-WCE3s7dqXF8R8aEeeROJvLRxRo81hk.jpeg"
          alt="Finance Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Profile Section */}
      <div className="relative mx-auto -mt-20 flex max-w-4xl flex-col items-center px-4">
        <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg animate-fade-up">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2025-01-14_at_9.42.09_PM-zfwaLok0LX0xujFMvMecZDAlmtku9q.jpeg"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold animate-fade-up animate-delay-200">
          Finanzas con MP
        </h1>
        <p className="text-muted-foreground animate-fade-up animate-delay-300">
          Educación Financiera
        </p>

        {/* Social Links */}
        <div className="mt-6 grid w-full max-w-md gap-4">
          <Button asChild variant="default" className="bg-red-600 hover:bg-red-700 animate-fade-up animate-delay-300">
            <Link href="https://www.youtube.com/@FinanzasconMP" className="flex items-center gap-2">
              <Youtube className="h-5 w-5" />
              YouTube
            </Link>
          </Button>

          <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700 animate-fade-up animate-delay-500">
            <Link href="https://www.instagram.com/finanzasconmp" className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              Instagram
            </Link>
          </Button>

          <Button asChild variant="default" className="bg-black hover:bg-gray-800 animate-fade-up animate-delay-700">
            <Link href="https://www.tiktok.com/@finanzas.con.mp" className="flex items-center gap-2">
              <TikTok className="h-5 w-5" />
              TikTok
            </Link>
          </Button>

          <Button asChild variant="default" className="bg-purple-600 hover:bg-purple-700 animate-fade-up animate-delay-1000">
            <Link href="mailto:finanzasconmp@gmail.com" className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Correo Electrónico
            </Link>
          </Button>
        </div>

        {/* Resources Section */}
        <div className="mt-12 grid w-full gap-6 md:grid-cols-2">
          <Card className="animate-fade-up animate-delay-700">
            <CardHeader>
              <CardTitle>Calculadoras Financieras</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button variant="outline" className="flex items-center justify-between" asChild>
                <a href="/files/Calculadora_de_Inversion.xlsx" download>
                  <span>Calculadora de Inversión</span>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" className="flex items-center justify-between">
                <span>Calculadora de Ahorro</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex items-center justify-between" asChild>
                <a href="/files/Calculadora_tasas.xlsx" download>
                  <span>Calculadora de Tasas</span>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="animate-fade-up animate-delay-1000">
            <CardHeader>
              <CardTitle>Comunidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                ¡Únete a nuestra comunidad oficial! Completa el formulario para ser parte de este espacio seguro y lleno de valor.
              </p>
              <Button className="w-full">
                <Link href="https://forms.gle/gp1YiHyyVxTnCBNYA">Unirse a la Comunidad</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Warning Section */}
        <Card className="mt-6 w-full animate-fade-up animate-delay-1000">
          <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground">⚠️ ¡Aviso importante! ⚠️</p>
            <p className="text-center text-sm text-muted-foreground">
            
            No uso Telegram. 🚫 Hay cuentas falsas intentando engañar 😡. Si encuentras alguna, denunciala. 🚨 ¡Cuidemos nuestra comunidad! ❤️
            </p>
          </CardContent>
        </Card>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[400px] md:max-w-[600px] lg:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold">💌 ¡Hola, mi gente querida! 💌</DialogTitle>
              <DialogDescription className="pt-4 text-sm sm:text-base">
                <p className="mb-4">
                  🙏 Estas son MIS ÚNICAS REDES SOCIALES OFICIALES 🌟.
                  Si tu objetivo es aprender tips financieros que hagan la vida más fácil, ¡estás en el lugar correcto!
                </p>
                <p className="mb-4">
                  💰 Las finanzas son para todos y, sí, ¡pueden ser divertidas! 😄✨
                  🎯 ¡Sígueme y aprendamos juntos! 🚀
                </p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Entendido
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}