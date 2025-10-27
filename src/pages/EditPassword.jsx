import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Client from "../services/api"

const EditPassword = () => {
  const { id } = useParams()
  const [user, setUser] = useState([])
  const initialState = {
    oldPassword: "",
    newPassword: "",
  }

  const [formValues, setFormValues] = useState(initialState)

  useEffect(() => {
    const getUser = async () => {
      const response = await Client.get(`/profile/${id}`)
      setUser(response.data)
      console.log(response.data)
    }
    getUser()
  }, [id])

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await Client.put(`auth/update/${id}`, {
      newPassword: formValues.newPassword,
      oldPassword: formValues.oldPassword,
    })
    setUser(response.data)
    setFormValues(initialState)
  }

  return (
    <div className="password-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldPassword">Old Password:</label>
        <input
          type="password"
          name="oldPassword"
          onChange={handleChange}
          value={formValues.oldPassword}
        />

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          name="newPassword"
          onChange={handleChange}
          value={formValues.newPassword}
        />

        <button>Change</button>
      </form>
    </div>
  )
}
export default EditPassword
