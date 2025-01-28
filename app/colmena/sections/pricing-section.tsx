import { PricingCard } from "../components/pricing-card"

export function PricingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#25282b] text-center mb-4">
          ¡Una oportunidad que no puedes dejar pasar!
        </h2>
        <p className="text-xl text-center text-[#6d717f] mb-12">¡17 horas que no te puedes perder!</p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <PricingCard module="Modulo 1 - Credito" hours={5} price="$750.000 COP" />
          <PricingCard module="Modulo 2 - Presupuesto" hours={4} price="$600.000 COP" variant="highlight" />
          <PricingCard module="Modulo 3 - Inversión" hours={7} price="$1´400.000 COP" variant="highlight" />
        </div>

        <div className="bg-[#ffb20f] rounded-xl p-6 max-w-2xl mx-auto text-center">
          <span className="text-2xl">⭐</span>
          <h3 className="text-2xl font-bold mb-2">PROMOCIÓN</h3>
          <p className="text-3xl font-bold">17 HORAS $1.150.000</p>
        </div>
      </div>
    </section>
  )
}

