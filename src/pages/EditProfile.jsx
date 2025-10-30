import Client from "../services/api"
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

const EditProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await Client.get(`/profile/${id}`)
        setUser(response.data)
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }
    getUser()
  }, [id])

  const handleChange = (e) => {
    const { id, type, files, value, name } = e.target
    setUser({
      ...user,
      [name]: type === "file" ? files[0] : value,
      [id]: type === "file" ? files[0] : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("firstName", user.firstName)
    formData.append("lastName", user.lastName)
    formData.append("email", user.email)
    formData.append("mobileNumber", user.mobileNumber)
    formData.append("bio", user.bio)
    if (user.password) formData.append("password", user.password)
    if (user.image) formData.append("image", user.image)

    try {
      const response = await Client.put(`/profile/edit/${id}`, formData)
      setUser(response.data)
      navigate(`/profile/${id}`)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  if (!user) return <p className="text-center py-10">Loading...</p>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col sm:flex-row max-w-3xl w-full bg-white p-6 rounded-2xl shadow-md gap-6 border border-[#0c363c]">
        {/* Left: Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={user.image ? `http://localhost:3000/${user.image}` : "/src/images/default-profile.png"}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border border-gray-300"
          />
        </div>

        {/* Right: Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-center gap-3"
        >
          <label>
            Upload Image:
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </label>

          <label>
            First Name:
            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
          </label>

          <label>
            Last Name:
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </label>

          <label>
            Phone:
            <input type="text" name="mobileNumber" value={user.mobileNumber} onChange={handleChange} />
          </label>

          <label>
            Bio:
            <textarea name="bio" value={user.bio} onChange={handleChange} />
          </label>

          <div className="flex gap-4 mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0c363c] text-white rounded-lg hover:bg-[#09292d] transition-colors"
            >
              Save Changes
            </button>

            <Link to={`/auth/update/${id}`}>
              <button className="px-4 py-2 border border-[#0c363c] rounded-lg hover:bg-[#0c363c] hover:text-white transition-colors">
                Change Password
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
