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
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }
    getJobs()
  }, [])

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#0c363c]">
          Available Jobs
        </h2>
        <Link to="/jobForm">
          <button className="bg-[#0c363c] text-white px-4 py-1.5 rounded-lg hover:bg-[#09292d] transition-colors text-sm">
            Add New Job
          </button>
        </Link>
      </div>

      {jobs.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {jobs.map((job) => (
            <Link
              to={`/jobs/${job._id}`}
              key={job._id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
            >
              <h3 className="text-[#0c363c] font-semibold mb-1">{job.title}</h3>
              <p className="text-gray-600 text-sm mb-0.5">Date: {job.date}</p>
              <p className="text-gray-600 text-sm mb-0.5">
                Time: {job.from} - {job.to}
              </p>
              <p className="text-gray-600 text-sm">Salary: {job.salary} BD</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No jobs found.</p>
      )}
    </div>
  )
}

export default JobList
