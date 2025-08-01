import React from 'react'
import { motion } from 'framer-motion'
import { Code, Timer, CheckCircle, EyeOff, BarChart2, Flame } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Daily Coding Tracker",
      description: "Track your daily coding time with GitHub or timer.",
      color: "from-indigo-600 to-blue-600"
    },
    {
      icon: <Timer className="w-6 h-6" />,
      title: "Focus Timer",
      description: "Use Pomodoro to stay focused and avoid burnout.",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Habit Tracker",
      description: "Set and follow coding habits for consistency.",
      color: "from-indigo-600 to-blue-600"
    },
    {
      icon: <EyeOff className="w-6 h-6" />,
      title: "Distraction Logger",
      description: "Track distractions when leaving coding windows.",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Weekly Reports",
      description: "View weekly graphs of productivity and goals.",
      color: "from-indigo-600 to-blue-600"
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Gamification & Streaks",
      description: "Earn badges and maintain streaks to stay motivated.",
      color: "from-blue-600 to-indigo-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                   bg-gradient-to-r from-indigo-600 to-blue-600 mb-4"
        >
          Boost Your Productivity
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          Powerful features to help you stay focused and achieve more
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 
                     border border-white/20 shadow-xl hover:shadow-2xl 
                     transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} 
                          flex items-center justify-center text-white mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
            <button className="mt-4 text-sm font-medium text-indigo-600 
                           hover:text-blue-600 transition-colors flex items-center gap-1">
              Learn more
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" 
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Features