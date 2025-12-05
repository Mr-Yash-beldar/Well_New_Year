import axios from 'axios'
import { toast } from 'react-toastify'

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - attach token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          if (window.location.pathname !== '/login') {
            toast.error('Session expired. Please login again.')
            window.location.href = '/login'
          }
          break

        case 403:
          toast.error(data.message || 'You do not have permission to perform this action')
          break

        case 404:
          toast.error(data.message || 'Resource not found')
          break

        case 500:
          toast.error('Server error. Please try again later.')
          window.location.href = '/500'
          break

        case 505:
          toast.error('HTTP Version Not Supported')
          window.location.href = '/505'
          break

        default:
          toast.error(data.message || 'An error occurred')
      }
    } else if (error.request) {
      // Request was made but no response received (server not reachable)
      console.error('Server connection failed:', error.message)

      // Only show error and redirect if not on error page already
      if (
        !window.location.pathname.includes('/500') &&
        !window.location.pathname.includes('/505')
      ) {
        toast.error('Cannot connect to server. Please check if the server is running.')
        window.location.href = '/500'
      }
    } else {
      // Something else happened
      toast.error('An unexpected error occurred')
    }

    return Promise.reject(error)
  }
)

export default api
