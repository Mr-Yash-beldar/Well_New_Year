const InitialLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50">
      <div className="text-center animate-fade-in max-w-md px-4">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-600 mb-4 animate-pulse">
            WellNewYear
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Your Health & Wellness Partner
          </p>
        </div>

        {/* Animated Loading Spinner */}
        <div className="flex justify-center items-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary-200 dark:border-primary-900 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-primary-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-lg text-gray-600 dark:text-gray-300 animate-pulse mb-6">
          Connecting to server...
        </p>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🚀 Please wait while we establish connection
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            First load may take 30-60 seconds if server is waking up
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-primary-600 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default InitialLoader
