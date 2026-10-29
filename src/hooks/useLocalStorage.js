import { useEffect, useState } from 'react'
import storage from '../utils/storage'

// Generic state hook that mirrors its value into localStorage automatically.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => storage.get(key, initialValue))

  useEffect(() => {
    storage.set(key, value)
  }, [key, value])

  return [value, setValue]
}
