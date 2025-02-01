import { Card } from '@/components/ui/card'
import { Breadcrumb } from '../../../components/Breadcrumb'
/* import { LoanAmortizationCalculator } from './components/LoanAmortizationCalculator'
 */import LoanAmortizationCalculator from './components/LoanAmortizationCalculatorNew'

export default function AmortizationPage() {
  return (
    <div className="min-h-screen flex flex-col md:px-8">
      <main className="flex-grow container mx-auto px-22 py-8 sm:px-2">
        <Breadcrumb items={[
          { label: 'Inicio', href: '/' },
          { label: 'Herramientas', href: '/herramientas' },
          { label: 'Amortización de Crédito', href: '/herramientas/amortization' },
        ]} />
        <h1 className="text-3xl font-bold mt-4 mb-8">Amortización de Crédito</h1>
        <Card className="p-6" >
          <LoanAmortizationCalculator />
        </Card>
      </main>
    </div>
  )
}

