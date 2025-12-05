import { Link } from 'react-router-dom'
import { HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

const Error500 = () => {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="text-center animate-fade-in max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-600">500</h1>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Internal Server Error</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            We're sorry, but something went wrong on our end. Our team has been notified and is
            working to fix the issue.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-64 h-64 mx-auto text-gray-300 dark:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* What you can do */}
        <div className="card mb-8 text-left">
          <h3 className="text-xl font-semibold mb-4">What you can do:</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Try refreshing the page</li>
            <li>• Check if the backend server is running (Port 5000)</li>
            <li>• Verify your internet connection</li>
            <li>• Make sure the API URL is correctly configured</li>
            <li>• Wait a few minutes and try again</li>
            <li>• Contact support if the problem persists</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button onClick={handleRetry} className="btn btn-primary inline-flex items-center gap-2">
            <ArrowPathIcon className="w-5 h-5" />
            Retry
          </button>
          <Link to="/" className="btn btn-outline inline-flex items-center gap-2">
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Support */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            If this issue persists, please contact our support team at{' '}
            <a href="mailto:support@wellnewyear.com" className="font-medium underline">
              support@wellnewyear.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Error500
