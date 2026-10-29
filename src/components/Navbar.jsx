import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { getCategoryLabel } from '../utils/formatters'
import productService from '../services/productService'

const CATEGORY_LIST = ['all', "men's clothing", "women's clothing", 'electronics', 'jewelery']

export default function Navbar() {
  const { itemCount } = useCart()
  const { count: wishlistCount } = useWishlist()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [products, setProducts] = useState([])
  const catRef = useRef(null)
  const userRef = useRef(null)

  useEffect(() => {
    productService.getAll().then(setProducts).catch(() => setProducts([]))
  }, [])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCategoryOpen(false)
      if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleCategoryClick = (cat) => {
    setCategoryOpen(false)
    setMobileOpen(false)
    navigate(cat === 'all' ? '/products' : `/products?category=${encodeURIComponent(cat)}`)
  }

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-soft">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 8h12l-1 11a2 2 0 0 1-2 1.8H9a2 2 0 0 1-2-1.8L6 8z" fill="white" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="white" strokeWidth="1.6" fill="none" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-darktext hidden sm:block">
              Shop<span className="text-primary">Wave</span>
            </span>
          </Link>

          {/* Categories dropdown - desktop */}
          <div className="relative hidden lg:block" ref={catRef}>
            <button
              onClick={() => setCategoryOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-100 text-sm font-medium text-darktext transition-colors"
            >
              Categories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${categoryOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {categoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-softer border border-gray-100 py-2 animate-slideDown">
                {CATEGORY_LIST.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="w-full text-left px-4 py-2.5 text-sm text-darktext hover:bg-blue-50 hover:text-primary transition-colors"
                  >
                    {getCategoryLabel(cat)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search bar - desktop */}
          <div className="hidden md:block flex-1 max-w-xl">
            <SearchBar products={products} />
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 md:gap-2 ml-auto">
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Wishlist"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8">
                <path d="M12 21s-6.7-4.35-9.3-8.2C.8 9.6 1.7 6 5 4.9c2-.65 3.9.2 5 1.9 1.1-1.7 3-2.55 5-1.9 3.3 1.1 4.2 4.7 2.3 7.9C18.7 16.65 12 21 12 21z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Shopping cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative hidden md:block" ref={userRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-darktext max-w-[100px] truncate">{user?.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-softer border border-gray-100 py-2 animate-slideDown">
                    <Link to="/wishlist" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-primary">My Wishlist</Link>
                    <Link to="/cart" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-primary">My Cart</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <button className="ml-1 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-soft">
                  Login
                </button>
              </Link>
            )}

            {/* Hamburger - mobile */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <SearchBar products={products} mobile />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slideDown">
          <div className="px-4 py-3 space-y-1">
            {!isAuthenticated ? (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block w-full text-center py-2.5 rounded-xl bg-primary text-white font-semibold mb-2">
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-3 px-2 py-2 mb-2 bg-blue-50 rounded-xl">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="font-medium text-darktext">{user?.name}</span>
              </div>
            )}
            <p className="px-2 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wide">Categories</p>
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="block w-full text-left px-2 py-2.5 rounded-lg hover:bg-blue-50 hover:text-primary text-darktext"
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
            <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="block px-2 py-2.5 rounded-lg hover:bg-blue-50 hover:text-primary text-darktext">Wishlist ({wishlistCount})</Link>
            <Link to="/cart" onClick={() => setMobileOpen(false)} className="block px-2 py-2.5 rounded-lg hover:bg-blue-50 hover:text-primary text-darktext">Cart ({itemCount})</Link>
            {isAuthenticated && (
              <button onClick={handleLogout} className="block w-full text-left px-2 py-2.5 rounded-lg text-red-500 hover:bg-red-50">Logout</button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
