import Client from "../services/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const EditProfile = ({}) => {
  const { id } = useParams()
  const [user, setUser] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    const getUser = async () => {
      const response = await Client.get(`/profile/${id}`)
      setUser(response.data)
      console.log(response.data)
    }
    getUser()
  }, [])

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await Client.put(`/profile/edit/${id}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      bio: user.bio,
    })
    setUser(response.data)
    navigate(`/profile/${id}`)
  }
  return user ? (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <label htmlFor="mobileNumber">Phone:</label>
        <input
          type="text"
          name="mobileNumber"
          value={user.mobileNumber}
          onChange={handleChange}
        />

        <label htmlFor="bio">Bio:</label>
        <textarea
          name="bio"
          value={user.bio}
          onChange={handleChange}
        ></textarea>

        <button>Change</button>
      </form>
    </div>
  ) : null
}

export default EditProfile
