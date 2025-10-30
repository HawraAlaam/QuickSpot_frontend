import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Client from "../services/api"

const PlaceDetails = ({ user }) => {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getPlace = async () => {
      try {
        const res = await Client.get(`/place/${id}`)
        setPlace(res.data)
      } catch (error) {
        console.error("Error fetching place details:", error)
      }
    }
    getPlace()
  }, [id])

  if (!place) return <p className="text-center py-10">Loading place details...</p>

  const handleDelete = async () => {
    try {
      await Client.delete(`/place/${id}`)
      navigate("/home")
    } catch (error) {
      console.error("Error deleting place:", error)
    }
  }

  const handleSubmit = async () => {
    try {
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
    } catch (error) {
      console.error(error)
    }
  }

  return user ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white p-6 rounded-2xl shadow-md border border-[#0c363c] gap-6">
        {/* Left Side: Text */}
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-bold text-[#0c363c]">{place.name}</h2>

          <p>
            <strong>Time:</strong> {place.from} - {place.to}
          </p>
          <p>
            <strong>Price:</strong> {place.price} BD
          </p>
          <p>
            <strong>Location:</strong> {place.location}
          </p>
          <p>
            <strong>Description:</strong> {place.description}
          </p>

          <p>
            <strong>Posted by:</strong>{" "}
            <Link
              to={`/profile/${place.owner._id}`}
              className="text-[#0c363c] hover:underline"
            >
              {place.owner
                ? place.owner.firstName + " " + place.owner.lastName
                : "unknown"}
            </Link>
          </p>

          <div className="flex gap-4 mt-4">
            <Link
              to="/home"
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back
            </Link>

            {user.id === place.owner._id ? (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#0c363c] text-white rounded-lg hover:bg-[#09292d] transition-colors"
              >
                Book
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Images */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {place.images.map((image,idx) => (
            <img
              key={idx}
              src={`http://localhost:3000/${image}`}
              alt={`place-${idx}`}
              className="w-full h-40 sm:h-48 object-cover rounded-lg border border-gray-300"
            />
          ))}
        </div>
      </div>
    </div>
  ) : null
}

export default PlaceDetails
