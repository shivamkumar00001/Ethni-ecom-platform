import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cart from './components/Front-End-components/cart'
import DashBoard from './components/Front-End-components/dash-board'
import Likes from './components/Front-End-components/likes'
import LoginSignInPage from './components/Front-End-components/login-signIn-page'
import PaymentGateway from './components/Front-End-components/paymentGateway'
import ProductPage from './components/Front-End-components/product-page'

function App() {
 
  return (
    <>
     <Cart/>
     <DashBoard/>
     <Likes/>
     <LoginSignInPage/>
     <PaymentGateway/>
     <ProductPage/>
    </>
  )
}

export default App
