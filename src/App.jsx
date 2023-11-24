import { } from 'react'
import VantaBackground from './components/VantaBackground.jsx'
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import LinkForm from './components/LinkForm.jsx'
import ShortenedLink from './components/ShortenedLink.jsx'
import Info from './components/Info.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {

  return (
    <>
      <div>
        <VantaBackground />
          <div className="content">
            <Header />
            <Navbar />
            <LinkForm />
            <ShortenedLink />
            <Info />
            <Footer />
          </div>
      </div>
    </>
  )
}

export default App
