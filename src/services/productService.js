import api from './api'

/**
 * All product-related network calls live here, isolated from components
 * so the rest of the app never talks to Axios or the Fake Store API directly.
 */
export const productService = {
  // Fetch every product
  getAll: async () => {
    const { data } = await api.get('/products')
    return data
  },

  // Fetch a single product by id
  getById: async (id) => {
    const { data } = await api.get(`/products/${id}`)
    return data
  },

  // Fetch the list of available categories
  getCategories: async () => {
    const { data } = await api.get('/products/categories')
    return data
  },

  // Fetch products belonging to one category
  getByCategory: async (category) => {
    const { data } = await api.get(
      `/products/category/${encodeURIComponent(category)}`
    )
    return data
  },

  // Fetch a limited number of products (used for featured sections)
  getLimited: async (limit = 8) => {
    const { data } = await api.get(`/products?limit=${limit}`)
    return data
  },
}

export default productService
