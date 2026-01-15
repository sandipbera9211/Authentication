import React, { useState, useRef, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailsent, setIsEmailsent] = useState(false)
  const inputRefs = useRef([])

  // Handle OTP input
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    paste.split('').slice(0, 6).forEach((char, index) => {
      if (inputRefs.current[index]) inputRefs.current[index].value = char
    })
  }

  // Step 1: Submit email to get OTP
  const onsubmitEmail = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email })
      if (data.success) {
        toast.success(data.message || 'OTP sent successfully')
        setIsEmailsent(true)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Step 2: Submit OTP + New Password
  const onsubmitReset = async (e) => {
    e.preventDefault()
    const otpValue = inputRefs.current.map(input => input.value).join('') // combine OTP inputs
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset`, {
        email,
        otp: otpValue,       // include OTP
        newPassword          // include new password
      })
      if (data.success) {
        toast.success(data.message || 'Password reset successfully!')
        navigate('/login')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      />

      {/* Email form */}
      {!isEmailsent && (
        <form onSubmit={onsubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
          <p className='text-center mb-6 text-indigo-800'>
            Enter Your Registered Email Address
          </p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder='Email id'
              className='bg-transparent outline-none text-white w-full'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
            Submit
          </button>
        </form>
      )}

      {/* OTP + New Password form */}
      {isEmailsent && (
        <form onSubmit={onsubmitReset} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
          <p className='text-center mb-6 text-indigo-800'>
            Enter the 6-digit OTP sent to your email and your new password
          </p>

          {/* OTP Inputs */}
          <div className='flex justify-between mb-4' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                type="text"
                maxLength={1}
                key={index}
                required
                className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                ref={e => inputRefs.current[index] = e}
                onInput={e => handleInput(e, index)}
                onKeyDown={e => handleKeyDown(e, index)}
              />
            ))}
          </div>

          {/* New Password Input */}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input
              type="password"
              placeholder='New Password'
              className='bg-transparent outline-none text-white w-full'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
            Reset Password
          </button>
        </form>
      )}
    </div>
  )
}

export default ResetPassword
 