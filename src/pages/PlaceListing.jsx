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
      } catch (error) {
        console.error("Error fetching places:", error)
      }
    }
    getPlaces()
  }, [])

  if (!user) return null

  return (
    <div className="flex flex-col items-center py-6 px-4 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl mb-4 flex justify-end">
        <Link to="/placeForm">
          <button className="px-4 py-2 bg-[#0c363c] text-white rounded-lg hover:bg-[#09292d] transition-colors text-sm">
            Add New Place
          </button>
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-[#0c363c] mb-4">Available Places</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {places.length ? (
          places.map((place) => (
            <Link
              to={`/place/${place._id}`}
              key={place._id}
              className="bg-white p-4 rounded-2xl shadow-md border border-[#0c363c] hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-[#0c363c] mb-1">
                {place.name}
              </h3>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Date:</strong> {place.date}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Time:</strong> {place.from} - {place.to}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Price:</strong> {place.price} BD
              </p>
            </Link>
          ))
        ) : (
          <p>No places found.</p>
        )}
      </div>
    </div>
  )
}

export default PlaceList
