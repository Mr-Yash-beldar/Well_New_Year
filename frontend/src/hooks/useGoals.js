import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import api from '../api/axios'

/**
 * Fetch user's goals
 */
export const useGoals = (filters = {}) => {
  const { status = '', type = '' } = filters

  return useQuery({
    queryKey: ['goals', { status, type }],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (status) params.append('status', status)
      if (type) params.append('type', type)

      const response = await api.get(`/goals?${params.toString()}`)
      return response.data
    },
  })
}

/**
 * Fetch goal statistics
 */
export const useGoalStats = () => {
  return useQuery({
    queryKey: ['goals', 'stats'],
    queryFn: async () => {
      const response = await api.get('/goals/stats')
      return response.data
    },
  })
}

/**
 * Create a new goal
 */
export const useCreateGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (goalData) => {
      const response = await api.post('/goals', goalData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['goals'])
      toast.success('Goal created successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create goal')
    },
  })
}

/**
 * Update goal progress
 */
export const useUpdateGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/goals/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['goals'])
      toast.success('Goal updated successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update goal')
    },
  })
}

/**
 * Delete goal
 */
export const useDeleteGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/goals/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['goals'])
      toast.success('Goal deleted successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete goal')
    },
  })
}
