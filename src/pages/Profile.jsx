import { useEffect } from "react"

const Profile = ({ user }) => {
  useEffect(() => {})

  return user ? (
    <div>
      <img src="" alt="" />
      <h4>First Name:</h4>
      <h4>Last Name:</h4>
      <h4>Email:</h4>
      <h4>Bio:</h4>{" "}
    </div>
  ) : (
    <h1>No User</h1>
  )
}

export default Profile
