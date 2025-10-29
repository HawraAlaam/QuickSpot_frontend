import { useNavigate } from "react-router-dom"

const Welcome = () => {
  let navigate = useNavigate()

  return (
    <section class="hero">
      <div class="hero__inner">
        <h1 class="hero__title">
          Welcome to QuickSpot — Bahrain’s Go-To Platform for Fast, Flexible
          Opportunities
        </h1>
        <p class="hero__subtitle">
          Whether you’re looking to earn extra income through short-term jobs or
          need to fill an urgent staffing gap,
          <strong>QuickSpot</strong> connects you instantly with the right
          people. From one-day gigs to temporary rentals, we make it simple,
          reliable, and quick. No long waiting, no complicated steps — just real
          opportunities when you need them most.
        </p>
        <a href="/register" class="hero__cta">
          Get Started
        </a>
      </div>
    </section>
  )
}

export default Welcome
