import { Link } from 'react-router-dom'
import Button from './Button'

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl mx-4 md:mx-6 mt-6 bg-gradient-to-br from-primary via-blue-600 to-secondary">
      {/* Decorative glow shapes */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      <div className="relative grid md:grid-cols-2 items-center gap-8 px-6 md:px-14 py-12 md:py-20">
        <div className="text-white animate-slideUp">
          <span className="inline-block bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-5">
            ☀️ Summer Sale is Live
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Up to <span className="text-yellow-300">50% Off</span>
            <br /> On Your Favorite Picks
          </h1>
          <p className="text-blue-100 text-base md:text-lg mb-8 max-w-md">
            Fresh styles, top electronics, and everyday essentials — all at prices that make this summer even sweeter.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/products">
              <Button variant="dark" size="lg" className="!bg-white !text-primary hover:!bg-blue-50">
                Shop Now
              </Button>
            </Link>
            <Link to="/products?category=electronics">
              <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white/10">
                Explore Electronics
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex justify-center animate-fadeIn">
          <div className="relative w-full max-w-sm aspect-square rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
            <span className="absolute -top-4 -right-4 bg-yellow-400 text-darktext font-extrabold text-2xl w-20 h-20 rounded-full flex items-center justify-center rotate-12 shadow-softer">
              -50%
            </span>
            <svg width="180" height="180" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M6 8h12l-1 11a2 2 0 0 1-2 1.8H9a2 2 0 0 1-2-1.8L6 8z" fill="white" fillOpacity="0.9" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="white" strokeWidth="1.4" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
