'use client'
import { useState, useEffect } from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

interface Asset {
  id: string
  name: string
  type: string
  value: number
}

interface AssetFormProps {
  assets: Asset[]
  onUpdate: (assets: Asset[]) => void
}

export function AssetForm({ assets, onUpdate }: AssetFormProps) {
  const [mounted, setMounted] = useState(false)
  const [newAsset, setNewAsset] = useState<Omit<Asset, 'id'>>({
    name: '',
    type: '',
    value: 0
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate([...assets, { ...newAsset, id: Date.now().toString() }])
    setNewAsset({ name: '', type: '', value: 0 })
  }

  const handleDelete = (id: string) => {
    onUpdate(assets.filter(asset => asset.id !== id))
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Activos</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="assetName">Nombre del activo</Label>
          <Input
            id="assetName"
            value={newAsset.name}
            onChange={e => setNewAsset(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Ej: Casa, Ahorros"
            required
          />
        </div>

        <div>
          <Label htmlFor="assetType">Tipo de activo</Label>
          <select
            id="assetType"
            className="w-full border rounded-md p-2"
            value={newAsset.type}
            onChange={e => setNewAsset(prev => ({ ...prev, type: e.target.value }))}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="ahorro">Ahorro</option>
            <option value="casa">Casa</option>
            <option value="vehiculos">Vehículos</option>
            <option value="muebles">Muebles</option>
            <option value="electrodomesticos">Electrodomésticos</option>
            <option value="inversiones">Inversiones</option>
          </select>
        </div>

        <div>
          <Label htmlFor="assetValue">Valor estimado</Label>
          <Input
            id="assetValue"
            type="number"
            value={newAsset.value}
            onChange={e => setNewAsset(prev => ({ ...prev, value: Number(e.target.value) }))}
            min="0"
            required
          />
        </div>

        <Button type="submit" className="w-full">Agregar Activo</Button>
      </form>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Activos registrados:</h4>
        {mounted ? (
          <ul className="space-y-2">
            {assets.map(asset => (
              <li key={asset.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{asset.name} - ${asset.value.toLocaleString()}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(asset.id)}
                >
                  Eliminar
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Card>
  )
} 