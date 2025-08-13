'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { Calendar, Clock, MapPin, Heart, Send, Loader2 } from 'lucide-react'

const LOCATION_PREFERENCES = [
  'Near my home',
  'Near your home', 
  'City center',
  'Somewhere quiet',
  'Somewhere new',
  'Anywhere is fine'
]

const SPECIAL_REQUESTS = [
  'I prefer indoor places',
  'I love outdoor activities',
  'I want something romantic',
  'I prefer casual/friendly vibe',
  'I want to try something new'
]

export default function DateInvitationForm() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [timeRange, setTimeRange] = useState<{ start: number; end: number }>({ start: 12, end: 18 })
  const [locationPreference, setLocationPreference] = useState<string>('Anywhere is fine')
  const [specialRequests, setSpecialRequests] = useState<string[]>([])
  const [budgetPreference, setBudgetPreference] = useState<string>('Any budget is fine')
  const [specialMessage, setSpecialMessage] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  // Generate next 30 days for calendar
  const generateCalendarDays = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  const toggleDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    setSelectedDates(prev => {
      const exists = prev.some(d => d.toISOString().split('T')[0] === dateStr)
      if (exists) {
        return prev.filter(d => d.toISOString().split('T')[0] !== dateStr)
      } else {
        return [...prev, date]
      }
    })
  }

  const toggleSpecialRequest = (request: string) => {
    setSpecialRequests(prev => 
      prev.includes(request) 
        ? prev.filter(r => r !== request)
        : [...prev, request]
    )
  }

  const formatTime = (hour: number) => {
    if (hour === 0) return '12 AM'
    if (hour < 12) return `${hour} AM`
    if (hour === 12) return '12 PM'
    return `${hour - 12} PM`
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      console.log('Saving date preferences:', {
        selectedDates: selectedDates.map(d => d.toISOString().split('T')[0]),
        timeRange,
        locationPreference,
        specialRequests,
        budgetPreference,
        specialMessage
      })
      
      const { data, error } = await supabase
        .from('date_preferences')
        .insert({
          selected_dates: selectedDates.map(d => d.toISOString().split('T')[0]).join(', '),
          time_start: timeRange.start,
          time_end: timeRange.end,
          location_preference: locationPreference,
          special_requests: specialRequests.join(', '),
          budget_preference: budgetPreference,
          special_message: specialMessage.trim(),
        })
        .select()

      console.log('Supabase response:', { data, error })

      if (error) {
        console.error('Supabase error:', error)
        setMessage({ type: 'err', text: `Error: ${error.message}` })
      } else {
        console.log('Successfully saved date preferences:', data)
        setMessage({ type: 'ok', text: 'Perfect! I\'ll plan something special for you! 💕' })
        // Reset form
        setSelectedDates([])
        setTimeRange({ start: 12, end: 18 })
        setLocationPreference('Anywhere is fine')
        setSpecialRequests([])
        setBudgetPreference('Any budget is fine')
        setSpecialMessage('')
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setMessage({ type: 'err', text: 'Network error. Check console for details.' })
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-cute-yellow/30 rounded-xl p-6">
        <h4 className="text-xl font-happy text-cute-purple mb-4 flex items-center gap-2">
          <Calendar className="text-dachshund-gold" />
          Choose Your Available Dates
        </h4>
        
        <div className="mb-6">
          <p className="font-cute text-gray-700 mb-4">Select dates you're available (next 30 days):</p>
          <div className="grid grid-cols-7 gap-2 max-h-64 overflow-y-auto p-4 bg-white rounded-lg">
            {calendarDays.map((date, index) => {
              const dateStr = date.toISOString().split('T')[0]
              const isSelected = selectedDates.some(d => d.toISOString().split('T')[0] === dateStr)
              const isToday = index === 0
              
              return (
                <button
                  type="button"
                  key={dateStr}
                  onClick={() => toggleDate(date)}
                  className={`p-2 rounded-lg border-2 transition-all text-sm ${
                    isSelected
                      ? 'bg-cute-purple text-white border-white shadow'
                      : isToday
                      ? 'bg-cute-yellow text-gray-700 border-cute-yellow'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-cute-purple/60'
                  }`}
                >
                  <div className="text-xs text-gray-500">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="font-bold">
                    {date.getDate()}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="font-cute text-gray-700 mb-3">Preferred time range:</p>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatTime(timeRange.start)}</span>
              <span>{formatTime(timeRange.end)}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="23"
                value={timeRange.start}
                onChange={(e) => setTimeRange(prev => ({ ...prev, start: Number(e.target.value) }))}
                className="w-full accent-cute-purple"
              />
              <input
                type="range"
                min="0"
                max="23"
                value={timeRange.end}
                onChange={(e) => setTimeRange(prev => ({ ...prev, end: Number(e.target.value) }))}
                className="w-full accent-cute-yellow mt-2"
              />
            </div>
            <div className="text-center text-sm text-gray-600">
              {formatTime(timeRange.start)} - {formatTime(timeRange.end)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cute-green/30 rounded-xl p-6">
        <h4 className="text-xl font-happy text-cute-purple mb-4 flex items-center gap-2">
          <MapPin className="text-dachshund-gold" />
          Location & Preferences
        </h4>
        
        <div className="mb-4">
          <p className="font-cute text-gray-700 mb-3">Location preference:</p>
          <select
            value={locationPreference}
            onChange={(e) => setLocationPreference(e.target.value)}
            className="w-full rounded-lg border-2 border-cute-pink/40 p-3 outline-none focus:border-cute-purple/70"
          >
            {LOCATION_PREFERENCES.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <p className="font-cute text-gray-700 mb-3">Budget preference:</p>
          <select
            value={budgetPreference}
            onChange={(e) => setBudgetPreference(e.target.value)}
            className="w-full rounded-lg border-2 border-cute-pink/40 p-3 outline-none focus:border-cute-purple/70"
          >
            <option>Any budget is fine</option>
            <option>Budget-friendly (under $30)</option>
            <option>Moderate ($30-$80)</option>
            <option>Special occasion (over $80)</option>
          </select>
        </div>
      </div>

      <div className="bg-cute-pink/30 rounded-xl p-6">
        <h4 className="text-xl font-happy text-cute-purple mb-4 flex items-center gap-2">
          <Heart className="text-dachshund-gold" />
          Special Requests
        </h4>
        
        <div className="mb-4">
          <p className="font-cute text-gray-700 mb-3">Select any that apply:</p>
          <div className="grid md:grid-cols-2 gap-2">
            {SPECIAL_REQUESTS.map((request) => (
              <button
                type="button"
                key={request}
                onClick={() => toggleSpecialRequest(request)}
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm text-left ${
                  specialRequests.includes(request)
                    ? 'bg-cute-pink text-white border-white shadow'
                    : 'bg-white text-gray-700 border-cute-pink/40 hover:border-cute-pink/60'
                }`}
              >
                {request}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="font-cute text-gray-700 mb-3">Any special message for me? 💕</p>
        <textarea
          value={specialMessage}
          onChange={(e) => setSpecialMessage(e.target.value)}
          className="w-full rounded-lg border-2 border-cute-pink/40 p-3 outline-none focus:border-cute-purple/70 min-h-[100px]"
          placeholder="Tell me anything special or just say hi! I'll plan something amazing for you! 🐕"
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
        <button type="submit" className="happy-button flex items-center gap-2 text-lg px-8 py-4" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          Send My Preferences 💌
        </button>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <div className="text-2xl animate-bounce-gentle">☕</div>
        <div className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>💕</div>
        <div className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>🐕</div>
      </div>
    </form>
  )
} 