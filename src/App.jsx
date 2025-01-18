import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Navigations from './components/Navigations'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'



function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
<Router>
<Navigations />
<Routes>
<Route path="/books" element={<Books />} />
<Route path="/books/:bookId" element={<SingleBook />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/account" element={<Account />} />
<Route path="/" element={<Books />} />
</Routes>
</Router>
      
    
    </>
  )
}

export default App
