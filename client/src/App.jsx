import React from 'react'
import {Routes,Route} from 'react-router-dom'
import ResetPassword from './Pages/ResetPassword'
import Home from './Pages/Home'
import LogIn from './Pages/LogIn'
import EmailVerify from './Pages/EmailVerify'
  import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    <div className=''>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/email-verify' element={<EmailVerify/>}></Route>
        <Route path='/reset-password' element={<ResetPassword/>}></Route>
      </Routes>
    </div>
  )
}

export default App
