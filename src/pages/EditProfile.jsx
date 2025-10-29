import Client from "../services/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const EditProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  let navigate = useNavigate()
  useEffect(() => {
    const getUser = async () => {
      const response = await Client.get(`/profile/${id}`)
      setUser(response.data)
      console.log(response.data)
    }
    getUser()
  }, [])

  const handleChange = (e) => {
    const { id, type, files, value } = e.target
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      [id]: type === "file" ? files[0] : value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("firstName", user.firstName)
    formData.append("lastName", user.lastName)
    formData.append("email", user.email)
    formData.append("password", user.password)
    formData.append("image", user.image)
    formData.append("bio", user.bio)
    formData.append("mobileNumber", user.mobileNumber)
    const response = await Client.put(`/profile/edit/${id}`, formData)
    setUser(response.data)
    console.log(user)
    navigate(`/profile/${id}`)
  }
  return user ? (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Upload Image:</label>
        <input type="file" id="image" accept="image" onChange={handleChange} />

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
