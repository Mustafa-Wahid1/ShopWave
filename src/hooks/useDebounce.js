import { useEffect, useState } from 'react'

// Returns a debounced copy of `value` that only updates after `delay` ms
// of inactivity. Used to keep the search bar from firing on every keystroke.
export default function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
