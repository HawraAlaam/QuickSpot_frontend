import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"

const EditPassword = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const initialState = {
    oldPassword: "",
    newPassword: "",
  }

  const [formValues, setFormValues] = useState(initialState)

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
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await Client.put(`/auth/update/${id}`, {
        oldPassword: formValues.oldPassword,
        newPassword: formValues.newPassword,
      })
      setFormValues(initialState)
      navigate(`/profile/edit/${id}`)
    } catch (error) {
      console.error("Error updating password:", error)
    }
  }

  if (!user) return <p className="text-center py-10">Loading...</p>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-[#0c363c]">
        <h2 className="text-2xl font-semibold text-[#0c363c] mb-4 text-center">
          Change Password
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            Old Password:
            <input
              type="password"
              name="oldPassword"
              value={formValues.oldPassword}
              onChange={handleChange}
              className="border rounded px-3 py-2 mt-1"
              required
            />
          </label>

          <label className="flex flex-col">
            New Password:
            <input
              type="password"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleChange}
              className="border rounded px-3 py-2 mt-1"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-[#0c363c] text-white py-2 rounded-lg mt-2 hover:bg-[#09292d] transition-colors"
          >
            Change
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditPassword
