import { useEffect, useState, useCallback } from 'react'
import productService from '../services/productService'

/**
 * Fetches and caches the full product list once, exposing loading and
 * error states so pages can render skeletons / error UI consistently.
 */
export default function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Failed to load products.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}
