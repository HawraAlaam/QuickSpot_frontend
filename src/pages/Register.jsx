import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { RegisterUser } from "../services/Auth.js"

const Register = () => {
  const navigate = useNavigate()

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    image: null,
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    const { id, type, files, value, name } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
      [id]: type === "file" ? files[0] : value,
    })
  }

  const isFormValid =
    formValues.firstName &&
    formValues.lastName &&
    formValues.email &&
    formValues.mobileNumber &&
    formValues.password &&
    formValues.password === formValues.confirmPassword &&
    formValues.password.length >= 8

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    const formData = new FormData()
    formData.append("firstName", formValues.firstName)
    formData.append("lastName", formValues.lastName)
    formData.append("email", formValues.email)
    formData.append("password", formValues.password)
    formData.append("mobileNumber", formValues.mobileNumber)
    if (formValues.image) formData.append("image", formValues.image)

    try {
      await RegisterUser(formData)
      setFormValues(initialState)
      navigate("/signin")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 px-4 pt-4 min-h-screen">
      <div className="w-full max-w-xs bg-white p-4 rounded-2xl shadow-md border border-[#0c363c]">
        <img
          src="/src/images/Screenshot_2025-10-28_152639-removebg-preview (1).png"
          alt="Logo"
          className="mx-auto h-10 w-auto mb-3"
        />
        <h2 className="text-lg font-bold text-[#0c363c] text-center mb-3">
          Sign Up
        </h2>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            value={formValues.firstName}
            className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            value={formValues.lastName}
            className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formValues.email}
            className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formValues.password}
            className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formValues.confirmPassword}
            className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
          />
          {formValues.password &&
            formValues.confirmPassword &&
            formValues.password !== formValues.confirmPassword && (
              <p className="text-red-500 text-xs">Passwords must match.</p>
            )}
          <input
            name="mobileNumber"
            type="tel"
            placeholder="Mobile Number"
            onChange={handleChange}
            value={formValues.mobileNumber}
            className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-xs text-gray-700"
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
            Confirm
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-2">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#0c363c] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
