import { useState } from "react"
import { Link } from "react-router-dom"
import { HiMenu, HiX } from "react-icons/hi"

const Nav = ({ user, handleLogOut }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const userLinks = (
    <>
      <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0c363c]">
        Home
      </Link>
      <Link to="/jobList" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0c363c]">
        Jobs
      </Link>
      <Link to="/placeList" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0c363c]">
        Places
      </Link>
      <Link to="/bookings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0c363c]">
        Bookings
      </Link>
      <Link to={`/profile/${user?.id}`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0c363c]">
        Profile
      </Link>
      <button
        onClick={handleLogOut}
        className="w-full text-white bg-[#0c363c] hover:bg-[#0b2d2f] px-3 py-2 rounded-md font-medium mt-2 transition-colors"
      >
        Sign Out
      </button>
    </>
  )

  const publicLinks = (
    <>
      <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0c363c]">
        Home
      </Link>
      <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0c363c]">
        Register
      </Link>
      <Link to="/signin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0c363c]">
        Sign In
      </Link>
    </>
  )

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

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {user ? userLinks : publicLinks}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#0c363c] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0c363c]"
            >
              {mobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">{user ? userLinks : publicLinks}</div>
        </div>
      )}
    </header>
  )
}

export default Nav
