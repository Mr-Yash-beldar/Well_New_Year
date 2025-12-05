import axios from 'axios'

/**
 * Check if the backend server is reachable
 * This is used on app initialization to handle cold starts (e.g., Render free tier)
 * Render's free tier can take 50+ seconds to wake up from sleep
 */
export const checkServerHealth = async (maxRetries = 5, retryDelay = 5000) => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  console.log('🔍 Checking server health...')

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}...`)

      // Try to reach any endpoint - using a simple health check or auth endpoint
      const response = await axios.get(`${baseURL}/auth/me`, {
        timeout: 15000, // 15 second timeout per attempt
        validateStatus: (status) => {
          // Consider any response < 500 as successful connection (server is up)
          // 401 means server is up but not authenticated (which is fine)
          return status < 500
        },
      })

      // Server is reachable
      console.log('✅ Server is reachable!')
      return { success: true, attempt }
    } catch (error) {
      console.log(`❌ Attempt ${attempt}/${maxRetries} failed:`, error.message)

      // If this is the last attempt, return failure
      if (attempt === maxRetries) {
        console.error('💥 Server health check failed after all retries')
        return {
          success: false,
          error: error.message,
          isNetworkError: !error.response,
        }
      }

      // Wait before retrying (with exponential backoff for Render cold starts)
      const delay = retryDelay * attempt
      console.log(`⏳ Waiting ${delay / 1000}s before retry... (Render may be waking up)`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  return { success: false, error: 'Max retries reached' }
}
