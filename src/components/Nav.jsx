import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Nav = ({ user, handleLogOut }) => {
  const navigate = useNavigate()



  const onLogout = () => {
    handleLogOut()
    navigate("/")
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="/src/images/Screenshot_2025-10-28_152639-removebg-preview (1).png"
                alt="Company Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-4 items-center text-[#0c363c] font-medium">
            {user ? (
              <>
                <Link to="/home" className="hover:text-gray-700 transition-colors">Home</Link>
                <Link to="/jobList" className="hover:text-gray-700 transition-colors">Jobs</Link>
                <Link to="/placeList" className="hover:text-gray-700 transition-colors">Places</Link>
                <Link to="/bookings" className="hover:text-gray-700 transition-colors">Bookings</Link>
                <Link to={`/profile/${user.id}`} className="hover:text-gray-700 transition-colors">Profile</Link>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="ml-4 bg-[#0c363c] text-white px-3 py-1 rounded hover:bg-[#09292d] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
                <Link to="/register" className="hover:text-gray-700 transition-colors">Register</Link>
                <Link to="/signin" className="hover:text-gray-700 transition-colors">Sign In</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Nav
