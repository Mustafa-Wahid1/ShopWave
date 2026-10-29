// Renders a 5-star rating display with partial-fill support and review count
export default function StarRating({ rating = 0, count = 0, size = 16, showCount = true }) {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex">
        {stars.map((s) => {
          const fillPercent = Math.max(0, Math.min(1, rating - (s - 1))) * 100
          return (
            <span key={s} className="relative inline-block" style={{ width: size, height: size }}>
              <svg viewBox="0 0 20 20" width={size} height={size} className="absolute inset-0 text-gray-300 fill-current">
                <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
              </svg>
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                <svg viewBox="0 0 20 20" width={size} height={size} className="text-yellow-400 fill-current">
                  <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
                </svg>
              </span>
            </span>
          )
        })}
      </div>
      {showCount && (
        <span className="text-xs text-gray-500">
          {rating.toFixed(1)} {count ? `(${count})` : ''}
        </span>
      )}
    </div>
  )
}
