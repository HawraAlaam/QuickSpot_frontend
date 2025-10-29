import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Client from "../services/api"

const PlaceDetails = ({ user }) => {
  const { id } = useParams()
  const [place, setPlaces] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    getPlaces()
  }, [id])

  const getPlaces = async () => {
    try {
      const res = await Client.get(`/place/${id}`)
      setPlaces(res.data)
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching place details:", error)
    }
  }
  const handleDelete = async () => {
    try {
      await Client.delete(`/place/${id}`)
      navigate("/home")
    } catch (error) {
      console.error("Error deleting place:", error)
    }
  }

  const handleSubmit = async () => {
    await Client.post(`/bookings`, {
      type: "place",
      place: place.name,
      date: place.date,
      from: place.from,
      to: place.to,
      owner: user.id,
    })
    await Client.delete(`/place/${id}`)
    navigate("/bookings")
  }

  if (!place) return <p>Loading place details...</p>

  return user ? (
    <div className="place-details">
      <h2>{place.name}</h2>
      <p>
        <strong>Name:</strong> {place.name}
      </p>
      <p>
        <strong>Time:</strong> {place.from} - {place.to}
      </p>
      <p>
        <strong>Price:</strong> ${place.price}
      </p>
      <p>
        <strong>Location:</strong> {place.location}
      </p>
      <p>
        <strong>Description:</strong> {place.description}
      </p>
      {console.log(place.images)}

      {/* i need to use the map because i want to preview the images from an array (using a forEach will return undefined) using map will create new array with each image and then preview it one by one. */}

      {place.images.map((image) => (
        <img src={`http://localhost:3000/${image}`} alt="place" />
      ))}

      <p>
        <strong>Posted by:</strong>{" "}
        <Link to={`/profile/${place.owner._id}`}>
          {place.owner
            ? place.owner.firstName + " " + place.owner.lastName
            : "unknown"}
        </Link>
      </p>

      <Link to={"/home"}> Back </Link>

      {user.id === place.owner._id ? (
        <button onClick={handleDelete} className="deletePlace">
          Delete
        </button>
      ) : null}

      <button onClick={handleSubmit}>Book</button>
    </div>
  ) : null
}

export default PlaceDetails
