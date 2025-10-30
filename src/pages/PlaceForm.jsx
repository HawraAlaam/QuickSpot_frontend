import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"

const PlaceForm = ({ user }) => {
  const navigate = useNavigate()

  const initialState = {
    name: "",
    price: 0,
    date: "",
    from: "",
    to: "",
    description: "",
    location: "",
    images: null,
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    const { id, type, files, value } = e.target
    setFormValues({
      ...formValues,
      [e.target.name]: type === "file" ? files : value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("owner", user.id)
    formData.append("name", formValues.name)
    formData.append("price", formValues.price)
    formData.append("date", formValues.date)
    formData.append("from", formValues.from)
    formData.append("to", formValues.to)
    formData.append("description", formValues.description)
    formData.append("location", formValues.location)

    if (formValues.images) {
      Array.from(formValues.images).forEach((file) =>
        formData.append("images", file)
      )
    }

    const response = await Client.post("/place", formData)
    setFormValues(initialState)
    navigate(`/place/${response.data._id}`)
  }

  return user ? (
    <div className="placeFormContainer flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Post a Place</h2>

        <input type="hidden" name="owner" value={user.id} />

        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Place Title"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="price"
          value={formValues.price}
          onChange={handleChange}
          placeholder="Price (BD)"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="date"
          value={formValues.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <div className="flex space-x-2">
          <input
            type="time"
            name="from"
            value={formValues.from}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="time"
            name="to"
            value={formValues.to}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
        </div>

        <input
          type="text"
          name="location"
          value={formValues.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          placeholder="Detailed description"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          name="images"
          id="images"
          onChange={handleChange}
          multiple
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-[#0c363c] text-white py-2 rounded hover:bg-[#0a2b2e] transition"
        >
          Post
        </button>
      </form>
    </div>
  ) : null
}

export default PlaceForm
