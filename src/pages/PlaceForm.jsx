import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"

const PlaceForm = () => {
  let navigate = useNavigate()

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
  const [place, setPlace] = useState(null)

  const handleChange = (e) => {
    const { id, type, files, value } = e.target
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
      [id]: type === "file" ? files : value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    //set item
    localStorage.setItem("imageUpload", "true")

    const formData = new FormData()
    formData.append("name", formValues.name)
    formData.append("price", formValues.price)
    formData.append("date", formValues.date)
    formData.append("from", formValues.from)
    formData.append("to", formValues.to)
    formData.append("description", formValues.description)
    formData.append("location", formValues.location)

    for (let i = 0; i < formValues.images.length; i++) {
      formData.append("images", formValues.images[i])
    }
    //clear item
    const response = await Client.post("/place", formData)
    setPlace(response.data)
    setFormValues(initialState)
    navigate(`/place/${response.data._id}`)
    localStorage.removeItem("imageUpload")
  }

  return (
    <div className="placeFormContainer">
      <h2>Post place</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Title</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Place Title"
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={formValues.price}
          onChange={handleChange}
          placeholder="Price (e.g., 50 NOTE: AMOUNT WILL BE IN BAHRAINI DINARS)"
          required
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          value={formValues.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="timeFrom">Time</label>
        <div className="timeInputGroup">
          <span>From:</span>
          <input
            type="time"
            name="from"
            value={formValues.from}
            onChange={handleChange}
            required
          />
          <span>To:</span>
          <input
            type="time"
            name="to"
            value={formValues.to}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={formValues.location}
          onChange={handleChange}
          placeholder="e.g., Manama"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          placeholder="Detailed place description..."
          required
        />
        <label htmlFor="images">Images</label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleChange}
          multiple
        />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default PlaceForm
