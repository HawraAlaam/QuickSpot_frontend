import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"

const JobForm = () => {
  let navigate = useNavigate()

  const initialState = {
    title: "",
    salary: 0,
    date: "",
    from: "",
    to: "",
    description: "",
    location: "",
  }

  const [formValue, setFormValue] = useState(initialState)
  const [job, setJob] = useState(null)

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value })
  }

  console.log(formValue)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await Client.post("/jobs", formValue)
    setJob(response.data)
    setFormValue(initialState)
    navigate(`/jobs/${response.data._id}`)
  }

  return (
    <div className="jobFormContainer">
      <h2>Post job</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formValue.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />

        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          name="salary"
          value={formValue.salary}
          onChange={handleChange}
          placeholder="Salary/Price (e.g., 50 NOTE: SALARY WILL BE IN BAHRAINI DINARS)"
          required
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          value={formValue.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="from">Time</label>
        <div className="timeInputGroup">
          <span>From:</span>
          <input
            type="time"
            name="from"
            value={formValue.from}
            onChange={handleChange}
            required
          />
          <span>To:</span>
          <input
            type="time"
            name="to"
            value={formValue.to}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={formValue.location}
          onChange={handleChange}
          placeholder="e.g., Manama"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formValue.description}
          onChange={handleChange}
          placeholder="Detailed job description..."
          required
        />

        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default JobForm
