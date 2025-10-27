import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"
import { CheckSession } from "./services/Auth"

import Nav from "./components/Nav"
import Welcome from "./pages/Welcome"
import SignIn from "./pages/Signin"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import JobDetails from "./pages/JobDeatails"
import JobList from "./pages/JobListings"
import JobForm from "./pages/JobForm"

import "./App.css"
import PlaceForm from "./pages/PlaceForm"

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
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/jobList" element={<JobList />} />
          <Route path="/jobForm" element={<JobForm user={user} />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/placeForm" element={<PlaceForm user={user} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
