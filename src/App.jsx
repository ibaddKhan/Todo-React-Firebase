import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Routers from '../src/config/router.jsx'
import './App.css'
import UserContextProvider  from './context/userContextProvider'



function App() {

  return (
    <>
    <Routers/>
    </>
  )
}

export default App
