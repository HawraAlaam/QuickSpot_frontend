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
            <Link to={`/jobs/${job._id}`}>
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <h4>Date: {job.date}</h4>
                <h4>
                  From:{job.from} To:{job.to}
                </h4>
                <h4>Salary: {job.salary} BD</h4>
              </div>
            </Link>
          ))
        ) : (
          <p>No jobs available.</p>
        )}
      </div>
      <div className="more-btn">
        <Link to="/jobList">See More Jobs</Link>
      </div>
      <div>
        <Link to={"/placeForm"}>Add Place</Link>
      </div>
    </div>
  )
}

export default Home
