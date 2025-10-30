import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Client from "../services/api"

const JobDetails = ({ user }) => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getJob = async () => {
      try {
        const res = await Client.get(`/jobs/${id}`)
        setJob(res.data)
      } catch (error) {
        console.error("Error fetching job details:", error)
      }
    }
    getJob()
  }, [id])

  if (!job) return <p className="text-center py-10">Loading job details...</p>

  const handleDelete = async () => {
    try {
      await Client.delete(`/jobs/${id}`)
      navigate("/home")
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  }

  const handleSubmit = async () => {
    try {
      await Client.post(`/bookings`, {
        type: "job",
        place: job.title,
        date: job.date,
        from: job.from,
        to: job.to,
        owner: user.id,
      })
      await Client.delete(`/jobs/${id}`)
      navigate("/bookings")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen py-6 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-md border border-[#0c363c] flex flex-col justify-between min-h-[85vh]">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0c363c] mb-2 text-center">
            {job.title}
          </h2>

          <p>
            <strong>Date:</strong> {job.date}
          </p>
          <p>
            <strong>Time:</strong> {job.from} - {job.to}
          </p>
          <p>
            <strong>Salary:</strong> {job.salary} BD
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>

          <p>
            <strong>Posted by:</strong>{" "}
            <Link
              to={`/profile/${job.owner._id}`}
              className="text-[#0c363c] hover:underline"
            >
              {job.owner
                ? job.owner.firstName + " " + job.owner.lastName
                : "Unknown"}
            </Link>
          </p>
        </div>

        {/* Buttons fixed at bottom of the card */}
        <div className="flex justify-between mt-6 space-x-3">
          <Link
            to="/home"
            className="flex-1 text-center py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back
          </Link>

          {user.id === job.owner._id ? (
            <button
              onClick={handleDelete}
              className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 bg-[#0c363c] text-white rounded-lg hover:bg-[#09292d] transition-colors"
            >
              Apply
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobDetails
