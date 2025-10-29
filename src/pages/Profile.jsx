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
<img src={`http://localhost:3000/${user.image}`} alt={user.firstName} />
      <h4> {user.firstName} </h4>
      <h4>{user.lastName}</h4>
      <h4>{user.email} </h4>
      <h4>{user.mobileNumber} </h4>
      <h4>{user.bio} </h4>
      <h4></h4>


      <br />
      <Link to={`/profile/edit/${id}`}>
        <button>Edit profile</button>
      </Link>
    </div>
  ) : null
}

export default Profile
