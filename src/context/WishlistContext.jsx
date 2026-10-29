import { createContext, useContext, useEffect, useState } from 'react'
import storage from '../utils/storage'

const WishlistContext = createContext(null)
const WISHLIST_KEY = 'wishlist'

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => storage.get(WISHLIST_KEY, []))

  useEffect(() => {
    storage.set(WISHLIST_KEY, items)
  }, [items])

  const isWishlisted = (id) => items.some((i) => i.id === id)

  const toggleWishlist = (product) => {
    setItems((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    )
  }

  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const clearWishlist = () => setItems([])

  const value = {
    items,
    count: items.length,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}
