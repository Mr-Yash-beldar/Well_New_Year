import { Link } from 'react-router-dom'
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const NotFound404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-64 h-64 mx-auto text-gray-300 dark:text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary inline-flex items-center gap-2">
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
          <Link to="/articles" className="btn btn-outline inline-flex items-center gap-2">
            <MagnifyingGlassIcon className="w-5 h-5" />
            Browse Articles
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-4">Or try one of these pages:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/articles" className="link">Articles</Link>
            <span className="text-gray-300">•</span>
            <Link to="/book" className="link">Book Consultation</Link>
            <span className="text-gray-300">•</span>
            <Link to="/dashboard" className="link">Dashboard</Link>
            <span className="text-gray-300">•</span>
            <Link to="/profile" className="link">Profile</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound404
