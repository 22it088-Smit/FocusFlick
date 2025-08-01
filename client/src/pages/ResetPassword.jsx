import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import AuthLayout from '../components/AuthLayout'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { motion } from 'framer-motion';

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

const otpVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: i => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05
    }
  })
}

const ResetPassword = () => { 

  const {backendUrl} = useContext(AppContext)
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const inputRefs = React.useRef([]) 
  
  const handelInput = (e,index)=>{
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
    }
  }
  
  const handelKeyDown = (e, index)=>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus();
    }
  }
  
  const handelPaste = (e)=>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
      data.sucess ? toast.success(data.message) : toast.error(data.message)
      data.sucess && setIsEmailSent(true);

    }catch(error){
      toast.error(error.message)
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try{
      const otpArray = inputRefs.current.map(e => e.value)
      setOtp(otpArray.join(''))
      setIsOtpSubmitted(true);
    }catch(error){
      toast.error(error.message)
    }
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try{

      const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    }catch(error){
      toast.error(error.message)
    }
  }
  
  const renderEmailForm = () => (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={onSubmitEmail}
      className="space-y-6"
    >
      <motion.div variants={inputVariants} className="relative">
        <input 
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-white/50 border border-gray-200 
                   rounded-xl focus:ring-2 focus:ring-indigo-500 
                   focus:border-transparent transition-all duration-300"
          required
        />
      </motion.div>
      <motion.button variants={inputVariants}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 
                 text-white rounded-xl hover:shadow-lg transform 
                 hover:scale-[1.01] transition-all duration-300"
      >
        Send Reset Link
      </motion.button>
    </motion.form>
  )

  const renderOtpForm = () => (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={onSubmitOtp}
      className="space-y-6"
    >
      <div className="flex justify-between gap-2" onPaste={handelPaste}>
        {Array(6).fill(0).map((_, index) => (
          <motion.input
            custom={index}
            variants={otpVariants}
            key={index}
            type="text"
            maxLength="1"
            ref={e => inputRefs.current[index] = e}
            onInput={(e) => handelInput(e, index)}
            onKeyDown={(e) => handelKeyDown(e, index)}
            className="w-12 h-12 text-center text-xl font-semibold 
                     bg-white/50 border border-gray-200 rounded-lg 
                     focus:ring-2 focus:ring-indigo-500 
                     focus:border-transparent transition-all duration-300"
            required
          />
        ))}
      </div>
      <motion.button variants={inputVariants}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 
                 text-white rounded-xl hover:shadow-lg transform 
                 hover:scale-[1.01] transition-all duration-300"
      >
        Verify OTP
      </motion.button>
    </motion.form>
  )

  const renderNewPasswordForm = () => (
    <form onSubmit={onSubmitNewPassword} className="space-y-6">
      <div className="relative">
        <input 
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter new password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 bg-white/50 border border-gray-200 
                   rounded-xl focus:ring-2 focus:ring-indigo-500 
                   focus:border-transparent transition-all duration-300 pr-10"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
                   hover:text-indigo-600 transition-colors"
        >
          {showPassword ? (
            <HiEyeOff className="w-5 h-5" />
          ) : (
            <HiEye className="w-5 h-5" />
          )}
        </button>
      </div>
      <button 
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 
                 text-white rounded-xl hover:shadow-lg transform 
                 hover:scale-[1.01] transition-all duration-300"
      >
        Reset Password
      </button>
    </form>
  )

  return (
    <AuthLayout 
      title={!isEmailSent ? "Reset Password" : 
             !isOtpSubmitted ? "Enter OTP" : "New Password"}
      subtitle={!isEmailSent ? "Enter your email to reset password" :
                !isOtpSubmitted ? "Enter the code sent to your email" :
                "Create your new password"}
    >
      {!isEmailSent ? renderEmailForm() :
       !isOtpSubmitted ? renderOtpForm() :
       renderNewPasswordForm()}
    </AuthLayout>
  )
}

export default ResetPassword