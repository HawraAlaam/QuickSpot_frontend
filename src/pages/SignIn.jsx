import { useState } from "react"
import { SignInUser } from "../services/Auth"
import { useNavigate, Link } from "react-router-dom"

const SignIn = ({ setUser }) => {
  const navigate = useNavigate()
  const initialState = { email: "", password: "" }
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = await SignInUser(formValues)
    setFormValues(initialState)
    setUser(userData)
    navigate("/home")
  }

  const isFormValid = formValues.email && formValues.password

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-xs bg-white p-4 rounded-2xl shadow-md border border-[#0c363c]">
        <img
          src="/src/images/Screenshot_2025-10-28_152639-removebg-preview (1).png"
          alt="Logo"
          className="mx-auto h-10 w-auto mb-3"
        />
        <h2 className="text-lg font-bold text-[#0c363c] text-center mb-3">
          Sign In
        </h2>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formValues.email}
            className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formValues.password}
            className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
            required
          />

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-1.5 rounded-lg text-sm font-semibold text-white ${
              isFormValid
                ? "bg-[#0c363c] hover:bg-[#09292d]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#0c363c] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
