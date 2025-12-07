import { apiClient, handleAPIError } from './client'
import type { Conversation, Message, PaginatedResponse } from '../types'

export const conversationsAPI = {
  async getConversations(page = 1, pageSize = 20): Promise<PaginatedResponse<Conversation>> {
    try {
      const response = await apiClient.get(`/conversations?page=${page}&page_size=${pageSize}`)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async getConversation(id: string): Promise<Conversation> {
    try {
      const response = await apiClient.get(`/conversations/${id}`)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    try {
      const response = await apiClient.get(`/conversations/${conversationId}/messages`)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  async sendMessage(conversationId: string, content: string): Promise<Message> {
    try {
      const response = await apiClient.post(`/conversations/${conversationId}/messages`, {
        content,
        sender: 'broker'
      })
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  }
}

