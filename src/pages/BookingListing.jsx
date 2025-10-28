import { useEffect, useState } from "react"
import Client from "../services/api"
import { Link } from "react-router-dom"

const BookingListing = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await Client.get("/bookings")
        setBookings(response.data)
        // console.log(res.data)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }

    getBookings()
  }, [])

  return (
    <div className="booking-list">
      <h2>Bookings</h2>
      <div className="booking-grid">
        {bookings.length ? (
          bookings.map((booking) => (
            <div className="booking-card">
              <h3>{booking.place}</h3>
              <p>{booking.date}</p>
              <p>
                {booking.from} to {booking.to}
              </p>
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
