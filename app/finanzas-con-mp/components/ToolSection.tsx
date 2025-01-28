'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from 'lucide-react'

const tools = [
  { id: 'conversion', name: 'Conversión de Tasas' },
  //{ id: 'amortization', name: 'Amortización de Crédito' }
]

export function ToolSection() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tools.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tools.length) % tools.length)
  }

  return (
    <Card id="tools" className="py-8 px-4 bg-yellow-100 w-full mt-8 ">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold text-center mb-10">Nuestras Herramientas</h2>
        <div className="flex justify-center">
          <Card 
            key={tools[currentIndex].id} 
            className={`hover:shadow-lg transition-shadow duration-300 ${
              selectedTool === tools[currentIndex].id ? 'border-2 border-yellow-600' : ''
            }`}
            onClick={() => setSelectedTool(tools[currentIndex].id)}
          >
            <CardHeader>
              <CardTitle>{tools[currentIndex].name}</CardTitle>
              <CardDescription>Haga clic para seleccionar esta herramienta</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/herramientas/${tools[currentIndex].id}`}>
                <Button 
                  className="w-full bg-[#fe9800] hover:bg-yellow-600"
                >
                  Seleccionar
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10 text-center flex flex-col sm:flex-row justify-center items-center">
          <Button onClick={handlePrev} className="bg-[#fe9800] hover:bg-yellow-600 mb-4 sm:mb-0 sm:mr-4" aria-label="Previous tool">
            <ArrowLeft />
          </Button>
          <Link href="/herramientas">
            <Button className="bg-[#fe9800] hover:bg-yellow-600 mb-4 sm:mb-0 sm:mr-4" aria-label="View more tools">
              Ver más herramientas
            </Button>
          </Link>
          <Button onClick={handleNext} className="bg-[#fe9800] hover:bg-yellow-600" aria-label="Next tool">
            <ArrowRight />
          </Button>
        </div>
      </div>
    </Card>
  )
}
