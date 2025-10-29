import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
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

    console.log(job)
    console.log(user)
    getJob()
  }, [id])
  const handleDelete = async () => {
    try {
      await Client.delete(`/jobs/${id}`)
      navigate("/home")
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  }

  const handleSubmit = async () => {
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
  }
  if (!job) return <p>Loading job details...</p>

  return user ? (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>
        <strong>Date:</strong> {job.date}
      </p>
      <p>
        <strong>Time:</strong> {job.from} - {job.to}
      </p>
      <p>
        <strong>Salary:</strong> ${job.salary}
      </p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Description:</strong> {job.description}
      </p>

      <p>
        <strong>Posted by:</strong>{" "}
        <Link to={`/profile/${job.owner._id}`}>
          {job.owner
            ? job.owner.firstName + " " + job.owner.lastName
            : "unknown"}
        </Link>
      </p>

      <Link to={"/home"}> Back </Link>
      {user.id === job.owner._id ? (
        <button onClick={handleDelete} className="deletejob">
          Delete
        </button>
      ) : (
        <button onClick={handleSubmit}>Apply</button>
      )}
    </div>
  ) : null
}

export default JobDetails
