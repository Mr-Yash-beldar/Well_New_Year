import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import api from '../api/axios'

/**
 * Fetch all articles with optional filters
 */
export const useArticles = (filters = {}) => {
  const { page = 1, limit = 10, search = '', tag = '' } = filters

  return useQuery({
    queryKey: ['articles', { page, limit, search, tag }],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (page) params.append('page', page)
      if (limit) params.append('limit', limit)
      if (search) params.append('search', search)
      if (tag) params.append('tag', tag)

      const response = await api.get(`/articles?${params.toString()}`)
      return response.data
    },
    keepPreviousData: true,
  })
}

/**
 * Fetch featured articles
 */
export const useFeaturedArticles = () => {
  return useQuery({
    queryKey: ['articles', 'featured'],
    queryFn: async () => {
      const response = await api.get('/articles/featured')
      return response.data
    },
  })
}

/**
 * Fetch single article by ID
 */
export const useArticle = (id) => {
  return useQuery({
    queryKey: ['articles', id],
    queryFn: async () => {
      const response = await api.get(`/articles/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

/**
 * Create new article (Admin/Dietician only)
 */
export const useCreateArticle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (articleData) => {
      const response = await api.post('/articles', articleData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
      toast.success('Article created successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create article')
    },
  })
}
