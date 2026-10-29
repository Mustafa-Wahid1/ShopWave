import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import QuantitySelector from '../components/QuantitySelector'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import { formatPrice, getCategoryLabel } from '../utils/formatters'

export default function Cart() {
  const {
    items,
    subtotal,
    shippingCost,
    discountAmount,
    grandTotal,
    coupon,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (!couponCode.trim()) return
    const result = applyCoupon(couponCode)
    if (result.success) {
      showToast(`Coupon applied! ${(result.discount * 100).toFixed(0)}% off`, 'success')
      setCouponCode('')
    } else {
      showToast('Invalid coupon code', 'error')
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <EmptyState
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          }
          title="Your cart is empty"
          message="Looks like you haven't added anything yet. Let's fix that."
          actionLabel="Start Shopping"
          actionTo="/products"
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-darktext">Shopping Cart ({items.length})</h1>
        <button
          onClick={() => {
            clearCart()
            showToast('Cart cleared', 'info')
          }}
          className="text-sm font-semibold text-red-500 hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-cardbg rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center shadow-soft animate-fadeIn">
              <Link to={`/product/${item.id}`} className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-2 shrink-0">
                <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
              </Link>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <span className="text-xs font-medium text-primary uppercase">{getCategoryLabel(item.category)}</span>
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-darktext line-clamp-1 hover:text-primary transition-colors">{item.title}</h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1">{formatPrice(item.price)} each</p>
              </div>
              <QuantitySelector
                quantity={item.quantity}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                size="sm"
              />
              <div className="text-right min-w-[80px]">
                <p className="font-bold text-darktext">{formatPrice(item.price * item.quantity)}</p>
              </div>
              <button
                onClick={() => {
                  removeFromCart(item.id)
                  showToast('Item removed from cart', 'info')
                }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove item"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-cardbg rounded-2xl p-6 shadow-soft h-fit sticky top-24">
          <h2 className="text-lg font-bold text-darktext mb-5">Order Summary</h2>

          <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-5">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-primary"
            />
            <Button type="submit" variant="outline" size="sm">Apply</Button>
          </form>
          {coupon && (
            <div className="flex items-center justify-between bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-2 rounded-lg mb-5">
              <span>"{coupon.code}" applied ({(coupon.discount * 100).toFixed(0)}% off)</span>
              <button onClick={removeCoupon} className="underline">Remove</button>
            </div>
          )}
          <p className="text-xs text-gray-400 mb-5">Try: SAVE10, SAVE20, or WELCOME15</p>

          <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span><span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-darktext text-base border-t border-gray-200 pt-3">
              <span>Grand Total</span><span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <Button variant="primary" size="lg" fullWidth className="mt-6" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </Button>
          <Link to="/products" className="block text-center text-sm text-primary font-semibold mt-4 hover:underline">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
