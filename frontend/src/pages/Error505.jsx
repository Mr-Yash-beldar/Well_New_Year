import { Link } from 'react-router-dom'
import { HomeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Error505 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="text-center animate-fade-in max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-600">505</h1>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            HTTP Version Not Supported
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            The server does not support the HTTP protocol version used in the request.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <ExclamationTriangleIcon className="w-64 h-64 mx-auto text-gray-300 dark:text-gray-700" />
        </div>

        {/* Technical Details */}
        <div className="card mb-8 text-left">
          <h3 className="text-xl font-semibold mb-4">What does this mean?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This error occurs when the HTTP protocol version used in your request 
            is not supported by our server. This is a rare error that typically happens due to:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• An outdated browser or application</li>
            <li>• Network proxy or firewall issues</li>
            <li>• Misconfigured client software</li>
          </ul>
        </div>

        {/* Solutions */}
        <div className="card mb-8 text-left bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold mb-4">How to fix it:</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Update your web browser to the latest version</li>
            <li>• Clear your browser cache and cookies</li>
            <li>• Try using a different browser</li>
            <li>• Contact your network administrator if on a corporate network</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/" className="btn btn-primary inline-flex items-center gap-2">
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline"
          >
            Try Again
          </button>
        </div>

        {/* Support */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If the problem continues, please reach out to our technical support team at{' '}
            <a href="mailto:support@wellnewyear.com" className="link font-medium">
              support@wellnewyear.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Error505
