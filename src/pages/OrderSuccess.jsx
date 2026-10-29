import { Link, useLocation, Navigate } from 'react-router-dom'
import Button from '../components/Button'
import { formatPrice } from '../utils/formatters'

export default function OrderSuccess() {
  const location = useLocation()
  const { orderId, total, name } = location.state || {}

  // Guard against directly visiting this route without placing an order
  if (!orderId) return <Navigate to="/" replace />

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center animate-scaleIn">
      <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-darktext mb-3">Order Placed Successfully!</h1>
      <p className="text-gray-500 mb-8">
        {name ? `Thanks, ${name}! ` : 'Thanks! '}
        Your order has been confirmed and will be shipped soon.
      </p>

      <div className="bg-cardbg rounded-2xl p-6 shadow-soft mb-8 text-left space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Order ID</span>
          <span className="font-semibold text-darktext">{orderId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Paid</span>
          <span className="font-semibold text-darktext">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estimated Delivery</span>
          <span className="font-semibold text-darktext">3–5 Business Days</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/products">
          <Button variant="primary" size="lg">Continue Shopping</Button>
        </Link>
        <Link to="/">
          <Button variant="outline" size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
