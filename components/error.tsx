'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const handleReset = () => {
    if (typeof reset === 'function') {
      reset()
    } else {
      console.error('Reset function is not available')
      // Fallback behavior if reset is not a function
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Algo salió mal</h2>
          <p className="mb-4">Lo sentimos, ha ocurrido un error inesperado.</p>
          <Button
            onClick={handleReset}
            className="bg-[#fe9800] hover:bg-yellow-600"
          >
            Intentar de nuevo
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

