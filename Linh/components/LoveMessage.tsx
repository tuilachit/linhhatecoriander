'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

interface LoveMessageProps {
  title: string
  message: string
  date?: string
  isSpecial?: boolean
}

export default function LoveMessage({ title, message, date, isSpecial = false }: LoveMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`romantic-card p-8 max-w-2xl mx-auto ${isSpecial ? 'ring-2 ring-love-gold' : ''}`}
    >
      {isSpecial && (
        <div className="flex justify-center mb-4">
          <Sparkles className="text-love-gold animate-pulse" size={24} />
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-3xl font-romantic font-bold text-love-red mb-4">
          {title}
        </h3>
        
        {date && (
          <p className="text-love-purple font-cursive text-lg mb-4">
            {date}
          </p>
        )}
        
        <div className="relative">
          <Heart 
            className="absolute -left-8 top-2 text-love-pink animate-heartbeat" 
            size={20} 
          />
          <p className="text-gray-700 font-cursive text-xl leading-relaxed text-left pl-8">
            {message}
          </p>
          <Heart 
            className="absolute -right-8 top-2 text-love-pink animate-heartbeat" 
            size={20} 
            style={{ animationDelay: '0.5s' }}
          />
        </div>
      </div>
    </motion.div>
  )
} 