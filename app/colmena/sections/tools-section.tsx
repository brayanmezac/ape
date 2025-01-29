import { CalculatorButton } from "../components/calculator-button"
import { CountdownTimer } from "../components/countdown-timer"

export function ToolsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-[#25282b] text-center mb-2">¡Aprenderás a usar las herramientas</h2>
        <p className="text-4xl text-center mb-12">
          <span className="text-[#ffb20f] font-bold">gratis</span>
          <span className="text-[#25282b]"> que hicimos para ti!</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <CalculatorButton title="Conversion de tasas" />
          <CalculatorButton title="Amortización de Credito" />
          <CalculatorButton title="Calculadora de Inversión" />
          <CalculatorButton title="Calculadora de Ahorro" />
          <CalculatorButton title="Calculadora de Crédito" />
        </div>

        <a href="https://forms.gle/EgKpWndNvsTHyLFp7">
          <div className="bg-[#ffe657] px-8 py-4 mb-12 mx-auto max-w-2xl text-center shake-animation">
            <h3 className="text-3xl font-bold">¡Recuerda! Sólo Hay 10 Cupos</h3>
          </div>
        </a>
        <div className="text-center text-[#25282b] mb-12 space-y-2">
          <p className="text-2xl">¡Haz clic en el enlace, asegura tu lugar y comienza</p>
          <p className="text-2xl">este camino hacia la libertad financiera.</p>
          <p className="text-2xl">¡Te espero en la colmena!</p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <CountdownTimer targetDate={new Date("2025-01-31T20:00:00Z")} />
        </div>
        <a href="https://forms.gle/EgKpWndNvsTHyLFp7">
          <div className="bg-[#ffb20f] px-8 py-4 text-center text-2xl font-bold max-w-md mx-auto">¡QUEDAN 2 CUPOS!</div>
        </a>
      </div>
    </section>
  )
}

