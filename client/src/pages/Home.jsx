import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'

const Home = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <Hero />
      <Features />
      <div className="bg-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex-1">
              <div className="text-4xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p>Create your account in seconds</p>
            </div>
            <div className="flex-1">
              <div className="text-4xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Track & Focus</h3>
              <p>Use our tools to stay productive</p>
            </div>
            <div className="flex-1">
              <div className="text-4xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Achieve Goals</h3>
              <p>Watch your progress grow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home