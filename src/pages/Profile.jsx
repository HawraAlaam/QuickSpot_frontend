const Profile = ({ user, setUser }) => {
  console.log(user)

  return user ? (
    <div>
      <h4>First Name: {user.firstName} </h4>
      <h4>Last Name: {user.lastName}</h4>
      <h4>Email: {user.email} </h4>
      <h4>Mobile: {user.mobileNumber} </h4>
      <h4>Bio: {user.bio} </h4>
      <button></button>
    </div>
  ) : (
    <h1>No User</h1>
  )
}

export default Profile
