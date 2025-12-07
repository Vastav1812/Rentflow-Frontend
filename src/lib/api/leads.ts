import { apiClient, handleAPIError } from './client'
import type { Lead, LeadFilters, PaginatedResponse, DashboardStats } from '../types'

export const leadsAPI = {
  async getLeads(filters?: LeadFilters, page = 1, pageSize = 20): Promise<PaginatedResponse<Lead>> {
    try {
      const params = new URLSearchParams()
      if (filters?.status) params.append('status', filters.status)
      if (filters?.min_score) params.append('min_score', filters.min_score.toString())
      if (filters?.max_score) params.append('max_score', filters.max_score.toString())
      if (filters?.location) params.append('location', filters.location)
      if (filters?.property_type) params.append('property_type', filters.property_type)
      if (filters?.search) params.append('search', filters.search)
      params.append('page', page.toString())
      params.append('page_size', pageSize.toString())

      const response = await apiClient.get(`/leads?${params.toString()}`)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async getLead(id: string): Promise<Lead> {
    try {
      const response = await apiClient.get(`/leads/${id}`)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async getLeadStats(): Promise<DashboardStats> {
    try {
      const response = await apiClient.get('/leads/stats')
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
    try {
      const response = await apiClient.patch(`/leads/${id}`, data)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async createLead(data: Partial<Lead>): Promise<Lead> {
    try {
      const response = await apiClient.post('/leads', data)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  }
}

