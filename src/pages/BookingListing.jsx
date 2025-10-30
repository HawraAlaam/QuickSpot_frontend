import { useEffect, useState } from "react"
import Client from "../services/api"
import { Link } from "react-router-dom"

const BookingListing = ({ user }) => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await Client.get("/bookings")
        setBookings(response.data)
      } catch (error) {
        console.error("Error fetching bookings:", error)
      }
    }
    getBookings()
  }, [])

  if (!user) return null

  const userBookings = bookings.filter(b => b.owner._id === user.id)

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-semibold text-[#0c363c] mb-6">Your Bookings</h2>
      {userBookings.length === 0 && <p className="text-gray-500">No bookings found.</p>}

      <div className="w-full max-w-4xl overflow-x-auto flex space-x-4 snap-x snap-mandatory pb-4">
        {userBookings.map((booking) => (
          <div
            key={booking._id}
            className="flex-shrink-0 w-80 snap-start bg-white p-4 rounded-2xl shadow-md border border-[#0c363c] flex flex-col justify-between"
          >
            <div className="mb-2">
              <p className="font-semibold text-lg text-[#0c363c]">
                {booking.type === "job" ? "Job Booking" : "Place Booking"}
              </p>
              <p><b>Title:</b> {booking.place}</p>
              <p><b>Date:</b> {booking.date}</p>
              <p><b>Time:</b> {booking.from} - {booking.to}</p>
            </div>
            <Link to={`/bookings/${booking._id}`}>
              <button className="mt-2 bg-[#0c363c] text-white py-1 rounded-lg w-full hover:bg-[#09292d] transition-colors">
                Complete
              </button>
            </Link>
          </div>
        ))}
      </div>

      <Link to="/home" className="mt-6 text-[#0c363c] hover:underline">
        Back to Home
      </Link>
    </div>
  )
}

export default BookingListing
