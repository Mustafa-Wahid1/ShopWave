import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Wraps every route with the shared Navbar/Footer chrome and applies a
// gentle fade/slide page-transition whenever the route changes.
export default function MainLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main key={location.pathname} className="flex-1 page-transition">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
