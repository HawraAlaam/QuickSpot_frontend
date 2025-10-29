import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import { useParams } from "react-router-dom"

const Profile = ({ user }) => {
  const { id } = useParams()
  const [profileUser, setProfileUser] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const response = await Client.get(`/profile/${id}`)
      setProfileUser(response.data)
    }
    console.log(id)
    getUser()
  }, [id])

  return user ? (
    <div className="profile-container">
      <img src={`http://localhost:3000/${profileUser.image}`} alt="" />
      <h4> {profileUser.firstName} </h4>
      <h4>{profileUser.lastName}</h4>
      <h4>{profileUser.email} </h4>
      <h4>{profileUser.mobileNumber} </h4>
      <h4>{profileUser.bio} </h4>
      <h4></h4>

      <br />
      {profileUser._id === user.id ? (
        <Link to={`/profile/edit/${id}`}>
          <button>Edit profile</button>
        </Link>
      ) : null}
    </div>
  ) : null
}

export default Profile
