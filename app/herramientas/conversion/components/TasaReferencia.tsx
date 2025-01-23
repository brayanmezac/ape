import data from '@/data/data.json'

export function TasaReferencia() {
  return (
    <div className="text-center mb-4">
      <h3 className="text-xl font-bold">Tasa de Interés de Referencia de Colombia</h3>
      <p className="text-lg text-gray-700">
        Tasa Actual: <span className="font-semibold text-[#fe9800]">{data.tasaReferencia.valor}%</span>
      </p>
      <p className="text-sm text-gray-500">Última actualización: {data.tasaReferencia.ultimaActualizacion}</p>
    </div>
  )
}

