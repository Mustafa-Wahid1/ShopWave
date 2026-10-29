import { getCategoryLabel } from '../utils/formatters'

// Horizontal pill-style filter used on the Products/Category page
export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
      {categories.map((cat) => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
              isActive
                ? 'bg-primary text-white border-primary shadow-soft'
                : 'bg-white text-darktext border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        )
      })}
    </div>
  )
}
