import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import { useParams } from "react-router-dom"

const Profile = ({}) => {
  const { id } = useParams()
  const [user, setUser] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const response = await Client.get(`/profile/${id}`)
      setUser(response.data)
      console.log(response.data)
    }
    getUser()
  }, [])

  return user ? (
    <div className="profile-container">
      <h4>First Name: {user.firstName} </h4>
      <h4>Last Name: {user.lastName}</h4>
      <h4>Email: {user.email} </h4>
      <h4>Mobile: {user.mobileNumber} </h4>
      <h4>Bio: {user.bio} </h4>
      <h4>images:</h4>
      <img src={`http://localhost:3000/${user.image}`} alt={user.firstName} />

      <br />
      <Link to={`/profile/edit/${id}`}>
        <button>Edit profile</button>
      </Link>
    </div>
  ) : null
}

export default Profile
