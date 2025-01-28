import { ModuleCard } from "../components/module-card"

export function ProgramSection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="bg-[#ffe657] px-4 sm:px-6 py-3 sm:py-4  inline-block rounded-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#25282b]">
              ¿Quieres transformar tus finanzas?
            </h2>
          </div>
          <p className="text-[#25282b] mb-8 text-center mt-8 sm:mt-12 text-base sm:text-lg max-w-3xl mx-auto">
            Te invito a ser parte de nuestras colmenas, un espacio diseñado para aprender juntos, crecer en comunidad y tomar el control de tu futuro financiero. Serán 17 horas únicas de aprendizaje práctico que no te puedes perder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          <div className="w-full">
            <ModuleCard
              number={1}
              title="Estructura y Manejo de Créditos"
              duration="(5 webinars de 1 hora cada uno)"
              bulletPoints={[
                "Análisis detallado de los diferentes tipos de créditos disponibles en el mercado y su aplicación estratégica según necesidades específicas.",
                "Métodos prácticos para optimizar tu score crediticio, entendiendo las variables que impactan en su cálculo.",
                "Herramientas avanzadas para la gestión eficiente de deudas y estrategias de renegociación.",
              ]}
            />
          </div>

          <div className="w-full">
            <ModuleCard
              number={2}
              title="Gestión y Proyección Presupuestal"
              duration="(4 webinars de 1 hora cada uno)"
              bulletPoints={[
                "Diseño e implementación de presupuestos efectivos, incorporando proyección financiera a corto, mediano y largo plazo.",
                "Uso de herramientas tecnológicas de control financiero personal, enfocadas en facilitar el control de tus gastos, ingresos, activos, pasivos, etc.",
                "Principios de medición y control financiero: porque lo que no se mide, no se controla.",
              ]}
              variant="new-orange"
            />
          </div>

          <div className="w-full md:col-span-2 xl:col-span-1">
            <ModuleCard
              number={3}
              title="Estrategias de Inversión y Creación de Patrimonio"
              duration="(7 webinars de 1 hora cada uno)"
              bulletPoints={[
                "Exploración avanzada del interés compuesto y su impacto en el crecimiento patrimonial, diferenciándolo del interés simple. Profundización en conceptos como tasas, valor futuro y temporalidades en los sistemas financieros.",
                "Identificación y análisis de instrumentos de inversión: desde inversiones tradicionales como bienes raíces, hasta opciones estructuradas como derivados, ETFs, criptomonedas, factoring y derechos fiduciarios.",
                "Actividades prácticas para eliminar el temor al tomar decisiones de inversión, fomentando la acción en equipo para crear confianza y seguridad.",
              ]}
              variant="orange"
            />
          </div>
        </div>

        <p className="text-[#542802] text-center mt-8 sm:mt-12 text-base sm:text-lg max-w-3xl mx-auto">
          Este programa no solo proporcionará unas bases sólidas, sino también herramientas prácticas que te permitirán
          implementar lo aprendido de manera inmediata. Es una experiencia transformadora diseñada para aquellos que
          buscan llevar sus finanzas al siguiente nivel.
        </p>
        <div className="h-1 bg-[#FFC116] mx-auto my-4 rounded-md max-w-48"></div>
      </div>
    </section>
  )
}

