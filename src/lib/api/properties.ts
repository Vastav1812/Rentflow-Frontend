import { apiClient, handleAPIError } from './client'
import type { Property, PropertyFilters, PaginatedResponse } from '../types'

export const propertiesAPI = {
  async getProperties(filters?: PropertyFilters, page = 1, pageSize = 20): Promise<PaginatedResponse<Property>> {
    try {
      const params = new URLSearchParams()
      if (filters?.property_type) params.append('property_type', filters.property_type)
      if (filters?.location) params.append('location', filters.location)
      if (filters?.min_rent) params.append('min_rent', filters.min_rent.toString())
      if (filters?.max_rent) params.append('max_rent', filters.max_rent.toString())
      if (filters?.bedrooms) params.append('bedrooms', filters.bedrooms.toString())
      if (filters?.availability_status) params.append('availability_status', filters.availability_status)
      if (filters?.search) params.append('search', filters.search)
      params.append('page', page.toString())
      params.append('page_size', pageSize.toString())

      const response = await apiClient.get(`/properties?${params.toString()}`)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async getProperty(id: string): Promise<Property> {
    try {
      const response = await apiClient.get(`/properties/${id}`)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async createProperty(data: Partial<Property>): Promise<Property> {
    try {
      const response = await apiClient.post('/properties', data)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async updateProperty(id: string, data: Partial<Property>): Promise<Property> {
    try {
      const response = await apiClient.patch(`/properties/${id}`, data)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  }
}

