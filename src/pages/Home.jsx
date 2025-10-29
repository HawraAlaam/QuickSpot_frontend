import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [place, setPlace] = useState([])

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
        setPlace(response.data.slice(0, 8))
      } catch (error) {
        console.error("Error fetching places:", error)
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
                  Time: {job.from} - {job.to}
                </h4>
                <h4>Salary: {job.salary} BD</h4>
              </div>
            </Link>
          ))
        ) : (
          <p>No jobs available.</p>
        )}
        <div className="more-btn">
          <Link to="/jobList">See More Jobs</Link>
        </div>
      </div>
      <h2>Latest places</h2>
      <div className="place-grid">
        {place.length ? (
          place.map((place) => (
            <Link to={`/place/${place._id}`}>
              <div key={place._id} className="place-card">
                <h3>{place.name}</h3>
                <h4>Date: {place.date}</h4>
                <h4>
                  Time: {place.from} - {place.to}
                </h4>
                <h4>Price: {place.price} BD</h4>
              </div>
            </Link>
          ))
        ) : (
          <p>No places available.</p>
        )}
      </div>
      <div className="more-btn">
        <Link to="/placeList">See More PLaces</Link>
      </div>
    </div>
  )
}

export default Home
