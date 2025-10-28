import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Client from "../services/api"

const PlaceDetails = () => {
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

  if (!place) return <p>Loading place details...</p>

  return (
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
      {place.owner && (
        <p>
          <strong>Posted by:</strong> {place.owner.name || place.owner.email}
        </p>
      )}

      <Link to={"/home"}> Back </Link>

      <button onClick={handleDelete} className="deletePlace">
        Delete
      </button>
    </div>
  )
}

export default PlaceDetails
