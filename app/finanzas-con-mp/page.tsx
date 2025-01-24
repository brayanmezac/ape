'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaWhatsapp, FaYoutube, FaInstagram,  FaTiktok } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import { Download, Mail,  Clipboard } from 'lucide-react'
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import infoCalculadoras from './infoCalculadoras.json'

type CalculatorInfo = {
  title: string;
  embedded?: string;
  text: string;
  link?: string;
};

export default function FinancePage() {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false)
  const [isContentModalOpen, setIsContentModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<CalculatorInfo | null>(null)

  useEffect(() => {
    setIsWelcomeModalOpen(true)
  }, [])

  const openModal = (calculatorName: string) => {
    const calculatorInfo = infoCalculadoras[calculatorName as keyof typeof infoCalculadoras];
    if (calculatorInfo) {
      // Priorizar 'embedded' pero usar 'link' si existe
      const contentToShow = {
        ...calculatorInfo,
        embedded: calculatorInfo.embedded
      };
      setModalContent(contentToShow);
      setIsContentModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[150px] max-h-[300px] w-full md:h-[300px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2025-01-14_at_9.42.54_PM-WCE3s7dqXF8R8aEeeROJvLRxRo81hk.jpeg"
          alt="Finance Banner"
          layout="fill"
          className="object-cover  w-full h-full"
          priority
        />
      </div>

      {/* Profile Section */}
      <div className="relative mx-auto -mt-20 flex max-w-4xl flex-col items-center px-4 pb-8 ">
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
        <div className="mt-6 grid w-full max-w-5xl gap-6 grid-cols-1 md:grid-cols-2">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-4">
            <Button asChild variant="default" className="bg-red-600 hover:bg-red-700 animate-fade-up animate-delay-300">
              <Link href="https://www.youtube.com/@FinanzasconMP" className="flex items-center gap-2">
                <FaYoutube className="h-5 w-5" />
                YouTube
              </Link>
            </Button>

            <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700 animate-fade-up animate-delay-500">
              <Link href="https://www.instagram.com/finanzasconmp" className="flex items-center gap-2">
                <FaInstagram className="h-5 w-5" />
                Instagram
              </Link>
            </Button>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-4">
            <Button asChild variant="default" className="bg-black hover:bg-gray-800 animate-fade-up animate-delay-700">
              <Link href="https://www.tiktok.com/@finanzas.con.mp" className="flex items-center gap-2">
                <FaTiktok className="h-5 w-5" />
                TikTok
              </Link>
            </Button>

            <div className="flex items-center gap-4 w-full">
              <Button asChild variant="default" className="flex-1 bg-purple-600 hover:bg-purple-700 animate-fade-up animate-delay-1000">
                <Link href="mailto:finanzasconmp@gmail.com" className="flex items-center gap-2 w-full">
                  <Mail className="h-5 w-5" />
                  Correo Electrónico
                </Link>
              </Button>
              <Button
                variant="default"
                className="w-24 bg-purple-600 hover:bg-purple-700 animate-fade-up animate-delay-1000"
                onClick={() => {
                  navigator.clipboard.writeText('finanzasconmp@gmail.com')
                  const notification = document.createElement('div')
                  notification.className = 'fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded shadow-lg'
                  notification.innerText = 'Correo copiado al portapapeles'
                  document.body.appendChild(notification)
                  setTimeout(() => {
                    notification.remove()
                  }, 3000)
                }}
              >
                <Clipboard className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-12 grid w-full gap-6 md:grid-cols-2">
          <Card className="animate-fade-up animate-delay-700 bg-[#fff9e2]">
            <CardHeader className="grid grid-flow-col">
              <CardTitle>Calculadoras Financieras</CardTitle>
              <FaTools className="h-4 w-4" style={{ marginTop: 0 }}/>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button variant="outline" className="flex items-center justify-between bg-[#FFF4B2]" asChild>
                <a href="/xlsx/Calculadora_de_Inversion.xlsx" download>
                  <span>Calculadora de Inversión</span>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              <p 
                className="text-sm text-muted-foreground cursor-pointer pl-4" 
                onClick={() => openModal('Calculadora de Inversión')}
              >
                Aprende a usarla
              </p>
              
              <Button variant="outline" className="flex items-center justify-between bg-[#FFDAB9]" asChild>
                <a href="/xlsx/Calculadora_Ahorro.xlsx" download>
                  <span>Calculadora de Ahorro</span>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              <p 
                className="text-sm text-muted-foreground cursor-pointer pl-4" 
                onClick={() => openModal('Calculadora de Ahorro')}
              >
                Aprende a usarla
              </p>
              
              <Button variant="outline" className="flex items-center justify-between bg-[#FFC1C1]" asChild>
                <a href="/xlsx/Calculadora_credito.xlsx" download>
                  <span>Calculadora de crédito</span>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              <p 
                className="text-sm text-muted-foreground cursor-pointer pl-4" 
                onClick={() => openModal('Calculadora de Tasas')}
              >
                Aprende a usarla
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-up animate-delay-1000 bg-[#B2EABF]">
            <CardHeader className="grid grid-flow-col">
              <CardTitle>Comunidad de WhatsApp</CardTitle> 
              <FaWhatsapp className="h-4 w-4" style={{ marginTop: 0 }}/>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-600">
              🌟 Únete a nuestra comunidad y sé parte de nuestra colmena 🐝
              
              <br/>¡No estás solo! Somos el zumbido 🐝 que te guía y hablamos de finanzas de forma clara y sencilla.
              
              <br/>📈 ¿Qué encontrarás en nuestra comunidad?
              <br/>🔍 Tips financieros 
              <br/>🤝 Conexión con personas.
              <br/>💬 Un espacio para resolver tus dudas.
              
              <br/>🚀 Es tu momento de tomar el control de tus finanzas.
              <br/>¡Únete ahora! 📝👥
              </p>
              <Button className="w-full bg-[#FE9800]">
                <Link href="https://forms.gle/gp1YiHyyVxTnCBNYA">Unirse a la Comunidad</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Warning Section */}
        <Card className="mt-6 w-full animate-fade-up animate-delay-1000 bg-[#ffacac]">
          <CardContent className="pt-6">
            <p className="text-center text-lg text-red-800">⚠️ ¡Aviso importante! ⚠️</p>
            <p className="text-center text-sm text-slate-600">
              No uso Telegram. 🚫 Hay cuentas falsas intentando engañar 😡. Si encuentras alguna, denunciala. <br/> 🚨 ¡Cuidemos nuestra comunidad! ❤️
            </p>
          </CardContent>
        </Card>

        {/* Modal para contenido educativo */}
        <Dialog open={isContentModalOpen} onOpenChange={setIsContentModalOpen}>
          <DialogContent className="sm:max-w-[400px] md:max-w-[400px] lg:max-w-[450px] w-full">
            {modalContent && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold px-2 sm:px-4 w-full">
                    {modalContent.title}
                  </DialogTitle>
                  <DialogDescription className="pt-4 text-sm sm:text-base lg:text-lg text-justify px-2 sm:px-4 w-full">
                    {(modalContent.embedded || modalContent.link) && (
                      <div 
                      className="mb-4 md:mb-6 w-full bg-gray-100 rounded-lg overflow-hidden" 
                      style={{ aspectRatio: "16 / 9" }} // Mantiene una relación 16:9
                      dangerouslySetInnerHTML={{ 
                        __html: modalContent.embedded 
                          ? modalContent.embedded
                              .replace(/width="[^"]*"/g, 'width="100%"')
                              .replace(/height="[^"]*"/g, 'height="100%"')
                          : modalContent.link || '' 
                      }} 
                    />
                    )}
                    <div className="max-h-40 overflow-y-scroll p-4">
                      <p className="whitespace-pre-line ">
                        {modalContent.text}
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start px-2 sm:px-4 w-full">
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={() => setIsContentModalOpen(false)}
                    className="w-full sm:w-auto"
                  >
                    Entendido
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de bienvenida inicial */}
        <Dialog open={isWelcomeModalOpen} onOpenChange={setIsWelcomeModalOpen}>
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
              <Button type="button" variant="secondary" onClick={() => setIsWelcomeModalOpen(false)}>
                Entendido
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}