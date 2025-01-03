'use client'
import { Card } from './ui/card'

interface Metrics {
  netWorth: number
  liquidityRatio: number
  savingsRatio: number
  debtRatio: number
  monthlyDebtRatio: number
  solvencyRatio: number
}

interface FinancialMetricsProps {
  metrics: Metrics
}

// Función de formateo unificada
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const formatPercentage = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100)
}

const formatRatio = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const getStatusColor = (metric: string, value: number): string => {
  switch (metric) {
    case 'liquidityRatio':
      return value < 3 ? '#ff3232' : value < 6 ? '#FFD700' : '#32cd32'
    case 'savingsRatio':
      return value < 10 ? '#ff3232' : value < 20 ? '#FFD700' : '#32cd32'
    case 'debtRatio':
      return value > 80 ? '#ff3232' : value > 40 ? '#FFD700' : '#32cd32'
    case 'monthlyDebtRatio':
      return value > 50 ? '#ff3232' : value > 30 ? '#FFD700' : '#32cd32'
    case 'solvencyRatio':
      return value < 30 ? '#ff3232' : value < 60 ? '#FFD700' : '#32cd32'
    default:
      return '#32cd32'
  }
}

export function FinancialMetrics({ metrics }: FinancialMetricsProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Métricas Financieras</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="font-medium">Patrimonio Neto</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl" suppressHydrationWarning>
              {formatCurrency(metrics.netWorth)}
            </p>
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: metrics.netWorth >= 0 ? '#32cd32' : '#ff3232' }}
            />
          </div>
        </div>
        <div>
          <p className="font-medium">Ratio de Liquidez</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl" suppressHydrationWarning>
              {formatRatio(metrics.liquidityRatio)}
            </p>
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getStatusColor('liquidityRatio', metrics.liquidityRatio) }}
            />
          </div>
        </div>
        <div>
          <p className="font-medium">Ratio de Ahorro</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl" suppressHydrationWarning>
              {formatPercentage(metrics.savingsRatio)}
            </p>
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getStatusColor('savingsRatio', metrics.savingsRatio) }}
            />
          </div>
        </div>
        <div>
          <p className="font-medium">Ratio de Deuda</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl" suppressHydrationWarning>
              {formatPercentage(metrics.debtRatio)}
            </p>
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getStatusColor('debtRatio', metrics.debtRatio) }}
            />
          </div>
        </div>
        <div>
          <p className="font-medium">Ratio de Deuda Mensual</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl" suppressHydrationWarning>
              {formatPercentage(metrics.monthlyDebtRatio)}
            </p>
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getStatusColor('monthlyDebtRatio', metrics.monthlyDebtRatio) }}
            />
          </div>
        </div>
        <div>
          <p className="font-medium">Ratio de Solvencia</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl" suppressHydrationWarning>
              {formatPercentage(metrics.solvencyRatio)}
            </p>
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getStatusColor('solvencyRatio', metrics.solvencyRatio) }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
} 