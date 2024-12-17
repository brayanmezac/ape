import { LottieAnimation } from './LottieAnimation'

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#fe9800] to-yellow-500 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Ape</h1>
        <div className="w-64 h-64 mx-auto mb-8">
          <LottieAnimation 
            src="https://lottie.host/ad5dc94e-2044-4ff9-81cb-310b16a0d9b6/RdCv384hct.json"
          />
        </div>
        <p className="text-xl mb-8">Tu aliado en el mundo financiero</p>
        <h2 className="text-3xl font-semibold mb-4">SABER ES PARA TODOS</h2>
        <p className="max-w-2xl mx-auto">
          Ape aspira a convertirse en la aplicación esencial para cada colombiano, 
          acompañándolos en cada paso de su vida financiera. Como una plataforma 
          accesible y fácil de usar, buscamos empoderar a las personas para que 
          enfrenten sus desafíos económicos diarios.
        </p>
      </div>
    </section>
  )
}

