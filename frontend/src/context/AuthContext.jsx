import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api/axios'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error('Error parsing user data:', error)
          localStorage.removeItem('user')
          localStorage.removeItem('token')
        }
      }
      setLoading(false)
    }

    loadUser()
  }, [])

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/auth/signup', { name, email, password })
      const { token, user: userData } = response.data

      // Store token and user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)

      toast.success('Account created successfully! Welcome to WellNewYear!')
      navigate('/dashboard')

      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user: userData } = response.data

      // Store token and user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)

      toast.success(`Welcome back, ${userData.name}!`)
      navigate('/dashboard')

      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    toast.info('Logged out successfully')
    navigate('/')
  }

  // Update user profile
  const updateProfile = async (name, email) => {
    try {
      const response = await api.put('/auth/profile', { name, email })
      const { user: userData } = response.data

      // Update stored user
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)

      toast.success('Profile updated successfully!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Get current user from server (for verification)
  const getCurrentUser = async () => {
    try {
      const response = await api.get('/auth/me')
      const { user: userData } = response.data

      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)

      return { success: true, user: userData }
    } catch (error) {
      logout()
      return { success: false }
    }
  }

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateProfile,
    getCurrentUser,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
