import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Client from "../services/api"

const Profile = ({ user }) => {
  const { id } = useParams()
  const [profileUser, setProfileUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await Client.get(`/profile/${id}`)
        setProfileUser(response.data)
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }
    getUser()
  }, [id])

  if (!profileUser) return <p className="text-center py-10">Loading profile...</p>

  return user ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col sm:flex-row max-w-3xl w-full bg-white p-6 rounded-2xl shadow-md gap-6 border border-[#0c363c]">
        {/* Left: Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={`http://localhost:3000/${profileUser.image}`}
            alt={`${profileUser.firstName} ${profileUser.lastName}`}
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border border-gray-300"
          />
        </div>

        {/* Right: Info */}
        <div className="flex-1 flex flex-col justify-center space-y-2">
          <h2 className="text-2xl font-bold text-[#0c363c]">
            {profileUser.firstName} {profileUser.lastName}
          </h2>
          <p>
            <strong>Email:</strong> {profileUser.email}
          </p>
          <p>
            <strong>Mobile:</strong> {profileUser.mobileNumber}
          </p>
          <p>
            <strong>Bio:</strong> {profileUser.bio || "No bio available."}
          </p>

          {profileUser._id === user.id && (
            <Link to={`/profile/edit/${id}`}>
              <button className="mt-4 px-4 py-2 bg-[#0c363c] text-white rounded-lg hover:bg-[#09292d] transition-colors">
                Edit Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  ) : null
}

export default Profile
