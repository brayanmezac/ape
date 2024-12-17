'use client'

import { Player } from '@lottiefiles/react-lottie-player'

interface LottieAnimationProps {
  src: any
  className?: string
}

export function LottieAnimation({ src, className }: LottieAnimationProps) {
  return (
    <Player
      autoplay
      loop
      src={src}
      style={{ width: '100%', height: '100%' }}
      className={className}
    />
  )
}

