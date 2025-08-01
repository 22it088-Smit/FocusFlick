import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import AuthLayout from '../components/AuthLayout'
import { motion } from 'framer-motion'

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const Login = () => {
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext)

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmitHandler = async (e) => {
    try{
        e.preventDefault();

        axios.defaults.withCredentials = true;

        if(state === 'Sign Up'){
            const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password});
            if(data.sucess){
                setIsLoggedin(true)
                getUserData();
                navigate('/');
            }else{
                toast.error(data.message);
            }
        }else{
            const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password});
            if(data.sucess){
                setIsLoggedin(true)
                getUserData();
                navigate('/');
            }else{
                toast.error(data.message);
            }
        }
    }catch(error){
        toast.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <AuthLayout
      title={state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
      subtitle={
        state === 'Sign Up'
          ? 'Join us to boost your productivity'
          : 'Continue your productivity journey'
      }
    >
      <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible" 
        onSubmit={onSubmitHandler}
        className="space-y-6"
      >
        {state === 'Sign Up' && (
          <motion.div variants={inputVariants} className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 
                       rounded-xl focus:ring-2 focus:ring-indigo-500 
                       focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>
        )}

        <motion.div variants={inputVariants} className="relative">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 
                     rounded-xl focus:ring-2 focus:ring-indigo-500 
                     focus:border-transparent transition-all duration-300"
            required
          />
        </motion.div>

        <motion.div variants={inputVariants} className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 
                     rounded-xl focus:ring-2 focus:ring-indigo-500 
                     focus:border-transparent transition-all duration-300 
                     pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 
                     text-gray-500 hover:text-indigo-600 transition-colors"
          >
            {showPassword ? (
              <HiEyeOff className="w-5 h-5" />
            ) : (
              <HiEye className="w-5 h-5" />
            )}
          </button>
        </motion.div>

        {state === 'Login' && (
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate('/reset-password')}
              className="text-sm text-indigo-600 hover:text-indigo-800 
                       transition-colors"
            >
              Forgot password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-600 
                   to-blue-600 text-white rounded-xl hover:shadow-lg 
                   transform hover:scale-[1.01] transition-all duration-300"
        >
          {state}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
              className="ml-1 text-indigo-600 hover:text-indigo-800 
                       transition-colors font-medium"
            >
              {state === 'Sign Up' ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </motion.form>
    </AuthLayout>
  )
}

export default Login