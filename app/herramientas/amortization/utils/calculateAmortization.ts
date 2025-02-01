import { AmortizationRow, AmortizationType } from '../components/LoanAmortizationCalculatorNew'

export function calculateAmortization(
  type: AmortizationType,
  principal: number,
  rate: number,
  maxPeriods: number,
  extraContribution: number,
  seguro: number,
  otrosCostos: number
): AmortizationRow[] {
  switch (type) {
    case 'frances':
      return calculateFrenchAmortization(principal, rate, maxPeriods, extraContribution, seguro, otrosCostos)
    case 'aleman':
      return calculateGermanAmortization(principal, rate, maxPeriods, extraContribution, seguro, otrosCostos)
    case 'americano':
      return calculateAmericanAmortization(principal, rate, maxPeriods, extraContribution, seguro, otrosCostos)
    default:
      throw new Error("Tipo de amortización desconocido")
  }
}

function calculateFrenchAmortization(
  principal: number,
  rate: number,
  maxPeriods: number,
  extra: number,
  seguro: number,
  otros: number
): AmortizationRow[] {
  // Cálculo de la cuota fija (sin considerar aportes extras)
  const cuota = principal * (rate * Math.pow(1 + rate, maxPeriods)) / (Math.pow(1 + rate, maxPeriods) - 1)
  let saldo = principal
  const schedule: AmortizationRow[] = []
  let period = 1
  while (saldo > 0 && period <= maxPeriods + 100) { // límite de seguridad
    const interes = saldo * rate
    const amortizacion = cuota - interes
    let aporte = extra
    if (amortizacion + aporte > saldo) {
      aporte = saldo - amortizacion
    }
    const totalPrincipalPayment = amortizacion + aporte 
    const saldoFinal = saldo - totalPrincipalPayment
    schedule.push({
      periodo: period,
      saldoInicial: saldo,
      interes,
      amortizacion,
      aporte,
      seguro,
      otrosCostos: otros,
      saldoFinal: saldoFinal < 0 ? 0 : saldoFinal,
      cuota,
      cuotaTotal: cuota + aporte + seguro + otros
    })
    saldo = saldoFinal
    if (saldo <= 0) break
    period++
  }
  return schedule
}

function calculateGermanAmortization(
  principal: number,
  rate: number,
  maxPeriods: number,
  extra: number,
  seguro: number,
  otros: number
): AmortizationRow[] {
  const fixedAmortization = principal / maxPeriods
  let saldo = principal
  const schedule: AmortizationRow[] = []
  let period = 1
  while (saldo > 0 && period <= maxPeriods + 100) {
    const interes = saldo * rate
    const amortizacion = fixedAmortization
    let aporte = extra
    if (amortizacion + aporte > saldo) {
      aporte = saldo - amortizacion
    }
    const cuota = interes + amortizacion
    const saldoFinal = saldo - (amortizacion + aporte)
    schedule.push({
      periodo: period,
      saldoInicial: saldo,
      interes,
      amortizacion,
      aporte,
      seguro,
      otrosCostos: otros,
      saldoFinal: saldoFinal < 0 ? 0 : saldoFinal,
      cuota,
      cuotaTotal: cuota + seguro + otros
    })
    saldo = saldoFinal
    if (saldo <= 0) break
    period++
  }
  return schedule
}

function calculateAmericanAmortization(
  principal: number,
  rate: number,
  maxPeriods: number,
  extra: number,
  seguro: number,
  otros: number
): AmortizationRow[] {
  let saldo = principal
  const schedule: AmortizationRow[] = []
  let period = 1
  // En el método americano se pagan intereses mensuales y el principal al final;
  // con aportes extras se reduce progresivamente el saldo.
  while (saldo > 0 && period <= maxPeriods + 100) {
    const interes = saldo * rate
    let amortizacion = 0
    let aporte = 0
    let cuota = interes
    if (period === maxPeriods || saldo - extra <= 0) {
      amortizacion = saldo
      aporte = extra
      cuota = interes + amortizacion
      saldo = 0
    } else {
      aporte = extra
      saldo = saldo - aporte
    }
    schedule.push({
      periodo: period,
      saldoInicial: saldo + (amortizacion + aporte),
      interes,
      amortizacion,
      aporte,
      seguro,
      otrosCostos: otros,
      saldoFinal: saldo < 0 ? 0 : saldo,
      cuota,
      cuotaTotal: cuota + seguro + otros
    })
    if (saldo <= 0) break
    period++
  }
  return schedule
}
