'use client'

import { useEffect, useState } from 'react'

interface Dachshund {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  delay: number
}

const moodEmoji = () => '🐕'

export default function FloatingDachshunds() {
  const [dachshunds, setDachshunds] = useState<Dachshund[]>([])

  useEffect(() => {
    // Reduced number of dachshunds from 8 to 4
    const newDachshunds = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 15,
      rotation: Math.random() * 360,
      delay: Math.random() * 2,
    }))
    setDachshunds(newDachshunds)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {dachshunds.map((dog) => (
        <div
          key={dog.id}
          className="absolute animate-float-cute"
          style={{
            left: `${dog.x}%`,
            top: `${dog.y}%`,
            animationDelay: `${dog.delay}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
            transform: `rotate(${dog.rotation}deg)`,
          }}
        >
          <div
            className="text-dachshund-brown"
            style={{ fontSize: `${dog.size}px` }}
          >
            {moodEmoji()}
          </div>
        </div>
      ))}
      
      {/* Reduced paw prints from 12 to 6 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`paw-${i}`}
          className="absolute animate-paw-print"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <div className="text-dachshund-gold text-2xl">
            🐾
          </div>
        </div>
      ))}
    </div>
  )
} 