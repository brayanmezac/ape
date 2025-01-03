'use client'
import { Card } from '@/components/ui/card'
import { FinancialHealthCalculator } from '@/components/FinancialHealthCalculator'
import { Breadcrumb } from '@/components/Breadcrumb'

export default function FinancialHealthPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <main className="flex-grow container mx-auto px-22 py-8 sm:px-2">
        <Breadcrumb
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Herramientas', href: '/herramientas' },
          { label: 'Salud Financiera', href: '/herramientas/salud-financiera' },
        ]}/>
        </main>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Evaluación de Salud Financiera
        </h1>
        <Card className="p-6">
          <FinancialHealthCalculator />
        </Card>
      </main>
    </div>
  )
} 