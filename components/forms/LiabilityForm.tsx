'use client'
import { useState } from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

interface Liability {
  id: string
  name: string
  value: number
}

interface LiabilityFormProps {
  liabilities: Liability[]
  onUpdate: (liabilities: Liability[]) => void
}

export function LiabilityForm({ liabilities, onUpdate }: LiabilityFormProps) {
  const [newLiability, setNewLiability] = useState<Omit<Liability, 'id'>>({
    name: '',
    value: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate([...liabilities, { ...newLiability, id: Date.now().toString() }])
    setNewLiability({ name: '', value: 0 })
  }

  const handleDelete = (id: string) => {
    onUpdate(liabilities.filter(liability => liability.id !== id))
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Pasivos</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="liabilityName">Nombre del pasivo</Label>
          <Input
            id="liabilityName"
            value={newLiability.name}
            onChange={e => setNewLiability(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Ej: Hipoteca, Préstamo"
            required
          />
        </div>

        <div>
          <Label htmlFor="value">Valor total</Label>
          <Input
            id="value"
            type="number"
            value={newLiability.value}
            onChange={e => setNewLiability(prev => ({ ...prev, value: Number(e.target.value) }))}
            min="0"
            required
          />
        </div>

        <Button type="submit" className="w-full">Agregar Pasivo</Button>
      </form>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Pasivos registrados:</h4>
        <ul className="space-y-2">
          {liabilities.map(liability => (
            <li key={liability.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>{liability.name} - ${liability.value.toLocaleString()}</span>
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
                  onClick={() => handleDelete(liability.id)}
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