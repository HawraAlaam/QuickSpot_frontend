import { useEffect, useState } from "react"
import Client from "../services/api"
import { Link, useNavigate, useParams } from "react-router-dom"

const BookingListing = ({ user }) => {
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
        console.error("Error fetching bookings:", error)
      }
    }

    getBookings()
  }, [])

  return user ? (
    <div className="booking-list">
      <h2>Bookings</h2>
      <div className="booking-grid">
        <h1>Jobs</h1>
        {bookings && user ? (
          bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              {user.id === booking.owner._id ? (
                booking.type === "job" ? (
                  <div className="job-booking">
                    <p>
                      <b>Job:</b>
                    </p>
                    <p>{booking.place}</p>
                    <p>{booking.date}</p>
                    <p>
                      {booking.from} to {booking.to}
                    </p>
                    <Link to={"/home"}> Back </Link>
                    <Link to={`/bookings/${booking._id}`}>
                      <button>Complete</button>
                    </Link>
                  </div>
                ) : (
                  <div className="place-booking">
                    <p>
                      <b>Place:</b>
                    </p>
                    <p>{booking.place}</p>
                    <p>{booking.date}</p>
                    <p>
                      {booking.from} to {booking.to}
                    </p>
                    <Link to={"/home"}> Back </Link>
                    <Link to={`/bookings/${booking._id}`}>
                      <button>Complete</button>
                    </Link>
                  </div>
                )
              ) : null}
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  ) : null
}

export default BookingListing
