import { useParams } from "react-router-dom"
import Client from "../services/api"
import { useEffect, useState } from "react"

const BookingConfirm = () => {
  const { bookingId } = useParams()
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
  }
  return (
    <div className="booking-confirm">
      <p>Are you sure you completed this booking?</p>

      <button>Cancel</button>
      <button onClick={handleClick}>Yes</button>
    </div>
  )
}

export default BookingConfirm
