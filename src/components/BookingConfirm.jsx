import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"

const BookingConfirm = () => {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    const getBooking = async () => {
      try {
        const response = await Client.get(`/bookings/${bookingId}`)
        setBooking(response.data)
      } catch (error) {
        console.error("Error fetching booking:", error)
      }
    }
    getBooking()
  }, [bookingId])

  const handleConfirm = async () => {
    try {
      await Client.delete(`/bookings/${bookingId}`)
      setShowModal(false)
      navigate("/bookings")
    } catch (error) {
      console.error("Error deleting booking:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c363c] to-[#124a50]">
      {showModal && booking && (
        <div className="bg-white text-[#0c363c] p-8 rounded-2xl shadow-2xl w-96 text-center animate-scaleIn">
          <h2 className="text-2xl font-bold mb-2">Confirm Booking</h2>
          <h3 className="text-lg font-semibold mb-4">{booking.place}</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you’ve completed this booking?
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setShowModal(false)
                navigate("/bookings")
              }}
              className="bg-gray-200 text-[#0c363c] hover:bg-gray-300 px-4 py-2 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="bg-[#0c363c] hover:bg-[#145a62] text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Yes, Completed
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingConfirm
