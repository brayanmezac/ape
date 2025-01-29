interface CalculatorButtonProps {
  title: string
}

export function CalculatorButton({ title }: CalculatorButtonProps) {
  return (
    <button className="bg-[#ffe65777] rounded-full px-6 py-2 flex items-center gap-2 hover:bg-[#ffe657] transition-colors">
      <span className="text-lg">⭐</span>
      <span className="font-medium">{title}</span>
    </button>
  )
}

