// Simple +/- quantity stepper used on Product Details and Cart pages
export default function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1, max = 99, size = 'md' }) {
  const sizeClasses = size === 'sm' ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-base'

  return (
    <div className="inline-flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`${sizeClasses} flex items-center justify-center font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={`${sizeClasses} flex items-center justify-center font-semibold text-darktext border-x-2 border-gray-200`}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`${sizeClasses} flex items-center justify-center font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
