import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import storage from '../utils/storage'

const CartContext = createContext(null)

const CART_KEY = 'cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => storage.get(CART_KEY, []))
  const [coupon, setCoupon] = useState(() => storage.get('coupon', null))

  // Persist to localStorage whenever the cart changes
  useEffect(() => {
    storage.set(CART_KEY, items)
  }, [items])

  useEffect(() => {
    storage.set('coupon', coupon)
  }, [coupon])

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const increaseQuantity = (id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    )
  }

  const decreaseQuantity = (id) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    )
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const clearCart = () => {
    setItems([])
    setCoupon(null)
  }

  const applyCoupon = (code) => {
    const validCoupons = {
      SAVE10: 0.1,
      SAVE20: 0.2,
      WELCOME15: 0.15,
    }
    const normalized = code.trim().toUpperCase()
    if (validCoupons[normalized]) {
      setCoupon({ code: normalized, discount: validCoupons[normalized] })
      return { success: true, discount: validCoupons[normalized] }
    }
    return { success: false }
  }

  const removeCoupon = () => setCoupon(null)

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  )

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  )

  const shippingCost = useMemo(() => {
    if (items.length === 0) return 0
    return subtotal > 100 ? 0 : 9.99
  }, [subtotal, items.length])

  const discountAmount = useMemo(
    () => (coupon ? subtotal * coupon.discount : 0),
    [coupon, subtotal]
  )

  const grandTotal = useMemo(
    () => Math.max(subtotal - discountAmount + shippingCost, 0),
    [subtotal, discountAmount, shippingCost]
  )

  const value = {
    items,
    itemCount,
    subtotal,
    shippingCost,
    discountAmount,
    grandTotal,
    coupon,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
