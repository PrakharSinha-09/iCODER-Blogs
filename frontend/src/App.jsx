import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes >
          <Route exact path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App