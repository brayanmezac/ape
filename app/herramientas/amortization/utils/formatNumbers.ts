export function formatNumber(value: number): string {
    return new Intl.NumberFormat('es-ES').format(Number(value.toFixed(2)))
  }
  
  export function formatNumberForChart(value: number): string {
    if (value >= 1e6) {
      return (value / 1e6).toFixed(0) + 'M'
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(0) + 'K'
    }
    return new Intl.NumberFormat('es-ES').format(Number(value.toFixed(2)))
  }
  