import { useEffect, useState } from "react"
import Client from "../services/api"
import { Link } from "react-router-dom"

const JobList = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await Client.get("/jobs")
        setJobs(res.data)
        // console.log(res.data)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }

    getJobs()
  }, [])

  return (
    <div className="job-list">
      <Link to={`/jobForm`}>
        <button>Add New Job</button>
      </Link>
      <h2>Available Jobs</h2>
      <div className="job-grid">
        {jobs.length ? (
          jobs.map((job) => (
            <Link to={`/jobs/${job._id}`} key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <h4>Date: {job.date}</h4>
              <h4>
                Time: {job.from} - {job.to}
              </h4>
              <h4>Salary: {job.salary} BD</h4>
            </Link>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  )
}

export default JobList
