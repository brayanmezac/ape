'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  { id: 'conversion', name: 'Conversión de Tasas' },
  { id: 'amortization', name: 'Amortización de Crédito' }
]

export function ToolSelector() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  return (
    <section id="tools" className="py-20 px-8 bg-yellow-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Nuestras Herramientas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <Card 
              key={tool.id} 
              className={`hover:shadow-lg transition-shadow duration-300 ${
                selectedTool === tool.id ? 'border-2 border-yellow-600' : ''
              }`}
              onClick={() => setSelectedTool(tool.id)}
            >
              <CardHeader>
                <CardTitle>{tool.name}</CardTitle>
                <CardDescription>Haga clic para seleccionar esta herramienta</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/herramientas/${tool.id}`}>
                  <Button 
                    className="w-full bg-[#fe9800] hover:bg-yellow-600"
                  >
                    Seleccionar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/herramientas">
            <Button className="bg-[#fe9800] hover:bg-yellow-600">
              Ver más herramientas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
