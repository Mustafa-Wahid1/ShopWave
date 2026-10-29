import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'

/**
 * Live, debounced search input with a dropdown of matching product
 * suggestions. Pulls from the full product list passed down via props
 * (fetched once at the App level) to avoid refetching on every keystroke.
 */
export default function SearchBar({ products = [], className = '', mobile = false }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const debounced = useDebounce(query, 300)
  const navigate = useNavigate()
  const wrapperRef = useRef(null)

  const suggestions =
    debounced.trim().length > 0
      ? products
          .filter((p) => p.title.toLowerCase().includes(debounced.toLowerCase()))
          .slice(0, 6)
      : []

  useEffect(() => {
    setOpen(suggestions.length > 0 && document.activeElement === wrapperRef.current?.querySelector('input'))
  }, [debounced]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setOpen(false)
    }
  }

  const handleSuggestionClick = (product) => {
    setQuery('')
    setOpen(false)
    navigate(`/product/${product.id}`)
  }

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => query && setOpen(true)}
          placeholder="Search for products, brands and more..."
          className={`w-full ${mobile ? 'py-2.5' : 'py-2.5'} pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary outline-none text-sm text-darktext transition-colors`}
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-softer border border-gray-100 overflow-hidden z-50 animate-slideDown">
          {suggestions.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSuggestionClick(p)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-left"
            >
              <img src={p.image} alt={p.title} className="w-8 h-8 object-contain" />
              <span className="text-sm text-darktext line-clamp-1">{p.title}</span>
            </button>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2.5 text-sm font-semibold text-primary bg-blue-50/50 hover:bg-blue-50 transition-colors text-left"
          >
            See all results for "{query}"
          </button>
        </div>
      )}
    </div>
  )
}
