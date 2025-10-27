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
    images: [""],
  }

  const [formValue, setFormValue] = useState(initialState)
  const [place, setPlace] = useState(null)

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await Client.post("/place", formValue)
    console.log(response)
    setPlace(response.data)
    setFormValue(initialState)
    navigate(`/place/${response.data._id}`)
  }

  return (
    <div className="placeFormContainer">
      <h2>Post place</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Title</label>
        <input
          type="text"
          name="name"
          value={formValue.name}
          onChange={handleChange}
          placeholder="Place Title"
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={formValue.price}
          onChange={handleChange}
          placeholder="Price (e.g., 50 NOTE: AMOUNT WILL BE IN BAHRAINI DINARS)"
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

        <label htmlFor="timeFrom">Time</label>
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
          placeholder="Detailed place description..."
          required
        />

        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default PlaceForm
