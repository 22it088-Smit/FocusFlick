import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const AuthLayout = ({ children, title, subtitle }) => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-12">
      {/* Logo with fade in */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 
                 flex flex-col items-start cursor-pointer"
        onClick={() => navigate('/')}
      >
        <span className="text-2xl font-bold bg-clip-text text-transparent 
                      bg-gradient-to-r from-indigo-600 to-blue-600"
              style={{ fontFamily: 'Orbitron, sans-serif' }}>
          FocusFlick
        </span>
        <span className="text-sm text-gray-600">Code. Focus. Achieve.</span>
      </motion.div>

      {/* Main content with scale and fade */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl 
                   shadow-xl p-8 space-y-6 border border-white/20"
        >
          <div className="space-y-2">
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-3xl font-bold text-gray-900 
                      bg-clip-text text-transparent 
                      bg-gradient-to-r from-indigo-600 to-blue-600 
                      text-center"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-gray-600 text-center"
            >
              {subtitle}
            </motion.p>
          </div>
          {children}
        </motion.div>
      </motion.div>

      {/* Background blobs with continuous animation */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute -z-10 top-1/4 left-1/4 w-64 h-64 
                 bg-indigo-100 rounded-full mix-blend-multiply 
                 filter blur-3xl opacity-70"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute -z-10 bottom-1/4 right-1/4 w-64 h-64 
                 bg-blue-100 rounded-full mix-blend-multiply 
                 filter blur-3xl opacity-70"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute -z-10 bottom-1/3 left-1/3 w-64 h-64 
                 bg-purple-100 rounded-full mix-blend-multiply 
                 filter blur-3xl opacity-70"
      />
    </div>
  )
}

export default AuthLayout