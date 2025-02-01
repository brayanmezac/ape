import React from 'react'
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { formatNumberForChart } from '../utils/formatNumbers'
import { AmortizationRow } from './LoanAmortizationCalculatorNew'

interface ChartProps {
  data: AmortizationRow[]
  view: 'monthly' | 'quarterly' | 'annual'
  setView: (view: 'monthly' | 'quarterly' | 'annual') => void
}

interface AggregatedDataItem {
  label: string;
  amortizacion: number;
  interes: number;
  seguro: number;
  otrosCostos: number;
  aporte: number;
}

const aggregateData = (
  data: AmortizationRow[],
  view: 'monthly' | 'quarterly' | 'annual'
): (AmortizationRow | AggregatedDataItem)[] => {
  if (view === 'monthly') {
    // Para la vista mensual se muestran los datos de cada período, incluyendo el aporte
    return data.map(row => ({ ...row, label: `Mes ${row.periodo}` }))
  }

  let factor = 1
  if (view === 'quarterly') factor = 3
  else if (view === 'annual') factor = 12

  const aggregated: AggregatedDataItem[] = []
  for (let i = 0; i < data.length; i += factor) {
    const group = data.slice(i, i + factor)
    const label = view === 'quarterly'
      ? `Trimestre ${Math.floor(i / 3) + 1}`
      : `Año ${Math.floor(i / 12) + 1}`
    const sum = group.reduce(
      (acc, row) => {
        acc.amortizacion += row.amortizacion
        acc.interes += row.interes
        acc.seguro += row.seguro
        acc.otrosCostos += row.otrosCostos
        acc.aporte += row.aporte
        return acc
      },
      { amortizacion: 0, interes: 0, seguro: 0, otrosCostos: 0, aporte: 0 }
    )
    aggregated.push({ label, ...sum })
  }
  return aggregated
}

export default function AmortizationChart({ data, view, setView }: ChartProps) {
  // Uso de "view" para agrupar datos y establecer el estilo de los botones
  const chartData = aggregateData(data, view)

  return (
    <div>
      <div className="flex justify-center space-x-2 mb-4">
        <Button
          size="sm"
          variant={view === 'monthly' ? 'default' : 'outline'}
          onClick={() => setView('monthly')}
        >
          Mensual
        </Button>
        <Button
          size="sm"
          variant={view === 'quarterly' ? 'default' : 'outline'}
          onClick={() => setView('quarterly')}
        >
          Trimestral
        </Button>
        <Button
          size="sm"
          variant={view === 'annual' ? 'default' : 'outline'}
          onClick={() => setView('annual')}
        >
          Anual
        </Button>
      </div>
      <div className="h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis tickFormatter={(value: number) => formatNumberForChart(value)} />
            <Tooltip formatter={(value: number) => formatNumberForChart(value)} />
            <Legend />
            <Bar dataKey="amortizacion" stackId="a" fill="#2A9D8F" name="Amortización" />
            <Bar dataKey="aporte" stackId="a" fill="#04c2ac" name="Aporte Extra" />
            <Bar dataKey="interes" stackId="a" fill="#E63946" name="Interés" />
            <Bar dataKey="seguro" stackId="a" fill="#457B9D" name="Seguro" />
            <Bar dataKey="otrosCostos" stackId="a" fill="#FFD166" name="Otros Costos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
