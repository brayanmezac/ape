'use client'
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import AmortizationChart from './AmortizationChart'
import AmortizationTable from './AmortizationTable'
import { calculateAmortization } from '../utils/calculateAmortization'
import { formatNumber } from '../utils/formatNumbers'

export type AmortizationType = 'frances' | 'aleman' | 'americano'
export type AmortizationRow = {
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

export interface AdvancedSettings {
  seguro: AdvancedSetting
  otrosCostos: AdvancedSetting
  aportes: AdvancedSetting
  tabsVisibility: AdvancedSetting
}

export default function LoanAmortizationCalculatorNew() {
  const [type, setType] = useState<AmortizationType>('frances')
  const [amount, setAmount] = useState<string>('')
  const [months, setMonths] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [table, setTable] = useState<AmortizationRow[]>([])
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showTabs, setShowTabs] = useState<boolean>(false)
  const [chartView, setChartView] = useState<'monthly' | 'quarterly' | 'annual'>('monthly')
  const [error, setError] = useState<string | null>(null)
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    seguro: { active: false, value: '' },
    otrosCostos: { active: false, value: '' },
    aportes: { active: false, value: '' },
    tabsVisibility: { active: false, value: '' }
  })

  const handleSettingChange = (
    setting: keyof AdvancedSettings,
    field: 'active' | 'value',
    newValue: boolean | string
  ) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [setting]: {
        ...prev[setting],
        [field]: newValue
      }
    }))
    if (setting === 'tabsVisibility') {
      setShowTabs(newValue as boolean)
    }
  }

  const handleCalculate = () => {
    try {
      setError(null)
      const principal = parseFloat(amount)
      const periods = parseInt(months)
      const rate = parseFloat(interestRate) / 100 / 12
      if (isNaN(principal) || principal <= 0) {
        throw new Error("El monto del crédito debe ser mayor que cero.")
      }
      if (isNaN(periods) || periods <= 0) {
        throw new Error("El tiempo (meses) debe ser mayor que cero.")
      }
      if (isNaN(rate) || rate < 0) {
        throw new Error("La tasa de interés es inválida.")
      }
      const seguro = advancedSettings.seguro.active
        ? parseFloat(advancedSettings.seguro.value) || 0
        : 0
      const otros = advancedSettings.otrosCostos.active
        ? parseFloat(advancedSettings.otrosCostos.value) || 0
        : 0
      const aporteExtra = advancedSettings.aportes.active
        ? parseFloat(advancedSettings.aportes.value) || 0
        : 0

      const calculatedTable = calculateAmortization(
        type,
        principal,
        rate,
        periods,
        aporteExtra,
        seguro,
        otros
      )
      setTable(calculatedTable)
      const newTotalInterest = calculatedTable.reduce(
        (sum, row) => sum + row.interes + row.seguro + row.otrosCostos,
        0
      )
      const newTotalPayment = calculatedTable.reduce(
        (sum, row) => sum + row.cuotaTotal + row.aporte,
        0
      )
      setTotalInterest(newTotalInterest)
      setTotalPayment(newTotalPayment)
    } catch (err: unknown) {
      let errorMessage = 'Ocurrió un error desconocido.'
      if (err instanceof Error) {
         errorMessage = err.message
      }
      setError(errorMessage)
    }
  }

  return (
    <div className="p-1 md:px-2 space-y-4">
      {error && <div className="text-red-600 font-bold">{error}</div>}
      {showTabs && (
        <Tabs value={type} onValueChange={(val) => setType(val as AmortizationType)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="frances">Francés</TabsTrigger>
            <TabsTrigger value="aleman">Alemán</TabsTrigger>
            <TabsTrigger value="americano">Americano</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
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
          <Label>Interés (%)</Label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="% Interés"
          />
        </div>
      </div>
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced} className="border rounded-lg p-2">
        <CollapsibleTrigger className="flex w-full items-center justify-between p-2">
          <span>Ajustes Avanzados</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'transform rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2 p-4 border rounded">
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
            <div className="space-y-2 p-4 border rounded">
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
            <div className="space-y-2 p-4 border rounded">
              <Switch
                label="Aportes Extras"
                checked={advancedSettings.aportes.active}
                onCheckedChange={(checked) => handleSettingChange('aportes', 'active', checked)}
              />
              {advancedSettings.aportes.active && (
                <Input
                  type="number"
                  value={advancedSettings.aportes.value}
                  onChange={(e) => handleSettingChange('aportes', 'value', e.target.value)}
                  placeholder="$ Aporte mensual extra"
                />
              )}
            </div>
            <div className="space-y-2 p-4 border rounded">
              <Switch
                label="Mostrar Tabs"
                checked={showTabs}
                onCheckedChange={(checked) => handleSettingChange('tabsVisibility', 'active', checked)}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Button onClick={handleCalculate} className="w-full bg-[#fe9800] hover:bg-[#fe5900]">
        Calcular Amortización
      </Button>
      {table.length > 0 && (
        <div className="space-y-4">
          <div className="text-xl font-bold space-y-2">
            <p>Interés Total: ${formatNumber(totalInterest)}</p>
            <p>Pago Total: ${formatNumber(totalPayment)}</p>
          </div>
          <div className="space-y-4">
            <AmortizationChart data={table} view={chartView} setView={setChartView} />
            <AmortizationTable data={table} advancedSettings={advancedSettings} />
          </div>
        </div>
      )}
    </div>
  )
}
