import { Link } from 'react-router-dom'
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline'

const ArticleCard = ({ article }) => {
  return (
    <Link
      to={`/articles/${article._id}`}
      className="card hover:shadow-xl transition-all group"
    >
      {/* Image */}
      <div className="w-full h-48 overflow-hidden rounded-t-lg mb-4 -mt-6 -mx-6">
        <img
          src={article.coverImageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="mt-2">
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs dark:bg-primary-900 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <UserIcon className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
