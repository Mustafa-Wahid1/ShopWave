import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import CategoryFilter from '../components/CategoryFilter'
import SortDropdown, { sortProducts } from '../components/SortDropdown'
import Pagination from '../components/Pagination'
import useProducts from '../hooks/useProducts'
import { getCategoryLabel } from '../utils/formatters'

const CATEGORIES = ['all', "men's clothing", "women's clothing", 'electronics', 'jewelery']
const PAGE_SIZE = 8

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'
  const [sortBy, setSortBy] = useState('newest')
  const [page, setPage] = useState(1)

  const { products, loading, error, refetch } = useProducts()

  useEffect(() => setPage(1), [activeCategory, sortBy])

  const filtered = useMemo(() => {
    const base =
      activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory)
    return sortProducts(base, sortBy)
  }, [products, activeCategory, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleCategoryChange = (cat) => {
    setSearchParams(cat === 'all' ? {} : { category: cat })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-darktext mb-1">
          {activeCategory === 'all' ? 'All Products' : getCategoryLabel(activeCategory)}
        </h1>
        <p className="text-sm text-gray-500">{filtered.length} products found</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <CategoryFilter categories={CATEGORIES} active={activeCategory} onChange={handleCategoryChange} />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {loading && <ProductGridSkeleton count={8} />}
      {!loading && error && <ErrorState onRetry={refetch} message={error} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          icon={<span className="text-4xl">📦</span>}
          title="No products found"
          message="Try a different category or check back later."
          actionLabel="Browse All Products"
          actionTo="/products"
        />
      )}
      {!loading && !error && filtered.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {paginated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
