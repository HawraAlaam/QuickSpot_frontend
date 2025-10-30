import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await Client.get("/jobs")
        setJobs(response.data)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }
    const getPlaces = async () => {
      try {
        const response = await Client.get("/place")
        setPlaces(response.data)
      } catch (error) {
        console.error("Error fetching places:", error)
      }
    }
    getJobs()
    getPlaces()
  }, [])

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto space-y-8 bg-gradient-to-b from-[#f8faf9] to-[#edf3f2] min-h-screen">
      {/* Jobs Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c363c] mb-4 tracking-wide uppercase drop-shadow-sm">
          Latest Jobs
        </h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {jobs.length ? (
            jobs.map((job) => (
              <Link key={job._id} to={`/jobs/${job._id}`} className="flex-shrink-0 w-60">
                <div className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition-shadow h-52 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[#0c363c] font-semibold mb-1 truncate">{job.title}</h3>
                    <p className="text-gray-600 text-sm mb-0.5">Date: {job.date}</p>
                    <p className="text-gray-600 text-sm mb-0.5">Time: {job.from} - {job.to}</p>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">Salary: {job.salary} BD</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
        <div className="text-right mt-2">
          <Link className="text-[#0c363c] font-medium hover:underline" to="/jobList">
            See More Jobs
          </Link>
        </div>
      </section>

      {/* Places Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c363c] mb-4 tracking-wide uppercase drop-shadow-sm">
          Latest Places
        </h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {places.length ? (
            places.map((place) => (
              <Link key={place._id} to={`/place/${place._id}`} className="flex-shrink-0 w-60">
                <div className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition-shadow h-52 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[#0c363c] font-semibold mb-1 truncate">{place.name}</h3>
                    <p className="text-gray-600 text-sm mb-0.5">Date: {place.date}</p>
                    <p className="text-gray-600 text-sm mb-0.5">Time: {place.from} - {place.to}</p>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">Price: {place.price} BD</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No places available.</p>
          )}
        </div>
        <div className="text-right mt-2">
          <Link className="text-[#0c363c] font-medium hover:underline" to="/placeList">
            See More Places
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
