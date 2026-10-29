import { useRef } from 'react'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark shadow-soft hover:shadow-hover',
  secondary: 'bg-secondary text-white hover:bg-blue-600 shadow-soft',
  outline: 'bg-white text-primary border-2 border-primary hover:bg-blue-50',
  ghost: 'bg-transparent text-darktext hover:bg-gray-100',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  dark: 'bg-darktext text-white hover:bg-gray-800',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

/**
 * Shared button with a built-in material-style ripple animation on click.
 * Keeps every CTA in the app visually + behaviorally consistent.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  ...props
}) {
  const btnRef = useRef(null)

  const handleClick = (e) => {
    const btn = btnRef.current
    if (btn) {
      const circle = document.createElement('span')
      const diameter = Math.max(btn.clientWidth, btn.clientHeight)
      const rect = btn.getBoundingClientRect()
      circle.style.width = circle.style.height = `${diameter}px`
      circle.style.left = `${e.clientX - rect.left - diameter / 2}px`
      circle.style.top = `${e.clientY - rect.top - diameter / 2}px`
      circle.classList.add('ripple-span')
      btn.appendChild(circle)
      setTimeout(() => circle.remove(), 600)
    }
    onClick?.(e)
  }

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`btn-ripple rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
        variants[variant]
      } ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
