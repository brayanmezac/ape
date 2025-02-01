import React from 'react'
import { AmortizationRow } from './LoanAmortizationCalculatorNew'
import { formatNumber } from '../utils/formatNumbers'

interface TableProps {
  data: AmortizationRow[]
  advancedSettings: {
    seguro: { active: boolean; value: string }
    otrosCostos: { active: boolean; value: string }
    aportes: { active: boolean; value: string }
  }
}

export default function AmortizationTable({ data, advancedSettings }: TableProps) {
  return (
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
              {advancedSettings.seguro.active && <th className="border p-2">Seguro</th>}
              {advancedSettings.otrosCostos.active && <th className="border p-2">Otros Costos</th>}
              {advancedSettings.aportes.active && <th className="border p-2">Aporte Extra</th>}
              <th className="border p-2">Cuota Total</th>
              <th className="border p-2">Saldo Final</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.periodo}>
                <td className="border p-2 text-center">{row.periodo}</td>
                <td className="border p-2 text-right">${formatNumber(row.saldoInicial)}</td>
                <td className="border p-2 text-right">${formatNumber(row.cuota)}</td>
                <td className="border p-2 text-right">${formatNumber(row.interes)}</td>
                <td className="border p-2 text-right">${formatNumber(row.amortizacion)}</td>
                {advancedSettings.seguro.active && (
                  <td className="border p-2 text-right">${formatNumber(row.seguro)}</td>
                )}
                {advancedSettings.otrosCostos.active && (
                  <td className="border p-2 text-right">${formatNumber(row.otrosCostos)}</td>
                )}
                {advancedSettings.aportes.active && (
                  <td className="border p-2 text-right">${formatNumber(row.aporte)}</td>
                )}
                <td className="border p-2 text-right">${formatNumber(row.cuotaTotal)}</td>
                <td className="border p-2 text-right">${formatNumber(row.saldoFinal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
