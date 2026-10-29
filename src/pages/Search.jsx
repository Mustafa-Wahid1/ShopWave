import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import useProducts from '../hooks/useProducts'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { products, loading, error, refetch } = useProducts()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }, [products, query])

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-darktext mb-1">
        Search results for "{query}"
      </h1>
      <p className="text-sm text-gray-500 mb-8">{results.length} products found</p>

      {loading && <ProductGridSkeleton count={8} />}
      {!loading && error && <ErrorState onRetry={refetch} message={error} />}
      {!loading && !error && results.length === 0 && (
        <EmptyState
          icon={<span className="text-4xl">🔍</span>}
          title="No matches found"
          message="Try searching with different keywords or browse our categories instead."
          actionLabel="Browse Products"
          actionTo="/products"
        />
      )}
      {!loading && !error && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
