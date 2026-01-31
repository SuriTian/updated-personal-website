import { useState } from 'react'
import Navbar from './components/Navbar'
import Hi from './components/Hi'
import About from './components/About'
import Projects from './components/Projects'
import Fun from './components/Fun'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Hi />
      <About />
      <Projects />
      <Fun />
      <Footer />
    </>
  )
}

export default App
