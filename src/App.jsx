import { useState } from 'react'
import Header from './components/Header.jsx'
import LinkForm from './components/LinkForm.jsx'
import ShortenedLink from './components/ShortenedLink.jsx'
import Info from './components/Info.jsx'
import CodeLink from './components/CodeLink.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [shortenedLink, setShortenedLink] = useState('')

  const handleShortenedLink = (newShortenedLink) => {
    setShortenedLink(newShortenedLink);
  };

  return (
    <>
      <div>
          <div className="content">
            <Header />
            <LinkForm onShorten={handleShortenedLink} />
            <ShortenedLink shortenedLink={shortenedLink} />
            <Info />
            <CodeLink />
            <Footer />
          </div>  
      </div>
    </>
  )
}

export default App
