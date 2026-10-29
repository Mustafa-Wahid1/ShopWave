import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { validateFields, isRequired, isValidEmail } from '../utils/validators'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateFields(
      { email },
      {
        email: [
          [isRequired, 'Email is required'],
          [isValidEmail, 'Enter a valid email address'],
        ],
      }
    )
    if (validationErrors.email) {
      setError(validationErrors.email)
      setResult(null)
      return
    }
    setError('')
    setSubmitting(true)
    const res = resetPassword(email)
    setSubmitting(false)
    setResult(res)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-darktext mb-2">Forgot Password?</h1>
        <p className="text-gray-500 text-sm">
          Enter your email and we'll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-cardbg rounded-2xl p-6 md:p-8 shadow-soft space-y-5" noValidate>
        <div>
          <label className="block text-sm font-semibold text-darktext mb-1.5">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`w-full px-4 py-2.5 rounded-xl border-2 bg-white outline-none text-sm transition-colors ${
              error ? 'border-red-400' : 'border-gray-200 focus:border-primary'
            }`}
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>

        {result && (
          <div
            className={`text-sm rounded-xl px-4 py-3 ${
              result.success ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
            }`}
          >
            {result.message}
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Reset Instructions'}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Remembered your password?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  )
}
