import { PricingCard } from "../components/pricing-card"
import icon from "../img/image.png"
import { FaRegStar } from "react-icons/fa";
import Image from "next/image";

export function PricingSection() {
  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4 md:px-8 pb-6">
        <h2 className="text-4xl font-bold text-[#25282b] text-center mb-4">
          ¡Una oportunidad que no puedes dejar pasar!
        </h2>
        <div className="text-center mb-3">
          <p className="text-2xl text-gray-900">
            <strong className="underline decoration-[#FF9500] decoration-wavy">¡17 horas que no te puedes perder!</strong>
          </p>
          
        </div>
        <p className="text-xl text-center text-gray-800 mb-16">Usualmente, una asesoría con un experto financiero podría estar entre $300.000 y $450.000 pesos por hora. Y la verdad es que, si tomas cada módulo por separado, vas a quedarte con la información a medias. Por eso, estuvimos considerando estos costos por módulo </p>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <PricingCard module="Modulo 1 - Credito" hours={5} price="$750.000 COP" />
          <PricingCard module="Modulo 2 - Presupuesto" hours={4} price="$600.000 COP" variant="highlight" />
          <PricingCard module="Modulo 3 - Inversión" hours={7} price="$1´400.000 COP" variant="highlight" />
        </div>
        <a href="https://forms.gle/EgKpWndNvsTHyLFp7">
          <div className="bg-[#f7e38c] rounded-xl p-6 max-w-4xl mx-auto text-center shadow-lg">
            <p className="text-lg leading-relaxed text-gray-800">
              Pero aún así <strong className="text-orange-600">NO QUEDAMOS</strong> satisfechos con este costo porque queremos que todos puedan unirse. 
              Según lo que calculamos, cada hora quedaría entre <span className="text-red-600">$150.000 y $200.000</span>. 
              Lo pensamos más a fondo y decidimos que cada hora cueste menos de <strong className="text-green-600">$70.000</strong>.
            </p>
            
            <div className="relative bg-gradient-to-r from-[#FF9500] via-[#ffcc00] to-[#FF9500] bg-[length:400%_400%] animate-[gradientMove_5s_infinite_alternate] rounded-xl p-6 max-w-2xl mx-auto text-center border border-[#FF9500] text-white mt-4">
              <FaRegStar className="text-3xl mb-2" />
              <h3 className="text-2xl md:text-4xl font-bold mb-2">🔥 PROMOCIÓN 🔥</h3>
              
              <div className="flex items-center gap-2 justify-center">
                <Image src={icon} alt="Icono" className="w-14 h-14" />
                <div className="flex-1 h-2 rounded-md bg-[#FFF1BA]"></div>
              </div>
              
              <p className="text-4xl font-bold text-red-500 animate-[flash_1.5s_infinite]">
                17 HORAS $1.150.000
              </p>
            </div>
        
          
            <p className="text-lg leading-relaxed text-gray-800 mt-4">
              ¡Por 17 horas! Divídelas y verás por ti mismo que el precio por cada hora es el más económico en el país, 
              <strong className="text-green-600"> PORQUE LAS FINANZAS SON PARA TODOS.</strong>
            </p>
          </div>
        </a>
      </div>
    </section>
  )
}

