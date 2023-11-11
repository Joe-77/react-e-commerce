import React from 'react'
import errorLogo from '../images/errorImg.webp'

const ErrorPage = () => {
  return (
    <div className='h-[100vh] flex items-center justify-center'>
      <img  src={errorLogo} alt="" />
    </div>
  )
}

export default ErrorPage