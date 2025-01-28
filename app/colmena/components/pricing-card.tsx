interface PricingCardProps {
  module: string
  hours: number
  price: string
  variant?: "default" | "highlight"
}

export function PricingCard({ module, hours, price, variant = "default" }: PricingCardProps) {
  return (
    <div className={`rounded-xl p-6 ${variant === "highlight" ? "bg-[#ffb20f]" : "bg-[#ffe657]"}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">⭐</span>
        <h3 className="font-bold">{module}</h3>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-xl font-bold">{hours} Horas</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{price}</span>
      </div>
    </div>
  )
}

