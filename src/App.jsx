import Navbar from './components/Navbar'
import Hi from './components/Hi'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hi />
        <About />
        <Experience />
        <Projects />
      </main>
    </>
  )
}

export default App
