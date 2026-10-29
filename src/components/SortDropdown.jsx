export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name-asc', label: 'Name: A–Z' },
]

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-medium text-darktext bg-white hover:border-primary focus:border-primary outline-none cursor-pointer transition-colors"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

// Pure sorting helper reused by pages
export function sortProducts(products, sortBy) {
  const arr = [...products]
  switch (sortBy) {
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price)
    case 'rating':
      return arr.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    case 'name-asc':
      return arr.sort((a, b) => a.title.localeCompare(b.title))
    case 'newest':
    default:
      return arr.sort((a, b) => b.id - a.id)
  }
}
