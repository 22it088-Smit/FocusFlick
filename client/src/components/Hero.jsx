import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Code, Clock, Target, Brain, BarChart2, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero = () => {
  const navigate = useNavigate()

  const features = [
    { icon: <Code className="w-6 h-6" />, text: "Track Coding Time" },
    { icon: <Clock className="w-6 h-6" />, text: "Focus Timer" },
    { icon: <Target className="w-6 h-6" />, text: "Habit Builder" },
    { icon: <Brain className="w-6 h-6" />, text: "Distraction Control" },
    { icon: <BarChart2 className="w-6 h-6" />, text: "Progress Analytics" },
    { icon: <Award className="w-6 h-6" />, text: "Achievement System" }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center py-20">
        {/* Left Content with slide-in from left */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="space-y-8"> {/* Increased space-y from 6 to 8 */}
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              Code with
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                {' '}Purpose
              </span>
              <span className="block mt-4"> {/* Increased mt from 2 to 4 */}
                Track with
                <span className="text-indigo-600"> Precision</span>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform your coding journey with purpose-driven focus. Track your progress,
              build consistent habits, and achieve your development goals with precision
              and clarity.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {features.map((feature, index) => (
              <div key={index} 
                className="flex items-center gap-2 px-4 py-2 bg-white/50 
                         backdrop-blur-sm rounded-full border border-white/20 
                         shadow-sm text-gray-700">
                {feature.icon}
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white 
                       px-8 py-4 rounded-xl hover:shadow-xl transform 
                       hover:scale-105 transition-all duration-300 text-lg"
            >
              Start Your Journey
            </button>
            <button 
              onClick={() => navigate('/features')}
              className="border-2 border-gray-300 px-8 py-4 rounded-xl 
                       hover:border-indigo-600 hover:text-indigo-600 
                       transition-all duration-300 transform hover:scale-105 
                       text-lg flex items-center gap-2"
            >
              Explore Features
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Social Proof */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-center 
                          justify-center lg:justify-start text-gray-600">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full 
                                        bg-gradient-to-br from-indigo-${500 + i*100} 
                                        to-blue-${500 + i*100} border-2 border-white`} />
                ))}
              </div>
              <p className="text-sm">
                <span className="font-semibold">1000+ developers</span> already 
                tracking their progress
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Image with slide-in from right */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative lg:-right-12 mt-8 lg:mt-0"
        >
          <img 
            src={assets.header_img} 
            alt="Developer Focus" 
            className="w-full h-auto object-cover rounded-3xl shadow-2xl
                     transform hover:scale-105 transition-all duration-700"
          />
          
          {/* Decorative Elements */}
          <div className="absolute -z-10 top-1/4 -right-12 w-96 h-96 
                         bg-indigo-100 rounded-full mix-blend-multiply 
                         filter blur-3xl opacity-70"></div>
          <div className="absolute -z-10 top-1/3 -right-12 w-96 h-96 
                         bg-purple-100 rounded-full mix-blend-multiply 
                         filter blur-3xl opacity-70"></div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero