import { useState } from 'react'
import './App.css'
import List from './components/List'
import Contact from './components/Contact'
import RandomNumbers from './components/RandomNumbers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <List />
      <Contact />
      <RandomNumbers />
    </>
  )
}

export default App
