import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"
import { CheckSession } from "./services/Auth"

import Nav from "./components/Nav"
import Welcome from "./pages/Welcome"
import SignIn from "./pages/Signin"
import Register from "./pages/Register"
import Profile from "./pages/Profile"

import "./App.css"
import EditProfile from "./pages/EditProfile"
import EditPassword from "./pages/EditPassword"

const App = () => {
  const [user, setUser] = useState(null)
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

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route
            path="/profile/:id"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route
            path="/profile/edit/:id"
            element={<EditProfile user={user} setUser={setUser} />}
          />
          <Route path="/auth/update/:id" element={<EditPassword />} />
        </Routes>
      </main>
    </>
  )
}

export default App
