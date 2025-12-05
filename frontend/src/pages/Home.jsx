import { Link } from 'react-router-dom'
import { useFeaturedArticles } from '../hooks/useArticles'
import ArticleCard from '../components/ArticleCard'
import Spinner from '../components/Spinner'
import { 
  HeartIcon, 
  SparklesIcon, 
  UserGroupIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline'

const Home = () => {
  const { data: featuredData, isLoading } = useFeaturedArticles()

  const features = [
    {
      icon: HeartIcon,
      title: 'Expert Nutrition Guidance',
      description: 'Get personalized advice from certified dieticians and nutrition experts.',
    },
    {
      icon: SparklesIcon,
      title: 'Track Your Progress',
      description: 'Set and monitor wellness goals including weight, water intake, and daily steps.',
    },
    {
      icon: UserGroupIcon,
      title: 'Book Consultations',
      description: 'Schedule one-on-one sessions with our team of professional dieticians.',
    },
    {
      icon: ChartBarIcon,
      title: 'Educational Content',
      description: 'Access a library of articles on nutrition, health, and wellness topics.',
    },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Start Your Health Journey This New Year
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Transform your life with expert nutrition guidance, personalized meal plans, 
              and wellness tracking all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="btn btn-primary bg-white text-primary-700 hover:bg-gray-100 text-lg px-8 py-3"
              >
                Get Started Free
              </Link>
              <Link
                to="/articles"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700 text-lg px-8 py-3"
              >
                Browse Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need for a Healthier You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card text-center hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Articles</h2>
            <Link to="/articles" className="link text-lg hover:underline">
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredData?.data?.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of people who have already started their wellness journey 
            with WellNewYear. Sign up today and get your first consultation free!
          </p>
          <Link
            to="/signup"
            className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg px-8 py-3 inline-block"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-lg">
                Happy Clients
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-lg">
                Expert Dieticians
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                95%
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-lg">
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
