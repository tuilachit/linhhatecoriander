'use client'

import { useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface VideoMessageProps {
  videoUrl: string
  title: string
  description: string
}

export default function VideoMessage({ videoUrl, title, description }: VideoMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="romantic-card p-6 max-w-2xl mx-auto">
      <div className="relative group">
        <video
          className="w-full rounded-lg shadow-lg"
          controls={false}
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Custom controls overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="bg-white/80 hover:bg-white text-love-red p-3 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
        
        {/* Mute button */}
        <button
          onClick={handleMuteToggle}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-romantic font-bold text-love-red mb-2">
          {title}
        </h3>
        <p className="text-gray-700 font-cursive text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
} 