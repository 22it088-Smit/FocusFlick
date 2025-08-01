import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import EmailVerify from './pages/EmailVerify';
import { ToastContainer, toast } from 'react-toastify';
import Features from './pages/Features'

function App() {
  return (
    <div >
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path="/features" element={<Features />} />
        
      </Routes>
    </div>
  )
}

export default App;
