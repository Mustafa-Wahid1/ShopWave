// Format a number as USD currency, e.g. 49.9 -> "$49.90"
export const formatPrice = (value) => {
  const num = Number(value) || 0
  return `$${num.toFixed(2)}`
}

// Turn "men's clothing" into "Men's Clothing"
export const toTitleCase = (str = '') =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

// Truncate long text with an ellipsis
export const truncate = (str = '', max = 80) =>
  str.length > max ? `${str.slice(0, max).trim()}…` : str

// Human friendly category labels used across the UI
export const categoryLabels = {
  all: 'All',
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
  electronics: 'Electronics',
  jewelery: 'Jewelry',
}

export const getCategoryLabel = (cat) =>
  categoryLabels[cat] || toTitleCase(cat || '')
