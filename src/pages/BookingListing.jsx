import { useEffect, useState } from "react"
import Client from "../services/api"
import { Link, useNavigate, useParams } from "react-router-dom"

const BookingListing = () => {
  const { bookingId } = useParams()
  let navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await Client.get("/bookings")
        setBookings(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }

    const getBooking = async () => {
      try {
        const response = await Client.get(`/bookings/${bookingId}`)
        setBooking(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching booking:", error)
      }
    }

    getBookings()
    getBooking()
  }, [])

  return (
    <div className="booking-list">
      <h2>Bookings</h2>
      <div className="booking-grid">
        {bookings.length ? (
          bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.place}</h3>
              <p>{booking.date}</p>
              <p>
                {booking.from} to {booking.to}
              </p>
              <Link to={`/bookings/${bookingId}`}>
                <button>Complete</button>
              </Link>
              <form action="">
                <button>Delete</button>
              </form>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  )
}

export default BookingListing
