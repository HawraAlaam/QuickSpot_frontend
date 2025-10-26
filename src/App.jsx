import Home from "./pages/Home"
import Register from "./components/pages/Register"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"
import { CheckSession } from "./services/Auth"

import Nav from "./components/Nav"
import Welcome from "./pages/Welcome"
import SignIn from "./pages/Signin"
import './App.css'


const App = () => {
    const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const checkToken = async () => {
      //If a token exists, sends token to localStorage to persist logged in user
      const userData = await CheckSession()
      setUser(userData)
    }
    const token = localStorage.getItem("token")
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])


  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const checkToken = async () => {
      //If a token exists, sends token to localStorage to persist logged in user
      const userData = await CheckSession()
      setUser(userData)
    }
    const token = localStorage.getItem("token")
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])
  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
             <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />

        </Routes>
      </main>
    </>
  )
}


export default App
