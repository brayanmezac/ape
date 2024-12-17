'use client'

import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { ToolSelector } from '../components/ToolSelector'
import { Footer } from '../components/Footer'
import { TeamSlider } from '../components/TeamSlider'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ToolSelector />
        <section className="py-20 px-8 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Nuestro Equipo</h2>
            <TeamSlider />
          </div>
        </section>
        <section id="about" className="py-20 px-8 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Acerca de Ape</h2>
            <p className="max-w-3xl mx-auto text-lg">
              Ape nace para cerrar la brecha de la educación financiera en Colombia y 
              Latinoamérica, proporcionando una aplicación accesible que combina 
              inteligencia artificial, simuladores y asistencia en vivo de expertos 
              financieros. Nuestra misión es ofrecer a niños, jóvenes y adultos las 
              herramientas necesarias para enfrentar sus desafíos económicos diarios, 
              evitando errores comunes y facilitando la toma de decisiones inteligentes.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

