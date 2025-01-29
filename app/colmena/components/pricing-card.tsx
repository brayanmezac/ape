import Image from "next/image"
import icon from "../img/image.png"
import { FaRegStar } from "react-icons/fa";


interface PricingCardProps {
  module: string
  hours: number
  price: string
  variant?: "default" | "highlight"
}

export function PricingCard({ module, hours, price, variant = "default" }: PricingCardProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-2 rounded-lg bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-lime-600 via-amber-600 to-red-600 opacity-50 blur-3xl"></div>
      <div className={`relative rounded-xl p-6 border border-[#FF9500] bg-gradient-to-r from-[#FF9500] via-[#ffcc00] to-[#FF9500] bg-[length:400%_400%] animate-[gradientMove_5s_infinite_alternate] text-white ${variant === "highlight" ? "bg-[#ffb20f]" : "bg-[#ffe657]"}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl text-[#FFF1BA]">
            <FaRegStar />
          </span>
          <h3 className="font-bold">{module}</h3>
        </div>
        
        <div className="text-center mt-4 -mb-5">
          <span className="text-xl font-bold text-center">{hours} Horas</span>
        </div>
        
        <div className="flex items-center gap-2 ">
          <Image src={icon} alt="Icono" className="w-14 h-14" />
          <div className="flex-1 h-2 rounded-md bg-[#FFF1BA]"></div>
        </div>
        
        <div className="text-center gap-2">
          <span className="text-2xl font-bold">{price}</span>
        </div>
      </div>
    </div>
  );
}


