import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import {
  validateFields,
  isRequired,
  isValidEmail,
  isValidPhone,
  isValidZip,
  isValidCardNumber,
  isValidExpiry,
  isValidCVV,
} from '../utils/validators'
import { formatPrice } from '../utils/formatters'

const STEPS = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
  const { items, subtotal, shippingCost, discountAmount, grandTotal, clearCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [errors, setErrors] = useState({})

  const [shipping, setShipping] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', zip: '',
  })
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <EmptyState
          icon={<span className="text-4xl">🛒</span>}
          title="Nothing to checkout"
          message="Your cart is empty. Add some products before checking out."
          actionLabel="Browse Products"
          actionTo="/products"
        />
      </div>
    )
  }

  const handleShippingChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value })
  const handleCardChange = (e) => setCard({ ...card, [e.target.name]: e.target.value })

  const validateShipping = () => {
    const errs = validateFields(shipping, {
      fullName: [[isRequired, 'Full name is required']],
      email: [[isRequired, 'Email is required'], [isValidEmail, 'Enter a valid email']],
      phone: [[isRequired, 'Phone is required'], [isValidPhone, 'Enter a valid phone number']],
      address: [[isRequired, 'Address is required']],
      city: [[isRequired, 'City is required']],
      state: [[isRequired, 'State is required']],
      zip: [[isRequired, 'ZIP code is required'], [isValidZip, 'Enter a valid ZIP code']],
    })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validatePayment = () => {
    if (paymentMethod !== 'card') return true
    const errs = validateFields(card, {
      number: [[isRequired, 'Card number is required'], [isValidCardNumber, 'Enter a valid card number']],
      name: [[isRequired, 'Name on card is required']],
      expiry: [[isRequired, 'Expiry is required'], [isValidExpiry, 'Use MM/YY format']],
      cvv: [[isRequired, 'CVV is required'], [isValidCVV, 'Enter a valid CVV']],
    })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (step === 0 && !validateShipping()) return
    if (step === 1 && !validatePayment()) return
    setErrors({})
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const handlePlaceOrder = () => {
    const orderId = `SW-${Date.now().toString().slice(-8)}`
    clearCart()
    showToast('Order placed successfully!', 'success')
    navigate('/order-success', { state: { orderId, total: grandTotal, name: shipping.fullName } })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-darktext mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  i <= step ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i <= step ? 'text-darktext' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="bg-cardbg rounded-2xl p-6 shadow-soft space-y-4 animate-fadeIn">
              <h2 className="font-bold text-darktext text-lg mb-2">Shipping Address</h2>
              <Field label="Full Name" name="fullName" value={shipping.fullName} onChange={handleShippingChange} error={errors.fullName} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" name="email" type="email" value={shipping.email} onChange={handleShippingChange} error={errors.email} />
                <Field label="Phone" name="phone" value={shipping.phone} onChange={handleShippingChange} error={errors.phone} />
              </div>
              <Field label="Street Address" name="address" value={shipping.address} onChange={handleShippingChange} error={errors.address} />
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="City" name="city" value={shipping.city} onChange={handleShippingChange} error={errors.city} />
                <Field label="State" name="state" value={shipping.state} onChange={handleShippingChange} error={errors.state} />
                <Field label="ZIP Code" name="zip" value={shipping.zip} onChange={handleShippingChange} error={errors.zip} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="bg-cardbg rounded-2xl p-6 shadow-soft space-y-5 animate-fadeIn">
              <h2 className="font-bold text-darktext text-lg mb-2">Payment Method</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-colors ${
                      paymentMethod === method.id ? 'border-primary bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{method.icon}</div>
                    <p className="text-xs font-semibold text-darktext">{method.label}</p>
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  <Field label="Card Number" name="number" value={card.number} onChange={handleCardChange} error={errors.number} placeholder="1234 5678 9012 3456" />
                  <Field label="Name on Card" name="name" value={card.name} onChange={handleCardChange} error={errors.name} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry (MM/YY)" name="expiry" value={card.expiry} onChange={handleCardChange} error={errors.expiry} placeholder="12/28" />
                    <Field label="CVV" name="cvv" value={card.cvv} onChange={handleCardChange} error={errors.cvv} placeholder="123" />
                  </div>
                </div>
              )}
              {paymentMethod === 'paypal' && (
                <p className="text-sm text-gray-500 bg-blue-50 rounded-xl p-4">You'll be redirected to PayPal to complete your payment after reviewing your order.</p>
              )}
              {paymentMethod === 'cod' && (
                <p className="text-sm text-gray-500 bg-blue-50 rounded-xl p-4">Pay with cash when your order is delivered to your address.</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="bg-cardbg rounded-2xl p-6 shadow-soft space-y-6 animate-fadeIn">
              <h2 className="font-bold text-darktext text-lg">Review Your Order</h2>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Shipping To</h3>
                <p className="text-darktext text-sm">{shipping.fullName}, {shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                <p className="text-darktext text-sm">{shipping.email} · {shipping.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Payment Method</h3>
                <p className="text-darktext text-sm capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Items ({items.length})</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-darktext line-clamp-1 max-w-[70%]">{item.title} × {item.quantity}</span>
                      <span className="font-semibold text-darktext">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button variant="primary" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button variant="primary" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="bg-cardbg rounded-2xl p-6 shadow-soft h-fit sticky top-24">
          <h2 className="font-bold text-darktext mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm max-h-48 overflow-y-auto mb-4 pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-600">
                <span className="line-clamp-1 max-w-[70%]">{item.title} × {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm border-t border-gray-200 pt-4">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span></div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-{formatPrice(discountAmount)}</span></div>
            )}
            <div className="flex justify-between font-bold text-darktext text-base border-t border-gray-200 pt-3">
              <span>Total</span><span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
          <Link to="/cart" className="block text-center text-sm text-primary font-semibold mt-4 hover:underline">
            ← Edit Cart
          </Link>
        </div>
      </div>
    </div>
  )
}

function Field({ label, name, value, onChange, error, type = 'text', placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-darktext mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border-2 bg-white outline-none text-sm transition-colors ${
          error ? 'border-red-400' : 'border-gray-200 focus:border-primary'
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
