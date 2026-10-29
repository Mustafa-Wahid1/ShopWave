import { Link } from 'react-router-dom'
import Button from './Button'

// Generic empty-state block reused by Cart, Wishlist, and Search pages
export default function EmptyState({ icon, title, message, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 animate-fadeIn">
      <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-darktext mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mb-6">{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo}>
          <Button variant="primary">{actionLabel}</Button>
        </Link>
      )}
    </div>
  )
}
