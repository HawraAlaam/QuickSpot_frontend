import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"

const Home = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await Client.get("/jobs")
        setJobs(response.data.slice(0, 8))
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }
    const getPlaces = async () => {
      try {
        const response = await Client.get("/place")
        setJobs(response.data.slice(0, 8))
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }
    getPlaces()
    getJobs()
  }, [])
  return (
    <div className="home-container">
      <h2>Latest Jobs</h2>
      <div className="job-grid">
        {jobs.length ? (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.location}</p>
              <p>${job.salary}</p>
              <Link to={`/jobs/${job._id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No jobs available.</p>
        )}
      </div>
      <div className="more-btn">
        <Link to="/jobs">See More Jobs</Link>
      </div>
      <div>
        <Link to={"/placeForm"}>Add Place</Link>
      </div>
    </div>
  )
}

export default Home
