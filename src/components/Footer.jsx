import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'

export default function Footer() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    showToast('Thanks for subscribing to ShopWave updates!', 'success')
    setEmail('')
  }

  return (
    <footer className="bg-darktext text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Company info */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 8h12l-1 11a2 2 0 0 1-2 1.8H9a2 2 0 0 1-2-1.8L6 8z" fill="white" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="white" strokeWidth="1.6" fill="none" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-white">
              Shop<span className="text-secondary">Wave</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
            ShopWave brings you quality fashion, electronics, and jewelry at prices that make sense —
            all backed by fast shipping and easy returns.
          </p>
          <div className="flex gap-3 mt-5">
            {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
              <a
                key={social}
                href="#"
                aria-label={social}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <SocialIcon name={social} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Shop</Link></li>
            <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
          </ul>
        </div>

        {/* Customer support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Customer Support</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-gray-400 mb-3">Get updates on new arrivals and special offers.</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-500 text-sm outline-none focus:bg-white/20"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors shrink-0"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ShopWave. All rights reserved.</p>
          <p>Built with React, Vite & Tailwind CSS · Data by Fake Store API</p>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }) {
  const paths = {
    facebook: 'M13 10h3V7h-3c-1.66 0-3 1.34-3 3v2H8v3h2v6h3v-6h2.5l.5-3H13v-2z',
    twitter: 'M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.3-.8.5-1.6.8-2.5 1-1.4-1.5-3.8-1.6-5.3-.1-1 1-1.4 2.4-1.1 3.7-3.1-.2-5.9-1.7-7.8-4-1 1.7-.5 3.9 1.2 5-.6 0-1.2-.2-1.7-.5 0 1.8 1.3 3.3 3 3.7-.5.1-1.1.2-1.7.1.5 1.5 1.9 2.6 3.6 2.6-1.3 1-3 1.6-4.7 1.6H2c1.7 1.1 3.7 1.7 5.9 1.7 7 0 10.9-5.9 10.7-11.1.8-.5 1.4-1.2 1.4-2.1z',
    instagram: 'M12 2c2.7 0 3.1 0 4.1.1 1 .1 1.7.2 2.3.5.6.3 1.1.6 1.6 1.1.5.5.8 1 1.1 1.6.3.6.4 1.3.5 2.3.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c-.1 1-.2 1.7-.5 2.3-.3.6-.6 1.1-1.1 1.6-.5.5-1 .8-1.6 1.1-.6.3-1.3.4-2.3.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1-.1-1.7-.2-2.3-.5-.6-.3-1.1-.6-1.6-1.1-.5-.5-.8-1-1.1-1.6-.3-.6-.4-1.3-.5-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c.1-1 .2-1.7.5-2.3.3-.6.6-1.1 1.1-1.6.5-.5 1-.8 1.6-1.1.6-.3 1.3-.4 2.3-.5C8.9 2 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z',
    youtube: 'M23 12s0-3.6-.5-5.2c-.3-1-1-1.7-2-2C18.9 4.3 12 4.3 12 4.3s-6.9 0-8.5.5c-1 .3-1.7 1-2 2C1 8.4 1 12 1 12s0 3.6.5 5.2c.3 1 1 1.7 2 2 1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5c1-.3 1.7-1 2-2 .5-1.6.5-5.2.5-5.2zM9.8 15.5v-7l6 3.5-6 3.5z',
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300">
      <path d={paths[name]} />
    </svg>
  )
}
