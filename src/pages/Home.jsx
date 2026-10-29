import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import useProducts from '../hooks/useProducts'
import { getCategoryLabel } from '../utils/formatters'

const CATEGORY_LIST = ["men's clothing", "women's clothing", 'electronics', 'jewelery']
const CATEGORY_ICONS = {
  "men's clothing": '👔',
  "women's clothing": '👗',
  electronics: '💻',
  jewelery: '💍',
}

export default function Home() {
  const { products, loading, error, refetch } = useProducts()

  const featured = useMemo(
    () => [...products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)).slice(0, 8),
    [products]
  )

  const latest = useMemo(
    () => [...products].sort((a, b) => b.id - a.id).slice(0, 8),
    [products]
  )

  return (
    <div className="pb-16">
      <HeroBanner />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-14">
        <h2 className="text-2xl font-bold text-darktext mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORY_LIST.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="group bg-cardbg rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{CATEGORY_ICONS[cat]}</span>
              <span className="font-semibold text-darktext text-sm">{getCategoryLabel(cat)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-darktext">Featured Products</h2>
          <Link to="/products" className="text-primary text-sm font-semibold hover:underline">View All →</Link>
        </div>
        {loading && <ProductGridSkeleton count={8} />}
        {!loading && error && <ErrorState onRetry={refetch} message={error} />}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Latest products */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-darktext">Latest Arrivals</h2>
          <Link to="/products" className="text-primary text-sm font-semibold hover:underline">View All →</Link>
        </div>
        {loading && <ProductGridSkeleton count={8} />}
        {!loading && error && <ErrorState onRetry={refetch} message={error} />}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {latest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Promo strip */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
            { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
            { icon: '🔒', title: 'Secure Checkout', desc: '100% protected payments' },
          ].map((item) => (
            <div key={item.title} className="bg-cardbg rounded-2xl p-6 flex items-center gap-4 shadow-soft">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-darktext text-sm">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
