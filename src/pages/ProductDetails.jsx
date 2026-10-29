import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import StarRating from '../components/StarRating'
import QuantitySelector from '../components/QuantitySelector'
import Button from '../components/Button'
import ProductCard from '../components/ProductCard'
import { ProductDetailsSkeleton } from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import productService from '../services/productService'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { formatPrice, getCategoryLabel } from '../utils/formatters'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { showToast } = useToast()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    setQuantity(1)
    setActiveImage(0)
    try {
      const data = await productService.getById(id)
      setProduct(data)
      const relatedData = await productService.getByCategory(data.category)
      setRelated(relatedData.filter((p) => p.id !== data.id).slice(0, 4))
    } catch (err) {
      setError(err.message || 'Failed to load this product.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <ProductDetailsSkeleton />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <ErrorState onRetry={load} message={error || 'Product not found.'} />
      </div>
    )
  }

  const wishlisted = isWishlisted(product.id)
  // Fake Store API returns a single image; we simulate a small gallery for UX
  const gallery = [product.image, product.image, product.image]

  const handleAddToCart = () => {
    addToCart(product, quantity)
    showToast(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart`, 'success')
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate('/checkout')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary">
          {getCategoryLabel(product.category)}
        </Link>
        <span>/</span>
        <span className="text-darktext line-clamp-1">{product.title}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 animate-fadeIn">
        {/* Gallery */}
        <div>
          <div className="bg-cardbg rounded-2xl h-80 md:h-96 flex items-center justify-center p-8 mb-4 shadow-soft">
            <img src={gallery[activeImage]} alt={product.title} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex gap-3">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center p-2 bg-white transition-colors ${
                  activeImage === i ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <img src={img} alt={`${product.title} ${i + 1}`} className="max-h-full max-w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wide">
            {getCategoryLabel(product.category)}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-darktext mt-2 mb-3">{product.title}</h1>
          <StarRating rating={product.rating?.rate || 0} count={product.rating?.count || 0} size={18} />

          <div className="flex items-center gap-3 mt-5 mb-6">
            <span className="text-3xl font-extrabold text-darktext">{formatPrice(product.price)}</span>
            <span className="text-lg text-gray-400 line-through">{formatPrice(product.price * 1.3)}</span>
            <span className="bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full">-23%</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-8">
            <span className="font-semibold text-darktext text-sm">Quantity:</span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(q + 1, 20))}
              onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="dark" size="lg" fullWidth onClick={handleBuyNow}>
              Buy Now
            </Button>
            <button
              onClick={() => {
                toggleWishlist(product)
                showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', wishlisted ? 'info' : 'success')
              }}
              className="w-14 h-14 shrink-0 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-red-400 transition-colors"
              aria-label="Toggle wishlist"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlisted ? '#EF4444' : 'none'} stroke={wishlisted ? '#EF4444' : '#6B7280'} strokeWidth="2">
                <path d="M12 21s-6.7-4.35-9.3-8.2C.8 9.6 1.7 6 5 4.9c2-.65 3.9.2 5 1.9 1.1-1.7 3-2.55 5-1.9 3.3 1.1 4.2 4.7 2.3 7.9C18.7 16.65 12 21 12 21z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>🚚</span> Free shipping over $100
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>↩️</span> 30-day easy returns
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>🔒</span> Secure checkout
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>✅</span> Quality guaranteed
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-darktext mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
