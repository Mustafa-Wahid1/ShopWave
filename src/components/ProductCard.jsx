import { Link } from 'react-router-dom'
import StarRating from './StarRating'
import { formatPrice, getCategoryLabel } from '../utils/formatters'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'

// Core product tile used across Home, Category, Search & Related sections.
export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { showToast } = useToast()

  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    showToast(`${product.title.slice(0, 30)}${product.title.length > 30 ? '…' : ''} added to cart`, 'success')
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    showToast(
      wishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      wishlisted ? 'info' : 'success'
    )
  }

  return (
    <div className="group bg-cardbg rounded-2xl p-4 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1 flex flex-col animate-fadeIn">
      <Link to={`/product/${product.id}`} className="relative block mb-4 rounded-xl overflow-hidden bg-white">
        <div className="h-44 flex items-center justify-center p-3">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <button
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow-soft flex items-center justify-center hover:scale-110 transition-transform"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={wishlisted ? '#EF4444' : 'none'}
            stroke={wishlisted ? '#EF4444' : '#6B7280'}
            strokeWidth="2"
          >
            <path d="M12 21s-6.7-4.35-9.3-8.2C.8 9.6 1.7 6 5 4.9c2-.65 3.9.2 5 1.9 1.1-1.7 3-2.55 5-1.9 3.3 1.1 4.2 4.7 2.3 7.9C18.7 16.65 12 21 12 21z" />
          </svg>
        </button>
      </Link>

      <span className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
        {getCategoryLabel(product.category)}
      </span>

      <Link to={`/product/${product.id}`}>
        <h3 className="text-sm font-semibold text-darktext line-clamp-2 mb-1.5 hover:text-primary transition-colors min-h-[2.5rem]">
          {product.title}
        </h3>
      </Link>

      <StarRating rating={product.rating?.rate || 0} count={product.rating?.count || 0} />

      <div className="flex items-center justify-between mt-2 mb-3">
        <span className="text-lg font-bold text-darktext">{formatPrice(product.price)}</span>
      </div>

      <div className="mt-auto flex gap-2">
        <button
          onClick={handleAddToCart}
          className="btn-ripple flex-1 bg-primary text-white text-sm font-semibold rounded-xl py-2 hover:bg-primary-dark transition-colors shadow-soft active:scale-95"
        >
          Add to Cart
        </button>
        <Link
          to={`/product/${product.id}`}
          className="flex items-center justify-center px-3 rounded-xl border-2 border-gray-200 hover:border-primary hover:text-primary transition-colors text-gray-500"
          aria-label="View details"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
