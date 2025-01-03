'use client'
import { useState } from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

interface Income {
  id: string
  type: string
  value: number
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'annual'
}

interface IncomeFormProps {
  incomes: Income[]
  onUpdate: (incomes: Income[]) => void
}

export function IncomeForm({ incomes, onUpdate }: IncomeFormProps) {
  const [newIncome, setNewIncome] = useState<Omit<Income, 'id'>>({
    type: '',
    value: 0,
    frequency: 'monthly'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate([...incomes, { ...newIncome, id: Date.now().toString() }])
    setNewIncome({ type: '', value: 0, frequency: 'monthly' })
  }

  const handleDelete = (id: string) => {
    onUpdate(incomes.filter(income => income.id !== id))
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Ingresos</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="incomeType">Tipo de ingreso</Label>
          <select
            id="incomeType"
            className="w-full border rounded-md p-2"
            value={newIncome.type}
            onChange={e => setNewIncome(prev => ({ ...prev, type: e.target.value }))}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="sueldo">Sueldo</option>
            <option value="subsidio">Subsidio</option>
            <option value="inversion">Inversión</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div>
          <Label htmlFor="incomeValue">Valor</Label>
          <Input
            id="incomeValue"
            type="number"
            value={newIncome.value}
            onChange={e => setNewIncome(prev => ({ ...prev, value: Number(e.target.value) }))}
            min="0"
            required
          />
        </div>

        <div>
          <Label htmlFor="frequency">Frecuencia</Label>
          <select
            id="frequency"
            className="w-full border rounded-md p-2"
            value={newIncome.frequency}
            onChange={e => setNewIncome(prev => ({ 
              ...prev, 
              frequency: e.target.value as 'weekly' | 'monthly' | 'quarterly' | 'annual'
            }))}
            required
          >
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
            <option value="quarterly">Trimestral</option>
            <option value="annual">Anual</option>
          </select>
        </div>

        <Button type="submit" className="w-full">Agregar Ingreso</Button>
      </form>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Ingresos registrados:</h4>
        <ul className="space-y-2">
          {incomes.map(income => (
            <li key={income.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>
                {income.type} - ${income.value.toLocaleString()} ({income.frequency})
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(income.id)}
              >
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
} 