interface ModuleCardProps {
  number: number
  title: string
  duration: string
  bulletPoints: string[]
  variant?: "yellow" | "orange" | "new-orange"
}

export function ModuleCard({ number, title, duration, bulletPoints, variant = "yellow" }: ModuleCardProps) {
  return (
    <div className={`rounded-3xl p-4 sm:p-6 ${variant === "yellow" ? "bg-[#ffe657]" : variant === "orange" ? "bg-[#ffb20f]" : "bg-[#ff9500]"}`}>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="text-xl sm:text-2xl">🐝</span>
        <h3 className="text-lg sm:text-xl font-bold">Módulo {number}:</h3>
      </div>
      <h4 className="text-lg sm:text-xl font-bold mb-2">{title}</h4>
      <p className="mb-3 sm:mb-4 text-sm sm:text-base font-medium">{duration}</p>
      <ul className="space-y-3 sm:space-y-4">
        {bulletPoints.map((point, index) => (
          <li key={index} className="text-xs sm:text-sm">
            • {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

