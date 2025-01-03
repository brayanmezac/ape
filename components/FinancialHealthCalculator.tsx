'use client'
import { useState, useEffect } from 'react'
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,  
  Radar, 
  ResponsiveContainer 
} from 'recharts'
import { AssetForm } from './forms/AssetForm'
import { LiabilityForm } from './forms/LiabilityForm'
import { IncomeForm } from './forms/IncomeForm'
import { FinancialMetrics } from './FinancialMetrics'
import { ExpenseForm } from './forms/ExpenseForm'
import { Button } from './ui/button'

interface Asset {
  id: string
  name: string
  type: string
  value: number
}

interface Liability {
  id: string
  name: string
  value: number
}

interface Income {
  id: string
  type: string
  value: number
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'annual'
}

interface Expense {
  id: string
  name: string
  type: string
  value: number
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'annual'
}

interface FinancialHealth {
  assets: Array<{
    id: string
    name: string
    type: string
    value: number
  }>
  liabilities: Array<{
    id: string
    name: string
    value: number
  }>
  incomes: Array<{
    id: string
    type: string
    value: number
    frequency: 'weekly' | 'monthly' | 'quarterly' | 'annual'
  }>
  metrics: {
    netWorth: number
    liquidityRatio: number
    savingsRatio: number
    debtRatio: number
    monthlyDebtRatio: number
    solvencyRatio: number
  }
  expenses: Expense[]
}

export function FinancialHealthCalculator() {
  const [financialHealth, setFinancialHealth] = useState<FinancialHealth>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('financialHealth')
      if (saved) return JSON.parse(saved)
    }
    return {
      assets: [], // activos
      liabilities: [], // pasivos
      incomes: [], // ingresos
      metrics: {
        netWorth: 0, // patrimonio
        liquidityRatio: 0, // liquidez
        savingsRatio: 0, // ahorro
        debtRatio: 0, // deuda
        monthlyDebtRatio: 0, // deuda mensual
        solvencyRatio: 0 // solvencia
      },
      expenses: []
    }
  })

  const handleUpdateAssets = (assets: Asset[]) => {
    setFinancialHealth(prev => {
      const updated = { ...prev, assets };
      localStorage.setItem('financialHealth', JSON.stringify(updated));
      calculateMetrics();
      return updated;
    });
  };

  const handleUpdateLiabilities = (liabilities: Liability[]) => {
    setFinancialHealth(prev => {
      const updated = { ...prev, liabilities };
      localStorage.setItem('financialHealth', JSON.stringify(updated));
      calculateMetrics();
      return updated;
    });
  };

  const handleUpdateIncomes = (incomes: Income[]) => {
    setFinancialHealth(prev => {
      const updated = { ...prev, incomes };
      localStorage.setItem('financialHealth', JSON.stringify(updated));
      calculateMetrics();
      return updated;
    });
  };

  const handleUpdateExpenses = (expenses: Expense[]) => {
    setFinancialHealth(prev => {
      const updated = { ...prev, expenses };
      localStorage.setItem('financialHealth', JSON.stringify(updated));
      calculateMetrics();
      return updated;
    });
  };

  const calculateMetrics = () => {
    const totalAssets = financialHealth.assets.reduce((sum, asset) => sum + asset.value, 0)
    const totalLiabilities = financialHealth.liabilities.reduce((sum, liability) => sum + liability.value, 0)
    
    // Calculamos el ingreso mensual total
    const monthlyIncome = financialHealth.incomes.reduce((sum, income) => {
      switch (income.frequency) {
        case 'weekly': return sum + (income.value * 4)
        case 'monthly': return sum + income.value
        case 'quarterly': return sum + (income.value / 3)
        case 'annual': return sum + (income.value / 12)
        default: return sum
      }
    }, 0)

    // Calculamos los gastos mensuales desde el nuevo formulario de gastos
    const monthlyExpenses = financialHealth.expenses?.reduce((sum, expense) => {
      switch (expense.frequency) {
        case 'weekly': return sum + (expense.value * 4)
        case 'monthly': return sum + expense.value
        case 'quarterly': return sum + (expense.value / 3)
        case 'annual': return sum + (expense.value / 12)
        default: return sum
      }
    }, 0)

    // Calculamos los ahorros e inversiones totales
    const savings = financialHealth.assets.filter(asset => 
      asset.type === 'ahorro' || asset.type === 'inversiones'
    ).reduce((sum, asset) => sum + asset.value, 0)

    setFinancialHealth(prev => ({
      ...prev,
      metrics: {
        // Mantenemos el patrimonio anterior si no hay activos ni pasivos nuevos
        netWorth: (financialHealth.assets.length === 0 && financialHealth.liabilities.length === 0) 
          ? prev.metrics.netWorth 
          : totalAssets - totalLiabilities,
        liquidityRatio: monthlyExpenses > 0 ? savings / monthlyExpenses : prev.metrics.liquidityRatio,
        savingsRatio: monthlyIncome > 0 ? (savings / (monthlyIncome * 12)) * 100 : prev.metrics.savingsRatio,
        debtRatio: totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : prev.metrics.debtRatio,
        monthlyDebtRatio: monthlyIncome > 0 ? (monthlyExpenses / monthlyIncome) * 100 : prev.metrics.monthlyDebtRatio,
        solvencyRatio: totalAssets > 0 ? ((totalAssets - totalLiabilities) / totalAssets) * 100 : prev.metrics.solvencyRatio
      }
    }))
  }

  const handleResetData = () => {
    // Limpiamos el localStorage
    localStorage.removeItem('assets')
    localStorage.removeItem('liabilities')
    localStorage.removeItem('incomes')
    
    // Reseteamos el estado
    setFinancialHealth({
      assets: [],
      liabilities: [],
      incomes: [],
      metrics: {
        netWorth: 0,
        liquidityRatio: 0,
        savingsRatio: 0,
        debtRatio: 0,
        monthlyDebtRatio: 0,
        solvencyRatio: 0
      },
      expenses: []
    })
  }

  useEffect(() => {
    calculateMetrics()
  }, []) // Mantenemos la dependencia vacía e ignoramos el warning con el siguiente comentario
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AssetForm 
          assets={financialHealth.assets}
          onUpdate={handleUpdateAssets}
        />
        <LiabilityForm 
          liabilities={financialHealth.liabilities}
          onUpdate={handleUpdateLiabilities}
        />
        <IncomeForm 
          incomes={financialHealth.incomes}
          onUpdate={handleUpdateIncomes}
        />
        <ExpenseForm 
          expenses={financialHealth.expenses}
          onUpdate={handleUpdateExpenses}
        />
      </div>
      
      <FinancialMetrics metrics={financialHealth.metrics} />
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={[
            {
              name: 'Liquidez',
              value: financialHealth.metrics.liquidityRatio * 10,
              fullMark: 100
            },
            {
              name: 'Ahorro',
              value: financialHealth.metrics.savingsRatio,
              fullMark: 100
            },
            {
              name: 'Deuda',
              value: Math.max(0, 100 - financialHealth.metrics.debtRatio),
              fullMark: 100
            },
            {
              name: 'Deuda Mensual',
              value: Math.max(0, 100 - financialHealth.metrics.monthlyDebtRatio),
              fullMark: 100
            },
            {
              name: 'Solvencia',
              value: financialHealth.metrics.solvencyRatio,
              fullMark: 100
            }
          ]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis 
              domain={[0, 100]} 
              tickCount={3}              
              tick={{ fill: '#666' }}
              axisLine={false}
            />
            <Radar
              name="Salud Financiera"
              dataKey="value"
              stroke="#fe9800"
              fill="#fe9800"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          variant="destructive"
          onClick={handleResetData}
          className="w-full max-w-xs"
        >
          Borrar todos los datos
        </Button>
      </div>
    </div>
  )
} 