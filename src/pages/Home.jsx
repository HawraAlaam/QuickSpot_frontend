import JobList from "./JobListings"
import Nav from "../components/Nav"

const Home = () => {
  return(
    <>
    <Nav />
     <div className="home-page">
      <h1>Welcome to the Job Board</h1>
      <p>Browse available jobs below:</p>
      <JobList />
    </div>
    </>
  )
}

export default Home
