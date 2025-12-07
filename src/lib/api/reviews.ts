import { apiClient, handleAPIError } from './client'
import type { Review, PaginatedResponse } from '../types'

export const reviewsAPI = {
  async getReviews(status?: string, page = 1, pageSize = 20): Promise<PaginatedResponse<Review>> {
    try {
      const params = new URLSearchParams()
      if (status) params.append('status', status)
      params.append('page', page.toString())
      params.append('page_size', pageSize.toString())

      const response = await apiClient.get(`/reviews?${params.toString()}`)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async getReview(id: string): Promise<Review> {
    try {
      const response = await apiClient.get(`/reviews/${id}`)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async approveReview(id: string): Promise<Review> {
    try {
      const response = await apiClient.post(`/reviews/${id}/approve`)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async editReview(id: string, editedResponse: string, notes?: string): Promise<Review> {
    try {
      const response = await apiClient.post(`/reviews/${id}/edit`, {
        edited_response: editedResponse,
        broker_notes: notes
      })
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async rejectReview(id: string, reason: string): Promise<Review> {
    try {
      const response = await apiClient.post(`/reviews/${id}/reject`, {
        reason
      })
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  }
}

