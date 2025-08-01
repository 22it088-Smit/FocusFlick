import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import AuthLayout from '../components/AuthLayout'
import {assets} from '../assets/assets'
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

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContext)
  const navigate = useNavigate();
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

  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('');

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})
      if(data.sucess){
        toast.success(data.message)
        getUserData();
        navigate('/');
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)

    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedin, userData])

  return (
    <AuthLayout
      title="Verify Email"
      subtitle="Enter the 6-digit code sent to your email"
    >
      <motion.img
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      />
      <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        onSubmit={onSubmitHandler}
        className="space-y-8"
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
        <motion.button
          variants={inputVariants}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 
                   text-white rounded-xl hover:shadow-lg transform 
                   hover:scale-[1.01] transition-all duration-300"
        >
          Verify Email
        </motion.button>
      </motion.form>
    </AuthLayout>
  )
}

export default EmailVerify