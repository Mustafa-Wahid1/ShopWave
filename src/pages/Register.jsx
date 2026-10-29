import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { validateFields, isRequired, isValidEmail, isMinLength, passwordsMatch } from '../utils/validators'

export default function Register() {
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateFields(form, {
      name: [[isRequired, 'Full name is required']],
      email: [
        [isRequired, 'Email is required'],
        [isValidEmail, 'Enter a valid email address'],
      ],
      password: [
        [isRequired, 'Password is required'],
        [(v) => isMinLength(v, 6), 'Password must be at least 6 characters'],
      ],
      confirmPassword: [
        [isRequired, 'Please confirm your password'],
        [(v) => passwordsMatch(v, form.password), 'Passwords do not match'],
      ],
    })
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    const result = register(form)
    setSubmitting(false)
    if (result.success) {
      showToast('Account created successfully!', 'success')
      navigate('/')
    } else {
      showToast(result.message, 'error')
    }
  }

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
  ]

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-darktext mb-2">Create Your Account</h1>
        <p className="text-gray-500 text-sm">Join ShopWave and start saving today</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-cardbg rounded-2xl p-6 md:p-8 shadow-soft space-y-5" noValidate>
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-darktext mb-1.5">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`w-full px-4 py-2.5 rounded-xl border-2 bg-white outline-none text-sm transition-colors ${
                errors[field.name] ? 'border-red-400' : 'border-gray-200 focus:border-primary'
              }`}
            />
            {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>}
          </div>
        ))}

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
          {submitting ? 'Creating account...' : 'Create Account'}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
