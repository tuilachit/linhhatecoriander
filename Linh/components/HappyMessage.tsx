'use client'

import { motion } from 'framer-motion'

interface HappyMessageProps {
  title: string
  message: string
  date?: string
  isSpecial?: boolean
}

export default function HappyMessage({ title, message, date, isSpecial = false }: HappyMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`cute-card p-8 max-w-2xl mx-auto ${isSpecial ? 'ring-4 ring-cute-yellow' : ''}`}
    >
      {isSpecial && (
        <div className="flex justify-center mb-4">
          <div className="text-4xl animate-bounce-gentle">🌟</div>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-3xl font-happy font-bold text-cute-purple mb-4">
          {title}
        </h3>
        
        {date && (
          <p className="text-cute-blue font-playful text-lg mb-4">
            {date}
          </p>
        )}
        
        <div className="relative">
          <div className="absolute -left-8 top-2 text-2xl animate-wiggle">
            🐕
          </div>
          <p className="text-gray-700 font-cute text-xl leading-relaxed text-left pl-8">
            {message}
          </p>
          <div className="absolute -right-8 top-2 text-2xl animate-wiggle" style={{ animationDelay: '0.5s' }}>
            🐾
          </div>
        </div>
        
        <div className="mt-6 flex justify-center space-x-4">
          <div className="text-2xl animate-bounce-gentle">😊</div>
          <div className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>💕</div>
          <div className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>🎉</div>
        </div>
      </div>
    </motion.div>
  )
} 