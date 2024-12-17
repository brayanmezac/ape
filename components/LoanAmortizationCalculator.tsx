'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

type AmortizationType = 'frances' | 'aleman' | 'americano'
type AmortizationRow = {
  periodo: number
  saldoInicial: number
  interes: number
  amortizacion: number
  aporte: number
  saldoFinal: number
  cuota: number
}

export function LoanAmortizationCalculator() {
  const [type, setType] = useState<AmortizationType>('frances')
  const [amount, setAmount] = useState<string>('')
  const [months, setMonths] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [table, setTable] = useState<AmortizationRow[]>([])
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [totalPayment, setTotalPayment] = useState<number>(0)

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

  const calcularAmortizacionFrancesa = (principal: number, rate: number, periods: number): AmortizationRow[] => {
    const cuota = principal * (rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1)
    
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
        saldoFinal: nuevoSaldo,
        cuota: cuota
      }

      saldo = nuevoSaldo
      return row
    })
  }

  const calcularAmortizacionAlemana = (principal: number, rate: number, periods: number): AmortizationRow[] => {
    const amortizacionFija = principal / periods
    
    let saldo = principal
    return Array.from({ length: periods }, (_, i) => {
      const interes = saldo * rate
      const nuevoSaldo = saldo - amortizacionFija

      const row: AmortizationRow = {
        periodo: i + 1,
        saldoInicial: saldo,
        interes: interes,
        amortizacion: amortizacionFija,
        aporte: 0,
        saldoFinal: nuevoSaldo,
        cuota: amortizacionFija + interes
      }

      saldo = nuevoSaldo
      return row
    })
  }

  const calcularAmortizacionAmericana = (principal: number, rate: number, periods: number): AmortizationRow[] => {
    const interesMensual = principal * rate

    return Array.from({ length: periods }, (_, i) => {
      const row: AmortizationRow = {
        periodo: i + 1,
        saldoInicial: principal,
        interes: interesMensual,
        amortizacion: i === periods - 1 ? principal : 0,
        aporte: 0,
        saldoFinal: i === periods - 1 ? 0 : principal,
        cuota: i === periods - 1 ? principal + interesMensual : interesMensual
      }

      return row
    })
  }

  const handleAporte = (periodo: number, aporte: number) => {
    const updatedTable = table.map((row, index) => {
      if (index < periodo - 1) return row;

      let newRow = { ...row };
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
    const newTotalInterest = updatedTable.reduce((sum, row) => sum + row.interes, 0);
    const newTotalPayment = updatedTable.reduce((sum, row) => sum + row.cuota + row.aporte, 0);
    setTotalInterest(newTotalInterest);
    setTotalPayment(newTotalPayment);
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

      <div className="grid grid-cols-3 gap-4">
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

      <Button onClick={calculateAmortization} className="w-full">
        Calcular Amortización
      </Button>

      {table.length > 0 && (
        <div className="space-y-4">
          <div className="text-xl font-bold">
            <p>Interés Total: ${totalInterest.toFixed(2)}</p>
            <p>Pago Total: ${totalPayment.toFixed(2)}</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={table}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amortizacion" stackId="a" fill="#8884d8" name="Amortización" />
              <Bar dataKey="interes" stackId="a" fill="#82ca9d" name="Interés" />
              <Bar dataKey="aporte" stackId="a" fill="#ffc658" name="Aporte Extra" />
            </BarChart>
          </ResponsiveContainer>

          <div className="max-h-[400px] overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Periodo</th>
                  <th className="border p-2">Saldo Inicial</th>
                  <th className="border p-2">Cuota</th>
                  <th className="border p-2">Interés</th>
                  <th className="border p-2">Amortización</th>
                  <th className="border p-2">Aporte Extra</th>
                  <th className="border p-2">Saldo Final</th>
                  <th className="border p-2">Acciones</th>
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
                    <td className="border p-2">
                      <Input 
                        type="number" 
                        value={row.aporte}
                        onChange={(e) => handleAporte(row.periodo, parseFloat(e.target.value) || 0)}
                        className="w-full"
                      />
                    </td>
                    <td className="border p-2 text-right">${row.saldoFinal.toFixed(2)}</td>
                    <td className="border p-2 text-center">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAporte(row.periodo, 0)}
                      >
                        Limpiar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoanAmortizationCalculator

