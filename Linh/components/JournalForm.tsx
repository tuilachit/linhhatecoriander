'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { PawPrint, Send, Loader2, Heart, Coffee, BookOpen, Music, Utensils } from 'lucide-react'

const MOODS = [
  { key: 'happy', label: 'Happy', emoji: '😊' },
  { key: 'okay', label: 'Okay', emoji: '🙂' },
  { key: 'stressed', label: 'Stressed', emoji: '😵' },
  { key: 'excited', label: 'Excited', emoji: '🤩' },
  { key: 'tired', label: 'Tired', emoji: '🥱' },
  { key: 'dog-mode', label: 'Dog Mode', emoji: '🐕' },
  { key: 'cozy', label: 'Cozy', emoji: '🧸' },
  { key: 'productive', label: 'Productive', emoji: '💪' },
]

const ACTIVITIES = [
  { key: 'work', label: 'Work', icon: '💼' },
  { key: 'study', label: 'Study', icon: '📚' },
  { key: 'exercise', label: 'Exercise', icon: '🏃‍♀️' },
  { key: 'cooking', label: 'Cooking', icon: '👩‍🍳' },
  { key: 'reading', label: 'Reading', icon: '📖' },
  { key: 'music', label: 'Music', icon: '🎵' },
  { key: 'netflix', label: 'Netflix', icon: '📺' },
  { key: 'shopping', label: 'Shopping', icon: '🛍️' },
  { key: 'cleaning', label: 'Cleaning', icon: '🧹' },
  { key: 'sleeping', label: 'Sleeping', icon: '😴' },
  { key: 'gaming', label: 'Gaming', icon: '🎮' },
  { key: 'other', label: 'Other', icon: '✨' },
]

export default function JournalForm({ onSaved }: { onSaved?: () => void }) {
  const [mood, setMood] = useState<string>('happy')
  const [stress, setStress] = useState<number>(3)
  const [energy, setEnergy] = useState<number>(5)
  const [activities, setActivities] = useState<string[]>([])
  const [gratitude, setGratitude] = useState<string>('')
  const [specialMessage, setSpecialMessage] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const toggleActivity = (activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      console.log('Attempting to save journal entry:', { 
        mood, stress, energy, activities, gratitude, specialMessage, notes 
      })
      
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          mood,
          stress,
          energy,
          activities: activities.join(', '),
          gratitude: gratitude.trim(),
          special_message: specialMessage.trim(),
          notes: notes.trim(),
        })
        .select()

      console.log('Supabase response:', { data, error })

      if (error) {
        console.error('Supabase error:', error)
        setMessage({ type: 'err', text: `Error: ${error.message}` })
      } else {
        console.log('Successfully saved:', data)
        setMessage({ type: 'ok', text: 'Saved! Sending you a paw-sitive vibe 🐾' })
        setNotes('')
        setStress(3)
        setEnergy(5)
        setMood('happy')
        setActivities([])
        setGratitude('')
        setSpecialMessage('')
        onSaved?.()
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setMessage({ type: 'err', text: 'Network error. Check console for details.' })
    }

    setLoading(false)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cute-card p-6 space-y-6"
    >
      <div className="flex items-center gap-2">
        <PawPrint className="text-dachshund-gold" />
        <h3 className="text-2xl font-happy text-cute-purple">Your Daily Paw-print</h3>
      </div>

      {/* Mood Selection */}
      <div>
        <p className="mb-2 font-playful text-cute-blue">How are you feeling today?</p>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              type="button"
              key={m.key}
              onClick={() => setMood(m.key)}
              className={`px-4 py-2 rounded-full border-2 transition-all ${
                mood === m.key
                  ? 'bg-cute-pink text-white border-white shadow'
                  : 'bg-white text-gray-700 border-cute-pink/40 hover:border-cute-purple/60'
              }`}
            >
              <span className="mr-2">{m.emoji}</span>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stress Level */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="font-playful text-cute-blue">Stress level</p>
          <span className="font-happy text-cute-purple">{stress}/10</span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          value={stress}
          onChange={(e) => setStress(Number(e.target.value))}
          className="w-full accent-cute-purple"
        />
      </div>

      {/* Energy Level */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="font-playful text-cute-blue">Energy level</p>
          <span className="font-happy text-cute-purple">{energy}/10</span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          className="w-full accent-cute-yellow"
        />
      </div>

      {/* Activities */}
      <div>
        <p className="mb-2 font-playful text-cute-blue">What did you do today?</p>
        <div className="flex flex-wrap gap-2">
          {ACTIVITIES.map((activity) => (
            <button
              type="button"
              key={activity.key}
              onClick={() => toggleActivity(activity.key)}
              className={`px-3 py-2 rounded-full border-2 transition-all text-sm ${
                activities.includes(activity.key)
                  ? 'bg-cute-green text-white border-white shadow'
                  : 'bg-white text-gray-700 border-cute-green/40 hover:border-cute-green/60'
              }`}
            >
              <span className="mr-1">{activity.icon}</span>
              {activity.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gratitude */}
      <div>
        <p className="mb-2 font-playful text-cute-blue">Something you're grateful for today 💝</p>
        <input
          type="text"
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          className="w-full rounded-xl border-2 border-cute-pink/40 p-3 outline-none focus:border-cute-purple/70"
          placeholder="e.g., my cozy blanket, a good coffee, your smile..."
        />
      </div>

      {/* Special Message */}
      <div>
        <p className="mb-2 font-playful text-cute-blue">A special message for me? 🐕</p>
        <textarea
          value={specialMessage}
          onChange={(e) => setSpecialMessage(e.target.value)}
          className="w-full rounded-xl border-2 border-cute-pink/40 p-3 outline-none focus:border-cute-purple/70 min-h-[80px]"
          placeholder="Write something special... or just say hi! 💕"
        />
      </div>

      {/* General Notes */}
      <div>
        <p className="mb-2 font-playful text-cute-blue">Anything else you want to share?</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-xl border-2 border-cute-pink/40 p-4 outline-none focus:border-cute-purple/70 min-h-[120px]"
          placeholder="Your thoughts, feelings, cute moments, or anything else... 🐾"
        />
      </div>

      {message && (
        <div
          className={`text-center rounded-xl py-2 ${
            message.type === 'ok' ? 'bg-cute-green/30 text-green-800' : 'bg-cute-pink/30 text-pink-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-center">
        <button type="submit" className="happy-button flex items-center gap-2" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          Save Entry
        </button>
      </div>
    </motion.form>
  )
} 