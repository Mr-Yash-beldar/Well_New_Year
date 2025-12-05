import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">WellNewYear</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="link hover:text-primary-600">
              Home
            </Link>
            <Link to="/articles" className="link hover:text-primary-600">
              Articles
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="link hover:text-primary-600">
                  Dashboard
                </Link>
                <Link to="/goals" className="link hover:text-primary-600">
                  Goals
                </Link>
                <Link to="/book" className="link hover:text-primary-600">
                  Book
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 link">
                  <UserCircleIcon className="w-6 h-6" />
                  <span>{user?.name}</span>
                </Link>
                <button onClick={logout} className="btn btn-outline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-slide-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={closeMobileMenu} className="link hover:text-primary-600">
                Home
              </Link>
              <Link
                to="/articles"
                onClick={closeMobileMenu}
                className="link hover:text-primary-600"
              >
                Articles
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className="link hover:text-primary-600"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/goals"
                    onClick={closeMobileMenu}
                    className="link hover:text-primary-600"
                  >
                    Goals
                  </Link>
                  <Link
                    to="/book"
                    onClick={closeMobileMenu}
                    className="link hover:text-primary-600"
                  >
                    Book Consultation
                  </Link>
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="link hover:text-primary-600"
                  >
                    Profile
                  </Link>
                </>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={toggleDarkMode}
                  className="w-full text-left link hover:text-primary-600 flex items-center gap-2"
                >
                  {isDarkMode ? (
                    <>
                      <SunIcon className="w-5 h-5" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-5 h-5" />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout()
                    closeMobileMenu()
                  }}
                  className="btn btn-outline w-full"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={closeMobileMenu} className="btn btn-secondary w-full">
                    Login
                  </Link>
                  <Link to="/signup" onClick={closeMobileMenu} className="btn btn-primary w-full">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
