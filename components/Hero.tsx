'use client'
import React, { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { LottieAnimation } from './LottieAnimation'

const HexagonGrid = () => {
  const [dimensions, setDimensions] = useState({
    columns: 0,
    rows: 0,
    hexSize: 50,
  })
  const gridRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [activeHexagons, setActiveHexagons] = useState<Set<string>>(new Set())
  const timelineRef = useRef<GSAPTimeline | null>(null)

  const calculateDimensions = () => {
    const baseHexSize = Math.max(window.innerWidth / 80, 50)
    const hexMargin = baseHexSize * 0.01
    const hexHeight = baseHexSize * Math.sqrt(2)

    const totalHexWidth = baseHexSize + hexMargin
    const totalHexHeight = hexHeight + hexMargin

    const columns = Math.ceil(window.innerWidth / (totalHexWidth * 0.8)) + 5
    const rows = Math.ceil(window.innerHeight / (totalHexHeight * 0.6)) + 8

    setDimensions({ columns, rows, hexSize: baseHexSize })
  }

  useEffect(() => {
    calculateDimensions()
    window.addEventListener("resize", calculateDimensions)
    return () => window.removeEventListener("resize", calculateDimensions)
  }, [])

  // Cursor movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calcular el índice de la fila y columna del hexágono
        const hexWidth = dimensions.hexSize;
        const hexHeight = Math.sqrt(1.5) * hexWidth; // Altura del hexágono
        const row = Math.floor(y / (hexHeight + hexWidth * 0.02)); // Ajustar el margen
        const col = Math.floor(x / (hexWidth + hexWidth * 0.02)); // Ajustar el margen

        // Verificar si el índice está dentro de los límites
        if (row >= 0 && row < dimensions.rows && col >= 0 && col < dimensions.columns) {
          const hexId = `${row}-${col}`;
          // Iluminar el hexágono correspondiente
          const element = document.querySelector(`[data-hex-id="${hexId}"]`);
          if (element) {
            gsap.to(element, {
              scale: 1.1,
              backgroundColor: 'rgba(255, 220, 150, 0.9)',
              borderColor: 'rgba(255, 220, 150, 0.6)',
              boxShadow: '0 0 20px rgba(255, 220, 150, 0.6)',
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            setActiveHexagons(prev => new Set(prev).add(hexId));
          }
        }
      }
    };

    const handleMouseLeave = () => {
      // Resetear la iluminación de los hexágonos
      activeHexagons.forEach(id => {
        const element = document.querySelector(`[data-hex-id="${id}"]`);
        if (element) {
          gsap.to(element, {
            scale: 1,
            backgroundColor: 'rgba(254, 144, 0, 0.8)',
            borderColor: 'rgba(254, 144, 0, 0.3)',
            boxShadow: 'none',
            opacity: 0.8,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
      setActiveHexagons(new Set());
    };

    const element = gridRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [dimensions, activeHexagons]);

  // Random hexagon animation
  useEffect(() => {
    const selectRandomHexagons = () => {
      const newGlowing = new Set<string>()
      const totalHexagons = dimensions.rows * dimensions.columns
      const numToGlow = Math.floor(totalHexagons * 0.01)
      
      for (let i = 0; i < numToGlow; i++) {
        const row = Math.floor(Math.random() * dimensions.rows)
        const col = Math.floor(Math.random() * dimensions.columns)
        newGlowing.add(`${row}-${col}`)
      }
      return newGlowing
    }

    const animateHexagons = () => {
      const newActive = selectRandomHexagons()
      
      if (timelineRef.current) {
        timelineRef.current.kill()
      }

      timelineRef.current = gsap.timeline()

      activeHexagons.forEach(id => {
        if (!newActive.has(id)) {
          const element = document.querySelector(`[data-hex-id="${id}"]`)
          if (element) {
            timelineRef.current?.to(element, {
              backgroundColor: 'rgba(254, 144, 0, 0.8)',
              borderColor: 'rgba(254, 144, 0, 0.3)',
              boxShadow: 'none',
              scale: 1,
              opacity: 0.8,
              duration: 1.5,
              ease: 'power2.inOut'
            }, 0)
          }
        }
      })

      newActive.forEach(id => {
        const element = document.querySelector(`[data-hex-id="${id}"]`)
        if (element) {
          timelineRef.current?.to(element, {
            backgroundColor: 'rgba(255, 200, 100, 0.9)',
            borderColor: 'rgba(255, 200, 100, 0.5)',
            boxShadow: '0 0 15px rgba(255, 200, 100, 0.5)',
            scale: 1.05,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.inOut'
          }, 0)
        }
      })

      setActiveHexagons(newActive)
    }

    const interval = setInterval(animateHexagons, 2000)
    return () => clearInterval(interval)
  }, [dimensions, activeHexagons])

  // Hexagon hover effect handler
  const handleHexagonHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const hexagon = e.currentTarget
    gsap.to(hexagon, {
      scale: 1.1,
      backgroundColor: 'rgba(255, 220, 150, 0.9)',
      borderColor: 'rgba(255, 220, 150, 0.6)',
      boxShadow: '0 0 20px rgba(255, 220, 150, 0.6)',
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleHexagonLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const hexagon = e.currentTarget
    gsap.to(hexagon, {
      scale: 1,
      backgroundColor: 'rgba(254, 144, 0, 0.8)',
      borderColor: 'rgba(254, 144, 0, 0.3)',
      boxShadow: 'none',
      opacity: 0.8,
      duration: 0.5,
      ease: "power2.out"
    })
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={cursorRef}
        className="cursor absolute pointer-events-none"
        style={{
          width: '350px',
          height: '350px',
          transform: 'translate(0, 0)',
          opacity: 0,
        }}
      />
      <div className="hex-grid">
        {Array.from({ length: dimensions.rows }).map((_, i) => (
          <div
            key={i}
            className={`row ${i % 2 === 1 ? "offset-row" : ""}`}
            style={{
              marginBottom: `${dimensions.hexSize * 0.002}px`,
              marginTop: `-${dimensions.hexSize * 0.3}px`,
            }}
          >
            {Array.from({ length: dimensions.columns }).map((_, j) => (
              <div
                key={j}
                data-hex-id={`${i}-${j}`}
                className="hexagon"
                onMouseEnter={handleHexagonHover}
                onMouseLeave={handleHexagonLeave}
                style={{
                  width: `${dimensions.hexSize}px`,
                  height: `${Math.sqrt(1.5) * dimensions.hexSize}px`,
                  margin: `${dimensions.hexSize * 0.02}px`,
                }}
              />
            ))}
          </div>  
        ))}
      </div>

      <style jsx>{`
        .hex-grid {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .row {
          display: flex;
          justify-content: center;
        }

        .offset-row {
          margin-left: calc(${dimensions.hexSize}px);
        }

        .hexagon {
          position: relative;
          background-color: rgba(254, 144, 0, 0.8);
          border: 2px solid rgba(254, 144, 0, 0.3);
          display: inline-block;
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
          opacity: 0.8;
          transform: scale(1);
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export function Hero() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, opacity: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - 175
        const y = e.clientY - rect.top - 175

        const boundedX = Math.max(0, Math.min(x, rect.width - 350))
        const boundedY = Math.max(0, Math.min(y, rect.height - 350))

        setCursorPos({
          x: boundedX,
          y: boundedY,
          opacity: 1,
        })
      }
    }

    const handleMouseLeave = () => {
      setCursorPos(prev => ({ ...prev, opacity: 0 }))
    }

    const element = sectionRef.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
      element.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove)
        element.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-gradient-to-r from-[#fe9800] to-yellow-500 text-white py-20 overflow-hidden"
    >
      <div
        className="cursor"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorPos.opacity,
          position: 'absolute',
        }}
      />
      <HexagonGrid />
      <div className="container mx-auto text-center relative z-10" style={{ pointerEvents: 'none' }}>
        <h1 className="text-4xl font-bold mb-4">Bienvenido a ColMaya</h1>
        <div className="w-64 h-64 mx-auto mb-8">
          <LottieAnimation src="/animations/Animation_Hero.json" />
        </div>
        <p className="text-xl mb-8">Tu aliado en el mundo financiero</p>
        <h2 className="text-3xl font-semibold mb-4">SABER ES PARA TODOS</h2>
        <p className="max-w-2xl mx-auto">
          ColMaya aspira a convertirse en la aplicación esencial para cada colombiano, 
          acompañándolos en cada paso de su vida financiera. Como una plataforma 
          accesible y fácil de usar, buscamos empoderar a las personas para que 
          enfrenten sus desafíos económicos diarios.
        </p>
      </div>

      <style jsx>{`
        .cursor {
          width: 350px;
          height: 350px;
          border-radius: 100%;
          box-shadow: 2px -3px 41px -1px rgba(241, 196, 15, 0.64);
          z-index: 0;
          background: linear-gradient(
            45deg,
            #ffb347,
            #fe9800,
            #ffaf42,
            #ffd280,
            #ffba66,
            #ff8c1a,
            #ffe0b3,
            #ffc34d,
            #ffd699
          );
          background-size: 200%;
          animation: glower 20s linear infinite;
          filter: blur(80px);
          pointer-events: none;
        }

        @keyframes glower {
          0% { background-position: 0 0; }
          50% { background-position: 400% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </section>
  )
}

export default Hero

