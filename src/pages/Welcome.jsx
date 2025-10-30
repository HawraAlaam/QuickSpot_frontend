import { useNavigate } from "react-router-dom"

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <section className="relative isolate overflow-hidden bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        {/* Hero Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 font-serif leading-snug">
          Welcome to <span className="text-[#0c363c]">QuickSpot</span> <br />Bahrain’s
          Go-To Platform for Fast, Flexible Opportunities
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 font-sans max-w-xl mx-auto">
          Whether you’re looking to earn extra income through short-term jobs or
          need to fill an urgent staffing gap,{" "}
          <strong className="font-semibold text-gray-900">QuickSpot</strong>{" "}
          connects you instantly with the right people. From one-day gigs to
          temporary rentals, we make it simple, reliable, and quick. No long
          waiting, no complicated steps — just real opportunities when you need
          them most.
        </p>

        {/* Call to Action */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/register")}
            className="rounded-xl px-6 py-2 text-sm sm:text-base font-semibold text-white shadow-md hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c363c] transition-colors"
            style={{ backgroundColor: "#0c363c" }}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Decorative gradient blur */}
      <div
        className="absolute inset-x-0 top-[calc(100%-8rem)] -z-10 transform-gpu overflow-hidden blur-2xl sm:top-[calc(100%-16rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-10rem)] aspect-[1155/678] w-[24rem] -translate-x-1/2 opacity-30 sm:left-[calc(50%-28rem)] sm:w-[56rem]"
          style={{
            background: "linear-gradient(135deg, #0c363c 0%, #1e5a5e 100%)",
            clipPath:
              "polygon(74.8% 44.1%, 100% 78.4%, 97.6% 98.8%, 91.3% 99.2%, 73.3% 92.5%, 55.1% 94.9%, 45.5% 79.4%, 28.2% 59.2%, 0.3% 36.3%, 17.1% 12.7%, 44.3% 6%, 65.4% 14.1%, 80.6% 26.4%)",
          }}
        />
      </div>
    </section>
  )
}

export default Welcome
