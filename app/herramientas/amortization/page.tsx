import { Breadcrumb } from '../../../components/Breadcrumb'
import { LoanAmortizationCalculator } from '../../../components/LoanAmortizationCalculator'

export default function AmortizationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: 'Inicio', href: '/' },
          { label: 'Herramientas', href: '/herramientas' },
          { label: 'Amortización de Crédito', href: '/herramientas/amortization' },
        ]} />
        <h1 className="text-3xl font-bold mt-4 mb-8">Amortización de Crédito</h1>
        <LoanAmortizationCalculator />
      </main>
    </div>
  )
}

