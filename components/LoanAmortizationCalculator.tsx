'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { Switch } from "@/components/ui/switch"

type AmortizationType = 'frances' | 'aleman' | 'americano'
type AmortizationRow = {
  periodo: number
  saldoInicial: number
  interes: number
  amortizacion: number
  aporte: number
  seguro: number
  otrosCostos: number
  saldoFinal: number
  cuota: number
  cuotaTotal: number
}

interface AdvancedSetting {
  active: boolean
  value: string
}

interface AdvancedSettings {
  seguro: AdvancedSetting
  otrosCostos: AdvancedSetting
  aportes: AdvancedSetting
}

export function LoanAmortizationCalculator() {
  const [type, setType] = useState<AmortizationType>('frances')
  const [amount, setAmount] = useState<string>('')
  const [months, setMonths] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [table, setTable] = useState<AmortizationRow[]>([])
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    seguro: { active: false, value: '' },
    otrosCostos: { active: false, value: '' },
    aportes: { active: false, value: '' }
  })

  const calculateAmortization = () => {
    
    const principal = parseFloat(amount)
    const rate = parseFloat(interestRate) / 100 / 12
    const periods = parseInt(months)

    let calculatedTable: AmortizationRow[] = []

    switch(type) {
      case 'frances':
        calculatedTable = calcularAmortizacionFrancesa(principal, rate, periods)
        break
      case 'aleman':
        calculatedTable = calcularAmortizacionAlemana(principal, rate, periods)
        break
      case 'americano':
        calculatedTable = calcularAmortizacionAmericana(principal, rate, periods)
        break
    }

    setTable(calculatedTable)
    updateTotals(calculatedTable)
  }
  const memoizedCalculateAmortization = React.useCallback(calculateAmortization, [
    type, amount, months, interestRate, advancedSettings
  ])
  
  useEffect(() => {
    memoizedCalculateAmortization()
  }, [memoizedCalculateAmortization])

  const calcularAmortizacionFrancesa = (principal: number, rate: number, periods: number): AmortizationRow[] => {
    const cuota = principal * (rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1)
    const seguro = advancedSettings.seguro.active ? parseFloat(advancedSettings.seguro.value) || 0 : 0
    const otros = advancedSettings.otrosCostos.active ? parseFloat(advancedSettings.otrosCostos.value) || 0 : 0
    
    let saldo = principal
    return Array.from({ length: periods }, (_, i) => {
      const interes = saldo * rate
      const amortizacion = cuota - interes
      const nuevoSaldo = saldo - amortizacion

      const row: AmortizationRow = {
        periodo: i + 1,
        saldoInicial: saldo,
        interes: interes,
        amortizacion: amortizacion,
        aporte: 0,
        seguro: seguro,
        otrosCostos: otros,
        saldoFinal: nuevoSaldo,
        cuota: cuota,
        cuotaTotal: cuota + seguro + otros
      }

      saldo = nuevoSaldo
      return row
    })
  }

  const calcularAmortizacionAlemana = (principal: number, rate: number, periods: number): AmortizationRow[] => {
    const amortizacionFija = principal / periods
    const seguro = parseFloat(advancedSettings.seguro.value) || 0
    const otros = parseFloat(advancedSettings.otrosCostos.value) || 0
    
    let saldo = principal
    return Array.from({ length: periods }, (_, i) => {
      const interes = saldo * rate
      const nuevoSaldo = saldo - amortizacionFija
      const cuota = amortizacionFija + interes

      const row: AmortizationRow = {
        periodo: i + 1,
        saldoInicial: saldo,
        interes: interes,
        amortizacion: amortizacionFija,
        aporte: 0,
        seguro: seguro,
        otrosCostos: otros,
        saldoFinal: nuevoSaldo,
        cuota: cuota,
        cuotaTotal: cuota + seguro + otros
      }

      saldo = nuevoSaldo
      return row
    })
  }

  const calcularAmortizacionAmericana = (principal: number, rate: number, periods: number): AmortizationRow[] => {
    const interesMensual = principal * rate
    const seguro = parseFloat(advancedSettings.seguro.value) || 0
    const otros = parseFloat(advancedSettings.otrosCostos.value) || 0

    return Array.from({ length: periods }, (_, i) => {
      const cuota = i === periods - 1 ? principal + interesMensual : interesMensual
      return {
        periodo: i + 1,
        saldoInicial: principal,
        interes: interesMensual,
        amortizacion: i === periods - 1 ? principal : 0,
        aporte: 0,
        seguro: seguro,
        otrosCostos: otros,
        saldoFinal: i === periods - 1 ? 0 : principal,
        cuota: cuota,
        cuotaTotal: cuota + seguro + otros
      }
    })
  }

  const handleAporte = (periodo: number, aporte: number) => {
    const updatedTable = table.map((row, index) => {
      if (index < periodo - 1) return row;

      const newRow = { ...row };
      if (index === periodo - 1) {
        newRow.aporte = aporte;
      }

      // Recalcular saldos y amortización
      if (index > 0) {
        newRow.saldoInicial = table[index - 1].saldoFinal - (index === periodo - 1 ? aporte : 0);
      } else {
        newRow.saldoInicial -= aporte;
      }

      switch(type) {
        case 'frances':
          newRow.interes = newRow.saldoInicial * (parseFloat(interestRate) / 100 / 12);
          newRow.amortizacion = newRow.cuota - newRow.interes;
          break;
        case 'aleman':
          newRow.interes = newRow.saldoInicial * (parseFloat(interestRate) / 100 / 12);
          // La amortización se mantiene fija
          break;
        case 'americano':
          newRow.interes = newRow.saldoInicial * (parseFloat(interestRate) / 100 / 12);
          if (index === table.length - 1) {
            newRow.amortizacion = newRow.saldoInicial;
          }
          break;
      }

      newRow.saldoFinal = newRow.saldoInicial - newRow.amortizacion;
      newRow.cuota = newRow.interes + newRow.amortizacion;

      return newRow;
    });

    setTable(updatedTable);
    updateTotals(updatedTable);
  }

  const updateTotals = (updatedTable: AmortizationRow[]) => {
    const newTotalInterest = updatedTable.reduce((sum, row) => 
      sum + row.interes + row.seguro + row.otrosCostos, 0);
    const newTotalPayment = updatedTable.reduce((sum, row) => 
      sum + row.cuotaTotal + row.aporte, 0);
    setTotalInterest(newTotalInterest);
    setTotalPayment(newTotalPayment);
  }

  const handleSettingChange = (setting: keyof AdvancedSettings, field: 'active' | 'value', newValue: boolean | string) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [setting]: {
        ...prev[setting],
        [field]: newValue
      }
    }))
  }

  return (
    <div className="p-4 space-y-4">
      <Tabs value={type} onValueChange={(val) => setType(val as AmortizationType)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="frances">Francés</TabsTrigger>
          <TabsTrigger value="aleman">Alemán</TabsTrigger>
          <TabsTrigger value="americano">Americano</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Monto del Crédito</Label>
          <Input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="$ Monto"
          />
        </div>
        <div>
          <Label>Tiempo (Meses)</Label>
          <Input 
            type="number" 
            value={months} 
            onChange={(e) => setMonths(e.target.value)} 
            placeholder="Número de meses"
          />
        </div>
        <div>
          <Label>Interés (NA %)</Label>
          <Input 
            type="number" 
            value={interestRate} 
            onChange={(e) => setInterestRate(e.target.value)} 
            placeholder="% Interés"
          />
        </div>
      </div>

      <Collapsible 
        open={showAdvanced} 
        onOpenChange={setShowAdvanced}
        className="border rounded-lg p-2"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-2">
          <span>Ajustes Avanzados</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'transform rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 p-4">
                <Switch
                  label="Seguro Mensual"
                  checked={advancedSettings.seguro.active}
                  onCheckedChange={(checked) => handleSettingChange('seguro', 'active', checked)}
                />
                {advancedSettings.seguro.active && (
                  <Input
                    type="number"
                    value={advancedSettings.seguro.value}
                    onChange={(e) => handleSettingChange('seguro', 'value', e.target.value)}
                    placeholder="$ Seguro mensual"
                  />
                )}
              </div>
              <div className="space-y-2 p-4">
                <Switch
                  label="Otros Costos Mensuales"
                  checked={advancedSettings.otrosCostos.active}
                  onCheckedChange={(checked) => handleSettingChange('otrosCostos', 'active', checked)}
                />
                {advancedSettings.otrosCostos.active && (
                  <Input
                    type="number"
                    value={advancedSettings.otrosCostos.value}
                    onChange={(e) => handleSettingChange('otrosCostos', 'value', e.target.value)}
                    placeholder="$ Otros costos"
                  />
                )}
              </div>
              <div className="space-y-2 p-4">
                <Switch
                  label="Aportes Extras"
                  checked={advancedSettings.aportes.active}
                  onCheckedChange={(checked) => handleSettingChange('aportes', 'active', checked)}
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Button onClick={memoizedCalculateAmortization} className="w-full bg-[#fe9800] hover:bg-[#fe5900]" >
        Calcular Amortización
      </Button>

      {table.length > 0 && (
        <div className="space-y-4">
          <div className="text-xl font-bold space-y-2">
            <p>Interés Total: ${totalInterest.toFixed(2)}</p>
            <p>Pago Total: ${totalPayment.toFixed(2)}</p>
          </div>

          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={table}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" />
                <YAxis tickFormatter={(value: number) => value.toFixed(2)} />
                <Tooltip formatter={(value: number) => value.toFixed(2)} />
                <Legend />
                <Bar dataKey="amortizacion" stackId="a" fill="#2A9D8F" name="Amortización" />
                <Bar dataKey="interes" stackId="a" fill="#E63946" name="Interés" />
                {advancedSettings.seguro.active && 
                  <Bar dataKey="seguro" stackId="a" fill="#457B9D" name="Seguro" />
                }
                {advancedSettings.otrosCostos.active && 
                  <Bar dataKey="otrosCostos" stackId="a" fill="#FFD166" name="Otros Costos" />
                }
                {advancedSettings.aportes.active && 
                  <Bar dataKey="aporte" stackId="a" fill="#A8DADC" name="Aporte Extra" />
                }
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Periodo</th>
                    <th className="border p-2">Saldo Inicial</th>
                    <th className="border p-2">Cuota</th>
                    <th className="border p-2">Interés</th>
                    <th className="border p-2">Amortización</th>
                    {advancedSettings.seguro.active && 
                      <th className="border p-2">Seguro</th>
                    }
                    {advancedSettings.otrosCostos.active && 
                      <th className="border p-2">Otros Costos</th>
                    }
                    {advancedSettings.aportes.active && (
                      <>
                        <th className="border p-2">Aporte Extra</th>
                        <th className="border p-2">Acciones</th>
                      </>
                    )}
                    <th className="border p-2">Cuota Total</th>
                    <th className="border p-2">Saldo Final</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((row) => (
                    <tr key={row.periodo}>
                      <td className="border p-2 text-center">{row.periodo}</td>
                      <td className="border p-2 text-right">${row.saldoInicial.toFixed(2)}</td>
                      <td className="border p-2 text-right">${row.cuota.toFixed(2)}</td>
                      <td className="border p-2 text-right">${row.interes.toFixed(2)}</td>
                      <td className="border p-2 text-right">${row.amortizacion.toFixed(2)}</td>
                      {advancedSettings.seguro.active && 
                        <td className="border p-2 text-right">${row.seguro.toFixed(2)}</td>
                      }
                      {advancedSettings.otrosCostos.active && 
                        <td className="border p-2 text-right">${row.otrosCostos.toFixed(2)}</td>
                      }
                      {advancedSettings.aportes.active && (
                        <>
                          <td className="border p-2">
                            <Input 
                              type="number" 
                              value={row.aporte}
                              onChange={(e) => handleAporte(row.periodo, parseFloat(e.target.value) || 0)}
                              className="w-full"
                            />
                          </td>
                          <td className="border p-2 text-center">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAporte(row.periodo, 0)}
                            >
                              Limpiar
                            </Button>
                          </td>
                        </>
                      )}
                      <td className="border p-2 text-right">${row.cuotaTotal.toFixed(2)}</td>
                      <td className="border p-2 text-right">${row.saldoFinal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoanAmortizationCalculator

