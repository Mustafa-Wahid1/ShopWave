import axios from 'axios'

// Base Axios instance pointed at the Fake Store API
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Log & normalize errors in one place so components can rely on a
// consistent error shape ({ message }) regardless of failure cause.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong while talking to the server.'
    return Promise.reject({ message, original: error })
  }
)

export default api
