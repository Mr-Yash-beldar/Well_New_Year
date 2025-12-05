import { useState } from 'react'
import { useArticles } from '../hooks/useArticles'
import ArticleCard from '../components/ArticleCard'
import Spinner from '../components/Spinner'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Articles = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const { data, isLoading, error } = useArticles({
    page,
    limit: 9,
    search,
    tag: selectedTag,
  })

  const popularTags = [
    'nutrition',
    'diet',
    'health',
    'wellness',
    'weight-loss',
    'meal-planning',
    'superfoods',
    'hydration',
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? '' : tag)
    setPage(1)
  }

  const handleClearFilters = () => {
    setSearch('')
    setSearchInput('')
    setSelectedTag('')
    setPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Nutrition Articles</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Explore our collection of articles on nutrition, health, and wellness
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search articles..."
              className="input pl-10"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      {/* Tags Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-medium">Filter by tag:</span>
          {(search || selectedTag) && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-primary-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500">Error loading articles. Please try again.</p>
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No articles found. Try different search terms or tags.
          </p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {data?.data?.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          {/* Pagination */}
          {data?.pagination && data.pagination.pages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: data.pagination.pages }, (_, i) => i + 1)
                  .filter((p) => {
                    // Show first, last, current, and adjacent pages
                    return (
                      p === 1 ||
                      p === data.pagination.pages ||
                      Math.abs(p - page) <= 1
                    )
                  })
                  .map((p, index, array) => (
                    <div key={p} className="flex items-center gap-2">
                      {index > 0 && array[index - 1] !== p - 1 && (
                        <span className="text-gray-400">...</span>
                      )}
                      <button
                        onClick={() => setPage(p)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          page === p
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {p}
                      </button>
                    </div>
                  ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(data.pagination.pages, p + 1))}
                disabled={page === data.pagination.pages}
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Articles
