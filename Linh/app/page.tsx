'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FloatingDachshunds from '../components/FloatingDachshunds'
import HappyMessage from '../components/HappyMessage'
import JournalForm from '../components/JournalForm'
import DateInvitationForm from '../components/DateInvitationForm' // Added
// import JournalList from '../components/JournalList' // Removed

export default function Home() {
  const [showDogs, setShowDogs] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setShowDogs(true)
  }, [])

  const scrollToSection = (sectionNumber: number) => {
    const element = document.getElementById(`section-${sectionNumber}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const happyMessages = [
    {
      title: "You're My Sunshine! ☀️",
      message: "Every morning I wake up thinking about your smile. You make my world so much brighter, just like these little dachshunds make everything cuter!",
      date: "Today's Thought"
    },
    {
      title: "Your Laugh is Everything! 😊",
      message: "Remember that time you laughed so hard you snorted? That's my favorite sound in the whole world. I hope you're laughing lots today!",
      date: "A Memory"
    },
    {
      title: "You're Amazing! 🌟",
      message: "Seriously, you're the most incredible person I know. Your kindness, your strength, your beautiful heart - everything about you is perfect.",
      date: "Just Because"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cute-pink via-cute-purple to-cute-blue">
      {showDogs && <FloatingDachshunds />}
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-happy font-bold text-cute-purple mb-6"
          >
            Chào cục acai! 🐕
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl font-cute text-gray-700 mb-8"
          >
            Welcome to your special place! 💕
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-x-4"
          >
            <button
              onClick={() => document.getElementById('journal')?.scrollIntoView({ behavior: 'smooth' })}
              className="happy-button text-lg px-8 py-4"
            >
              Share Your Day 📝
            </button>
          </motion.div>
        </div>
        <FloatingDachshunds />
      </section>

      {/* Journal Section */}
      <section id="journal" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-happy font-bold text-cute-purple mb-4">
              Your Daily Paw-print 🐾
            </h2>
            <p className="text-xl font-cute text-gray-700">
              Share your thoughts, feelings, and cute moments with me
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <JournalForm onSaved={() => setRefreshKey(prev => prev + 1)} />
          </div>
        </div>
      </section>

      {/* Date Invitation Section */}
      <section id="date-invitation" className="py-20 px-4 bg-gradient-to-br from-cute-pink/10 to-cute-purple/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-happy font-bold text-cute-purple mb-4">
              Coffee Date? ☕
            </h2>
            <p className="text-xl font-cute text-gray-700">
              Let's spend some time together
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="cute-card p-8 text-center max-w-3xl mx-auto"
          >
            <div className="text-6xl mb-6">💕</div>
            <h3 className="text-3xl font-happy font-bold text-cute-purple mb-6">
              A Sweet Invitation
            </h3>
            
            <div className="text-lg font-cute text-gray-700 leading-relaxed mb-8 space-y-4">
              <p>Oh, chắc dạo này em vui nhỉ. Nếu em muốn đi chơi thì nhấp vào cái này ạaa.</p>
              <p>Đi chơi bạn bè cũng được ạ. Just enjoy the moment together, no need to be stress, I don't want to force your feelings.</p>
              <p>Xin cô nương hãy điền vào thông tin dưới đây nếu cô nương muốn đi chơi, I will plan for cô nương =))</p>
            </div>

            <DateInvitationForm />
          </motion.div>
        </div>
      </section>

      {/* Personal Message */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="cute-card p-8 text-center"
          >
            <div className="text-4xl mb-4">💌</div>
            <h3 className="text-2xl font-happy font-bold text-cute-purple mb-4">
              A Little Note From Me
            </h3>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg font-cute text-gray-700 leading-relaxed mb-4">
                Hello, anh mua cho em 2 Cái này vì anh nghĩ em sẽ cần nó =))). Vô tri quá ak.
              </p>
              <p className="text-lg font-cute text-gray-700 leading-relaxed mb-4">
                Cái blanket anh mua để em có thể xài để lót ghế ngồi bớt lạnh để học bài, chứ anh ngồi thấy lạnh quá -_- lười học.
              </p>
              <p className="text-lg font-cute text-gray-700 leading-relaxed mb-4">
                Còn cái dép là để em bớt lạnh khi đi lại trong nhà, dép hiện tại của em ko có ấm nên em phải mang tất. Có cái dép kia sẽ tiện hơn ạk.
              </p>
              <p className="text-lg font-cute text-gray-700 leading-relaxed">
                Anh nhớ em lắm ạ. Mong em được ấm áp ạ
              </p>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <div className="text-3xl animate-bounce-gentle">🐕</div>
              <div className="text-3xl animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>💕</div>
              <div className="text-3xl animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>😊</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cute-purple text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-4">🐕💕</div>
          <p className="text-xl font-cute">
            Made with lots of love and dachshund energy! 🐾
          </p>
          <p className="text-lg font-playful mt-2">
            You're amazing, never forget that! ✨
          </p>
        </div>
      </footer>
    </div>
  )
} 