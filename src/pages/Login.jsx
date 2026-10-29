import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { validateFields, isRequired, isValidEmail, isMinLength } from '../utils/validators'

export default function Login() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateFields(form, {
      email: [
        [isRequired, 'Email is required'],
        [isValidEmail, 'Enter a valid email address'],
      ],
      password: [
        [isRequired, 'Password is required'],
        [(v) => isMinLength(v, 6), 'Password must be at least 6 characters'],
      ],
    })
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    const result = login(form)
    setSubmitting(false)
    if (result.success) {
      showToast('Welcome back!', 'success')
      navigate(location.state?.from || '/')
    } else {
      showToast(result.message, 'error')
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-darktext mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-sm">Login to continue shopping with ShopWave</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-cardbg rounded-2xl p-6 md:p-8 shadow-soft space-y-5" noValidate>
        <div>
          <label className="block text-sm font-semibold text-darktext mb-1.5">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full px-4 py-2.5 rounded-xl border-2 bg-white outline-none text-sm transition-colors ${
              errors.email ? 'border-red-400' : 'border-gray-200 focus:border-primary'
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-darktext mb-1.5">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full px-4 py-2.5 rounded-xl border-2 bg-white outline-none text-sm transition-colors ${
              errors.password ? 'border-red-400' : 'border-gray-200 focus:border-primary'
            }`}
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-primary font-medium hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
          {submitting ? 'Logging in...' : 'Login'}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
