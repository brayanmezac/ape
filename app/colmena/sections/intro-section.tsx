import { FaYoutube, FaInstagram,  FaTiktok } from "react-icons/fa6";

//import MayaImage from '/maya.png'; // Asegúrate de ajustar la ruta
import Image from "next/image";
export function IntroSection() {
  return (
    <div className="">
      
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 bg-gradient-to-b from-white to-yellow-100 text-left ">
        {/* Imagen de Maya */}
        <div className="float-right -mt-12 md:-mt-20 -mr-4 ml-6 mb-6 w-[30%] min-w-[170px] max-w-[400px]">
          <Image 
            src="/maya.png" 
            alt="Maya" 
            width={500} 
            height={500}
            className="w-full h-auto"
          />
        </div>
        <div className="items-center justify-items-center">
          {/* Text Content */}
          <div className="space-y-6 px-4 max-w-full md:max-w-6xl md:px-0">
            <h1 className="text-[#25282b] text-4xl md:text-5xl font-serif leading-tight">
              ¡Hola, soy Maya de Finanzas con MP!
              <span className="inline-block ml-2">🐝</span>
            </h1>
            <p className="text-[#25282b] text-lg">
              Tengo 34 años y más de 14 años de experiencia en el mundo financiero. A lo largo de este camino, me he
              dado cuenta de algo que me mueve profundamente: muchas personas en Latinoamérica no tienen acceso a una
              buena educación financiera, <em>y eso impacta</em> directamente sus sueños <em>y su calidad de vida</em>.
            </p>

            <blockquote className="border-l-4 border-[#ff9500] pl-4 my-6 text-[#25282b]">
              Hace un tiempo, comenzamos a construir una comunidad, y lo que ha pasado desde entonces me llena de
              esperanza. Ha crecido a pasos agigantados, <em>y cada día veo más claro que la educación financiera</em>{" "}
              no solo <em>es necesaria, sino urgente</em>.
            </blockquote>

            <p className="text-[#25282b] text-lg">
              Mi sueño es convertirme en esa abeja que <em>zumba en tu oído</em>, recordándote cuáles decisiones
              financieras te acercan a tus metas y cuáles podrían alejarte de ellas. Cada día recibo mensajes y correos
              de personas que buscan asesoría, pero me he dado cuenta de algo hermoso:{" "}
              <em>en comunidad crecemos más</em>.
            </p>

            <p className="text-[#25282b] text-lg">
              Así como las abejas trabajan juntas en una colmena con un propósito claro,{" "}
              <span className="text-[#ff9500] font-semibold">
                quiero invitarte a formar parte de algo especial: pequeñas colmenas de 10 personas
              </span>
              . En estos grupos, con mi guía y el intercambio de ideas y conocimientos entre todos, podremos aprender de
              manera práctica sobre tips financieros, inversiones, créditos, presupuestos y mucho más.
            </p>

            <p className="text-[#25282b] text-lg">
            <span className="text-lg font-semibold text-[#ff9500]">
              Juntos no solo aprenderemos; aplicaremos lo que aprendemos. Tendrás acceso a información clave,
              resolveremos dudas y creceremos como equipo.
            </span>
              <em> Porque así como las abejas logran grandes cosas al trabajar juntas</em>, estoy segura de que tú y yo
              podemos transformar nuestras finanzas en algo más grande de lo que imaginamos.
            </p>

            {/* Social Media Links */}
            <div className="flex flex-col gap-4 pt-6 justify-center md:flex-row">
              <a
                href="https://www.youtube.com/@FinanzasconMP"
                className="group flex items-center gap-2 bg-[#fdc435] text-[#25282b] px-4 py-2 rounded-full hover:bg-[#ff9500] transition-colors text-center"
              >
                <div className="bg-white p-1.5 rounded-full">
                  <FaYoutube size={20} className="text-[#25282b]" />
                </div>
                <span className="font-medium">YouTube!</span>
              </a>
              <a
                href="https://www.instagram.com/finanzasconmp"
                className="group flex items-center gap-2 bg-[#fdc435] text-[#25282b] px-4 py-2 rounded-full hover:bg-[#ff9500] transition-colors text-center"
              >
                <div className="bg-white p-1.5 rounded-full">
                  <FaInstagram size={20} className="text-[#25282b]" />
                </div>
                <span className="font-medium">Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@finanzas.con.mp"
                className="group flex items-center gap-2 bg-[#fdc435] text-[#25282b] px-4 py-2 rounded-full hover:bg-[#ff9500] transition-colors text-center"
              >
                <div className="bg-white p-1.5 rounded-full">
                  <FaTiktok size={20} className="text-[#25282b]" />
                </div>
                <span className="font-medium">TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

