import { useState } from "react"
import { SignInUser } from "../services/Auth"
import { useNavigate, Link } from "react-router-dom"

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()
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

  return (
    <div className="col signin">
      <img src="/src/images/Screenshot_2025-10-28_152639-removebg-preview (1).png" alt="Sign In Title Image" />
      <form className="col" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="example@example.com"
            onChange={handleChange}
            value={formValues.email}
            required
            autoComplete="email"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
            value={formValues.password}
            required
            autoComplete="off"
          />
        </div>
        <button disabled={!formValues.email || !formValues.password}>
          Sign In
        </button>
      </form>
      <div>
        <h4>
          {" "}
          Don't have an account?
          <Link to={"/register"}>Sign Up </Link>
        </h4>
      </div>
    </div>
  )
}

export default SignIn
