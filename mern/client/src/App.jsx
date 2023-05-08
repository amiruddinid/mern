import { useState } from 'react'
import './App.css'
import AddPost from './components/AddPosts'
import Search from './components/Search'

function App() {
  return (
    <>
      <Search />
      <AddPost />
    </>
  )
}

export default App
