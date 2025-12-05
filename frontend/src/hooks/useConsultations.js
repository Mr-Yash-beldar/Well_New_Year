import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import api from '../api/axios'

/**
 * Fetch user's consultations
 */
export const useConsultations = () => {
  return useQuery({
    queryKey: ['consultations'],
    queryFn: async () => {
      const response = await api.get('/consultations')
      return response.data
    },
  })
}

/**
 * Book a new consultation
 */
export const useBookConsultation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (consultationData) => {
      const response = await api.post('/consultations', consultationData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['consultations'])
      toast.success('Consultation booked successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to book consultation')
    },
  })
}

/**
 * Update consultation status
 */
export const useUpdateConsultation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/consultations/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['consultations'])
      toast.success('Consultation updated successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update consultation')
    },
  })
}

/**
 * Delete consultation
 */
export const useDeleteConsultation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/consultations/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['consultations'])
      toast.success('Consultation cancelled successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to cancel consultation')
    },
  })
}
