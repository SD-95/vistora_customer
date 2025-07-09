import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import FloatingCoupon from './FloatingCoupon'

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
      <FloatingCoupon/>
    </React.Fragment>
  )
}

export default App