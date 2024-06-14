import React from 'react'
import Nav from './components/Nav/Nav'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import ChatPage from './pages/ChatPage'
import AboutPage from './pages/AboutPage'

const App = () => {
  return (
    <>
      <Nav/>

      <Routes>
        <Route path = '/' element = {<Main/>} />
        <Route path = '/chat' element = {<ChatPage/>} />
        <Route path = '/about' element = {<AboutPage/>} />
        <Route path = '*' element = {<Main/>} />
      </Routes>
    </>
  )
}

export default App
