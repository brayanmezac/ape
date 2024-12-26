'use client'
import { LottieAnimation } from './LottieAnimation'
import React, { useEffect, useState, useRef } from "react"

const HexagonGrid = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, opacity: 0 })
  const [dimensions, setDimensions] = useState({
    columns: 0,
    rows: 0,
    hexSize: 50,
  })
  const gridRef = useRef<HTMLDivElement>(null)
  const [glowingGroupA, setGlowingGroupA] = useState<Set<string>>(new Set())
  const [glowingGroupB, setGlowingGroupB] = useState<Set<string>>(new Set())
  const [isGroupA, setIsGroupA] = useState(true)

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

  useEffect(() => {
    const selectRandomHexagons = () => {
      const newGlowing = new Set<string>()
      const totalHexagons = dimensions.rows * dimensions.columns
      const numToGlow = Math.floor(totalHexagons * 0.015)

      for (let i = 0; i < numToGlow; i++) {
        const row = Math.floor(Math.random() * dimensions.rows)
        const col = Math.floor(Math.random() * dimensions.columns)
        newGlowing.add(`${row}-${col}`)
      }
      return newGlowing
    }

    const makeHexagonsGlow = () => {
      if (isGroupA) {
        setGlowingGroupB(selectRandomHexagons())
      } else {
        setGlowingGroupA(selectRandomHexagons())
      }
      setIsGroupA(!isGroupA)
    }

    const interval = setInterval(makeHexagonsGlow, 3000)
    return () => clearInterval(interval)
  }, [dimensions, isGroupA])

  return (
    <div ref={gridRef} className="absolute inset-0 overflow-hidden">
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
                className={`hexagon ${
                  glowingGroupA.has(`${i}-${j}`) ? 'glow-a' : 
                  glowingGroupB.has(`${i}-${j}`) ? 'glow-b' : ''
                }`}
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
        }

        @keyframes glowIn {
          0% {
            background-color: rgba(254, 144, 0, 0.8);
            border-color: rgba(254, 144, 0, 0.3);
            box-shadow: none;
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            background-color: rgba(255, 200, 100, 0.9);
            border-color: rgba(255, 200, 100, 0.5);
            box-shadow: 0 0 15px rgba(255, 200, 100, 0.5);
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes glowOut {
          0% {
            background-color: rgba(255, 200, 100, 0.9);
            border-color: rgba(255, 200, 100, 0.5);
            box-shadow: 0 0 15px rgba(255, 200, 100, 0.5);
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            background-color: rgba(254, 144, 0, 0.8);
            border-color: rgba(254, 144, 0, 0.3);
            box-shadow: none;
            transform: scale(1);
            opacity: 0.8;
          }
        }

        .hexagon.glow-a {
          animation: ${isGroupA ? 'glowIn' : 'glowOut'} 1.5s ease-in-out forwards;
        }

        .hexagon.glow-b {
          animation: ${!isGroupA ? 'glowIn' : 'glowOut'} 1.5s ease-in-out forwards;
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
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Ape</h1>
        <div className="w-64 h-64 mx-auto mb-8">
          <LottieAnimation src="/animations/Animation_Hero.json" />
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

