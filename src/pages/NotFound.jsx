import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center animate-fadeIn">
      <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-darktext mb-3">Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">Back to Home</Button>
      </Link>
    </div>
  )
}
