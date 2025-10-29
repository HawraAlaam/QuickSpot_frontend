import { useEffect, useState } from "react"
import Client from "../services/api"
import { Link } from "react-router-dom"

const PlaceList = ({ user }) => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const res = await Client.get("/place")
        setPlaces(res.data)
        // console.log(res.data)
      } catch (error) {
        console.error("Error fetching places:", error)
      }
    }

    getPlaces()
  }, [])

  return user ? (
    <div className="place-list">
      <h2>Available places</h2>
      <div className="place-grid">
        {places.length ? (
          places.map((place) => (
            <Link
              to={`/place/${place._id}`}
              key={place._id}
              className="place-card"
            >
              <h3>{place.name}</h3>
              <p>{place.location}</p>
              <p>${place.price}</p>
            </Link>
          ))
        ) : (
          <p>No places found.</p>
        )}
      </div>
    </div>
  ) : null
}

export default PlaceList
