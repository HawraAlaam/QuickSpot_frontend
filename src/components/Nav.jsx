import { Link } from "react-router-dom"
const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <>
        <h3>Welcome {user.name}!</h3>

        <Link to={"/home"}> Home </Link>
        <Link to={"/jobList"}> Jobs </Link>

        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </>
    )
  }
  const publicOptions = (
    <>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </>
  )
  return (
    <header>

      <Link to="/"></Link>

      <nav>{user ? userOptions : publicOptions}</nav>
    </header>
  )
}
export default Nav
