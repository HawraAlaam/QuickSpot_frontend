import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Register from "./components/pages/Register"

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
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile" element={<Profile user={user} />} /> */}
          {/* <Route path="/signin" element={<SignIn setUser={setUser} />} />

           */}
        </Routes>
      </main>
    </>
  )
}

export default App
