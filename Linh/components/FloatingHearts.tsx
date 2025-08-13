'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'

interface Heart {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: Heart[] = []
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          delay: Math.random() * 6,
        })
      }
      setHearts(newHearts)
    }

    generateHearts()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        >
          <Heart
            size={heart.size}
            className="text-love-pink/30 fill-love-pink/20"
          />
        </div>
      ))}
    </div>
  )
} 