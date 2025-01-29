import { ModuleCard } from "../components/module-card"

export function ProgramSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-yellow-100 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <a href="https://forms.gle/EgKpWndNvsTHyLFp7" className="bg-[#ffe657] px-6 sm:px-8 py-4 inline-block rounded-xl shadow-lg border border-orange-500 animate-[fadeIn_1s_ease-in-out]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#25282b]">
              ¿Quieres transformar tus finanzas?
            </h2>
          </a>
          <p className="text-[#25282b] mt-6 sm:mt-10 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Te invito a ser parte de nuestras <a href="https://forms.gle/EgKpWndNvsTHyLFp7" className="text-orange-600 font-semibold">colmenas</a>, un espacio diseñado para aprender juntos, 
            crecer en comunidad y tomar el control de tu futuro financiero. 
            <span className="text-green-600 font-semibold"> 17 horas únicas</span> de aprendizaje práctico que no te puedes perder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-10 mt-12">
  <ModuleCard
    number={1}
    title="Estructura y Manejo de Créditos"
    duration="(5 webinars de 1 hora cada uno)"
    bulletPoints={[
      "Análisis detallado de los diferentes tipos de créditos disponibles en el mercado y su aplicación estratégica.",
      "Métodos prácticos para optimizar tu score crediticio.",
      "Herramientas avanzadas para la gestión eficiente de deudas y estrategias de renegociación.",
    ]}
  />

  <ModuleCard
    number={2}
    title="Gestión y Proyección Presupuestal"
    duration="(4 webinars de 1 hora cada uno)"
    bulletPoints={[
      "Diseño e implementación de presupuestos efectivos.",
      "Uso de herramientas tecnológicas para control financiero.",
      "Principios de medición y control financiero.",
    ]}
    variant="new-orange"
  />

  {/* Módulo 3 ocupa el centro en la segunda fila */}
  <div className="md:col-span-2 xl:col-span-1 mx-auto">
    <ModuleCard
      number={3}
      title="Estrategias de Inversión y Creación de Patrimonio"
      duration="(7 webinars de 1 hora cada uno)"
      bulletPoints={[
        "Exploración avanzada del interés compuesto.",
        "Análisis de inversiones: bienes raíces, ETFs, criptomonedas y más.",
        "Actividades prácticas para eliminar el miedo a invertir.",
      ]}
      variant="orange"
    />
  </div>
</div>


        <p className="text-[#542802] text-center mt-10 sm:mt-14 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Este programa no solo te dará bases sólidas, sino también herramientas <span className="text-green-600 font-semibold">prácticas </span> 
          para aplicar de inmediato. <span className="text-red-600 font-bold">¡Es tu oportunidad para transformar tus finanzas!</span>
        </p>
        <div className="h-1 bg-[#FFC116] mx-auto my-6 rounded-md max-w-48 animate-[fadeIn_1s_ease-in-out]"></div>
      </div>
    </section>
  )
}
