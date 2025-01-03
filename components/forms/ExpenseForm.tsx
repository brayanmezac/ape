'use client'
import { useState } from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

interface Expense {
  id: string
  name: string
  type: string
  value: number
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'annual'
}

interface ExpenseFormProps {
  expenses: Expense[]
  onUpdate: (expenses: Expense[]) => void
}

export function ExpenseForm({ expenses, onUpdate }: ExpenseFormProps) {
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    name: '',
    type: '',
    value: 0,
    frequency: 'monthly'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const currentExpenses = Array.isArray(expenses) ? expenses : []
    onUpdate([...currentExpenses, { ...newExpense, id: Date.now().toString() }])
    setNewExpense({ name: '', type: '', value: 0, frequency: 'monthly' })
  }

  const handleDelete = (id: string) => {
    onUpdate(expenses.filter(expense => expense.id !== id))
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Gastos</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="expenseName">Nombre del gasto</Label>
          <Input
            id="expenseName"
            value={newExpense.name}
            onChange={e => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Ej: Alimentación, Transporte"
            required
          />
        </div>

        <div>
          <Label htmlFor="expenseType">Tipo de gasto</Label>
          <select
            id="expenseType"
            className="w-full border rounded-md p-2"
            value={newExpense.type}
            onChange={e => setNewExpense(prev => ({ ...prev, type: e.target.value }))}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="alimentacion">Alimentación</option>
            <option value="transporte">Transporte</option>
            <option value="servicios">Servicios</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="salud">Salud</option>
            <option value="educacion">Educación</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div>
          <Label htmlFor="expenseValue">Valor</Label>
          <Input
            id="expenseValue"
            type="number"
            value={newExpense.value}
            onChange={e => setNewExpense(prev => ({ ...prev, value: Number(e.target.value) }))}
            min="0"
            required
          />
        </div>

        <div>
          <Label htmlFor="frequency">Frecuencia</Label>
          <select
            id="frequency"
            className="w-full border rounded-md p-2"
            value={newExpense.frequency}
            onChange={e => setNewExpense(prev => ({ 
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

        <Button type="submit" className="w-full">Agregar Gasto</Button>
      </form>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Gastos registrados:</h4>
        <ul className="space-y-2">
          {expenses?.map(expense => (
            <li key={expense.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>
                {expense.name} - ${expense.value.toLocaleString()} ({expense.frequency})
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {/* TODO: Implementar edición */}}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(expense.id)}
                >
                  Eliminar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
} 