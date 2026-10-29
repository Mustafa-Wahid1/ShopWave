import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

// Lightweight toast/notification system used across the app for
// "added to cart", "removed from wishlist", form errors, etc.
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message, type = 'success') => {
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => removeToast(id), 3000)
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 w-[90vw] max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-slideDown rounded-xl px-4 py-3 shadow-softer text-sm font-medium text-white flex items-center gap-2 ${
              t.type === 'error'
                ? 'bg-red-500'
                : t.type === 'info'
                ? 'bg-primary'
                : 'bg-emerald-500'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
