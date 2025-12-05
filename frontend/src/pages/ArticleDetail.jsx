import { useParams, Link } from 'react-router-dom'
import { useArticle } from '../hooks/useArticles'
import Spinner from '../components/Spinner'
import { 
  CalendarIcon, 
  UserIcon, 
  TagIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline'

const ArticleDetail = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useArticle(id)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error || !data?.data) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Article not found</h2>
        <Link to="/articles" className="link">
          ← Back to Articles
        </Link>
      </div>
    )
  }

  const article = data.data

  return (
    <div className="animate-fade-in">
      {/* Header Image */}
      <div className="w-full h-64 md:h-96 overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img
          src={article.coverImageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 link mb-6 hover:gap-3 transition-all"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Articles
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-8">
            <TagIcon className="w-5 h-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/articles?tag=${tag}`}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm hover:bg-primary-200 transition-colors dark:bg-primary-900 dark:text-primary-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Excerpt */}
        <div className="text-xl text-gray-700 dark:text-gray-300 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          {article.excerpt}
        </div>

        {/* Body Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.body.split('\n\n').map((paragraph, index) => {
            // Check if paragraph is a heading (starts with **)
            if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
              const text = paragraph.replace(/\*\*/g, '')
              return (
                <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                  {text}
                </h2>
              )
            }
            
            // Regular paragraph with bold text support
            const parts = paragraph.split(/(\*\*.*?\*\*)/g)
            return (
              <p key={index} className="mb-4 leading-relaxed">
                {parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i}>{part.replace(/\*\*/g, '')}</strong>
                  }
                  return part
                })}
              </p>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Book a consultation with our expert dieticians and get personalized guidance
          </p>
          <Link to="/book" className="btn btn-primary">
            Book Consultation
          </Link>
        </div>
      </article>
    </div>
  )
}

export default ArticleDetail
