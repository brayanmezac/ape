'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: 'Maria Paula Gonzalez Rojas',
    role: 'CEO',
    description: 'Líder visionaria con amplia experiencia en finanzas y tecnología.',
    image: '/Maria-paula.png'
  },
  {
    name: 'Carlos Gómez',
    role: 'CTO',
    description: 'Experto en desarrollo de software y arquitectura de sistemas.',
    image: '/placeholder.png'
  },
  {
    name: 'Laura Martínez',
    role: 'CFO',
    description: 'Estratega financiera con un historial probado en gestión de riesgos.',
    image: '/placeholder.png'
  },
  {
    name: 'Diego Sánchez',
    role: 'COO',
    description: 'Especialista en optimización de procesos y gestión de operaciones.',
    image: '/placeholder.png'
  }
]

export function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {teamMembers.map((member, index) => (
            <Card key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
              <CardContent className="flex flex-col items-center text-center">
                <Image src={member.image} alt={member.name} width={200} height={200} className="rounded-full mb-4" />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-[#fe9800] mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#fe9800] hover:bg-yellow-600">
        <ChevronLeft />
      </Button>
      <Button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#fe9800] hover:bg-yellow-600">
        <ChevronRight />
      </Button>
    </div>
  )
}

