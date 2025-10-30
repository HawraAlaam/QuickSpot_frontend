import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"

const JobForm = ({ user }) => {
  const navigate = useNavigate()

  const initialState = {
    title: "",
    salary: "",
    date: "",
    from: "",
    to: "",
    description: "",
    location: "",
  }

  const [formValue, setFormValue] = useState(initialState)

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = { ...formValue, owner: user.id }
    const response = await Client.post("/jobs", formData)
    setFormValue(initialState)
    navigate(`/jobs/${response.data._id}`)
  }

  if (!user) return null

  return (
    <div className="flex justify-center items-start py-6 px-4 min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white p-5 rounded-2xl shadow-md border border-[#0c363c]">
        <h2 className="text-xl font-bold text-[#0c363c] mb-4 text-center">
          Post a Job
        </h2>

        <form className="space-y-2.5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formValue.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
            required
          />

          <input
            type="number"
            name="salary"
            value={formValue.salary}
            onChange={handleChange}
            placeholder="Salary (BD)"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
            required
          />

          <input
            type="date"
            name="date"
            value={formValue.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
            required
          />

          <div className="flex space-x-2">
            <input
              type="time"
              name="from"
              value={formValue.from}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
              required
            />
            <input
              type="time"
              name="to"
              value={formValue.to}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
              required
            />
          </div>

          <input
            type="text"
            name="location"
            value={formValue.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
            required
          />

          <textarea
            name="description"
            value={formValue.description}
            onChange={handleChange}
            placeholder="Job Description..."
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c] resize-none"
            rows="2"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#0c363c] text-white py-2 rounded-lg font-medium hover:bg-[#09292d] transition-colors text-sm"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default JobForm
