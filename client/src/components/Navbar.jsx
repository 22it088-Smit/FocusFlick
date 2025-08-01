import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom' // Import Link from React Router
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')

      if (data.sucess) {
        navigate('/email-verify')
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      if (data.sucess) {
        setIsLoggedin(false)
        setUserData(false)
        navigate('/')
      } else {
        toast.error(data.message || 'Logout failed')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const menuItems = [
    { path: "/features", label: "Features" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/community", label: "Community" },
    { path: "/resources", label: "Resources" }
  ];

  return (
    <nav className='fixed w-full px-4 py-2 z-50'>
      <div className='max-w-7xl mx-auto backdrop-blur-md bg-white/30 rounded-full border border-white/20 shadow-lg'>
        <div className='flex justify-between items-center h-16 px-6'>
          {/* Logo & Brand */}
          <div className='flex flex-col items-start'>
            <span className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent'
              style={{ fontFamily: 'Orbitron, sans-serif' }}>
              FocusFlick
            </span>
            <span className='text-xs text-gray-600'>Code. Focus. Achieve.</span>
          </div>

          {/* Center Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className='text-gray-700 hover:text-indigo-600 transition-colors'
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side - User/Login */}
          <div className='flex items-center gap-4'>
            {userData ? (
              <div className='relative'>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className='flex items-center gap-3 px-4 py-2 rounded-full 
                           bg-gradient-to-r from-indigo-600 to-blue-600 
                           text-white hover:shadow-lg transform hover:scale-105 
                           transition-all duration-300'
                >
                  <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-full bg-white/20 
                   flex items-center justify-center 
                   border-2 border-white/40'>
                      <span className='text-white font-bold'>
                        {userData.name[0].toUpperCase()}
                      </span>
                    </div>
                    <span className='font-semibold'>{userData.name}</span>
                  </div>
                  <IoMdArrowDropdown className="w-5 h-5" />
                </button>

                {isOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md 
                                rounded-xl shadow-lg py-1 border border-white/20'>
                    {!userData.isAccountVerified && (
                      <button onClick={sendVerificationOtp}
                        className='block w-full text-left px-4 py-2 text-sm 
                                 text-gray-700 hover:bg-indigo-50 transition-colors'>
                        Verify Email
                      </button>
                    )}
                    <button
                      onClick={logout}
                      className='flex items-center gap-2 w-full px-4 py-2 text-sm 
                               text-red-600 hover:bg-red-50 transition-colors'
                    >
                      <IoLogOutOutline className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className='bg-gradient-to-r from-indigo-600 to-blue-600 text-white 
                         px-6 py-2 rounded-full hover:shadow-lg transform 
                         hover:scale-105 transition-all duration-300'
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className='md:hidden mt-2'>
          <div className='bg-white/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg mx-4'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              <Link to="/features" className='block px-3 py-2 text-gray-700 hover:text-indigo-600'>Features</Link>
              <Link to="/how-it-works" className='block px-3 py-2 text-gray-700 hover:text-indigo-600'>How it Works</Link>
              <Link to="/pricing" className='block px-3 py-2 text-gray-700 hover:text-indigo-600'>Pricing</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar