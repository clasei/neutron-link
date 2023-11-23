import { } from 'react'
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
      <Header />
      <Navbar />
      <LinkForm />
      <ShortenedLink />
      <Info />
      <Footer />
    </div>
    </>
  )
}

export default App
