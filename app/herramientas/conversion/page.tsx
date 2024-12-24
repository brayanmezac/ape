import { Breadcrumb } from '../../../components/Breadcrumb'
import { InterestRateCalculator } from '../../../components/InterestRateCalculator'

export default function ConversionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: 'Inicio', href: '/' },
          { label: 'Herramientas', href: '/herramientas' },
          { label: 'Conversión de Tasas', href: '/herramientas/conversion' },
        ]} />
        <h1 className="text-3xl font-bold mt-4 mb-8">Conversión de Tasas</h1>
        <InterestRateCalculator />
      </main>
    </div>
  )
}

