import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import InitialLoader from './components/InitialLoader'
import { checkServerHealth } from './utils/serverHealth'

// Pages
import Home from './pages/Home'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Book from './pages/Book'
import Dashboard from './pages/Dashboard'
import Goals from './pages/Goals'
import NotFound404 from './pages/NotFound404'
import Error500 from './pages/Error500'
import Error505 from './pages/Error505'

function App() {
  const [isCheckingServer, setIsCheckingServer] = useState(true)
  const [serverReachable, setServerReachable] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const initializeApp = async () => {
      // Check if server is reachable (important for cold starts on Render, etc.)
      const healthCheck = await checkServerHealth(3, 3000)

      if (healthCheck.success) {
        setServerReachable(true)
        setIsCheckingServer(false)
      } else {
        // Server is not reachable, redirect to error page
        setIsCheckingServer(false)
        setServerReachable(false)
        navigate('/500', { replace: true })
      }
    }

    initializeApp()
  }, [navigate])

  // Show initial loader while checking server
  if (isCheckingServer) {
    return <InitialLoader />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <Book />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <ProtectedRoute>
                <Goals />
              </ProtectedRoute>
            }
          />

          {/* Error Pages */}
          <Route path="/500" element={<Error500 />} />
          <Route path="/505" element={<Error505 />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
