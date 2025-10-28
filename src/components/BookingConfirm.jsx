import { Link, useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"
import { useEffect, useState } from "react"

const BookingConfirm = () => {
  const { bookingId } = useParams()
  let navigate = useNavigate()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const getBooking = async () => {
      try {
        const response = await Client.get(`/bookings/${bookingId}`)
        setBooking(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching booking:", error)
      }
    }

    getBooking()
  }, [])

  const handleClick = async () => {
    await Client.delete(`/bookings/${bookingId}`)
    navigate("/bookings")
  }
  return booking ? (
    <div className="booking-confirm">
      <h3>{booking.place}</h3>
      <p>Are you sure you completed this booking?</p>
      <Link to={"/bookings"}>
        <button>Cancel</button>
      </Link>
      <button onClick={handleClick}>Yes</button>
    </div>
  ) : null
}

export default BookingConfirm
