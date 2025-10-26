import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterUser } from "../services/Auth.js"

const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser(formValues)
    setFormValues(initialState)
    navigate("/signin")

    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
  }
  return (
    <div className="register-container">
      <h2>Sign-Up</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          type="text"
          placeholder="First name"
          onChange={handleChange}
          value={formValues.firstName}
          required
          autoComplete="first-name"
        />

        <input
          name="lastName"
          type="text"
          placeholder="Last name"
          onChange={handleChange}
          value={formValues.lastName}
          required
          autoComplete="family-name"
        />

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={formValues.email}
          required
          autoComplete="email"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formValues.password}
          required
          autoComplete="new-password"
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
          value={formValues.confirmPassword}
          required
          autoComplete="new-password"
        />

        <input
          name="mobileNumber"
          type="tel"
          placeholder="Mobile number"
          onChange={handleChange}
          value={formValues.mobileNumber}
          required
          autoComplete="tel"
        />

        <button
          disabled={
            !formValues.firstName ||
            !formValues.lastName ||
            !formValues.email ||
            !formValues.mobileNumber ||
            !formValues.password ||
            formValues.password !== formValues.confirmPassword ||
            formValues.password.length < 8
          }
        >
          Confirm
        </button>

        <p className="login-prompt">Already have an account? Log In</p>
      </form>
    </div>
  )
}

export default Register
