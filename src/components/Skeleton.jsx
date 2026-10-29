// Skeleton placeholder for a single product card, shown while data loads
export function ProductCardSkeleton() {
  return (
    <div className="bg-cardbg rounded-2xl p-4 shadow-soft">
      <div className="skeleton w-full h-44 rounded-xl mb-4" />
      <div className="skeleton h-3 w-1/3 rounded mb-2" />
      <div className="skeleton h-4 w-4/5 rounded mb-2" />
      <div className="skeleton h-4 w-2/5 rounded mb-3" />
      <div className="skeleton h-9 w-full rounded-xl" />
    </div>
  )
}

// Renders a responsive grid of card skeletons
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Skeleton for the product details page
export function ProductDetailsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-10 animate-fadeIn">
      <div className="skeleton w-full h-96 rounded-2xl" />
      <div className="space-y-4">
        <div className="skeleton h-4 w-1/4 rounded" />
        <div className="skeleton h-8 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="skeleton h-6 w-1/4 rounded" />
        <div className="skeleton h-24 w-full rounded" />
        <div className="skeleton h-12 w-1/2 rounded-xl" />
      </div>
    </div>
  )
}
