import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import StarRating from '../components/StarRating'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import { formatPrice, getCategoryLabel } from '../utils/formatters'

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleMoveToCart = (product) => {
    addToCart(product, 1)
    removeFromWishlist(product.id)
    showToast('Moved to cart', 'success')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <EmptyState
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21s-6.7-4.35-9.3-8.2C.8 9.6 1.7 6 5 4.9c2-.65 3.9.2 5 1.9 1.1-1.7 3-2.55 5-1.9 3.3 1.1 4.2 4.7 2.3 7.9C18.7 16.65 12 21 12 21z" />
            </svg>
          }
          title="Your wishlist is empty"
          message="Save items you love here so you never lose track of them."
          actionLabel="Discover Products"
          actionTo="/products"
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-darktext">My Wishlist ({items.length})</h1>
        <button onClick={clearWishlist} className="text-sm font-semibold text-red-500 hover:underline">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div key={item.id} className="bg-cardbg rounded-2xl p-4 shadow-soft flex gap-4 animate-fadeIn">
            <Link to={`/product/${item.id}`} className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2 shrink-0">
              <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
            </Link>
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="text-xs font-medium text-primary uppercase">{getCategoryLabel(item.category)}</span>
              <Link to={`/product/${item.id}`}>
                <h3 className="font-semibold text-sm text-darktext line-clamp-2 hover:text-primary transition-colors">{item.title}</h3>
              </Link>
              <StarRating rating={item.rating?.rate || 0} count={item.rating?.count || 0} size={13} />
              <p className="font-bold text-darktext mt-1">{formatPrice(item.price)}</p>
              <div className="mt-auto flex gap-2 pt-2">
                <Button size="sm" variant="primary" onClick={() => handleMoveToCart(item)}>Move to Cart</Button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
