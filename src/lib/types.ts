// Core type definitions for RentFlow CRM

export interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  lead_score: number
  status: 'new' | 'hot' | 'warm' | 'cold' | 'converted' | 'lost'
  location_preference?: string
  property_type_preference?: string
  budget_min?: number
  budget_max?: number
  bedrooms_preference?: number
  created_at: string
  updated_at: string
  last_contact?: string
  notes?: string
}

export interface Message {
  id: string
  conversation_id: string
  sender: 'tenant' | 'ai' | 'broker'
  content: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  ai_context?: AIContext
}

export interface AIContext {
  intent: string
  entities: Record<string, any>
  sentiment: string
  confidence: number
  suggested_properties?: string[]
}

export interface Conversation {
  id: string
  lead_id: string
  lead_name: string
  lead_phone: string
  status: 'active' | 'pending' | 'closed'
  last_message: string
  last_message_time: string
  unread_count: number
  created_at: string
}

export interface Property {
  id: string
  title: string
  description: string
  property_type: 'apartment' | 'house' | 'villa' | 'studio' | 'commercial'
  location: string
  address: string
  rent_amount: number
  deposit_amount: number
  bedrooms: number
  bathrooms: number
  area_sqft: number
  amenities: string[]
  images: string[]
  availability_status: 'available' | 'occupied' | 'maintenance'
  available_from?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  conversation_id: string
  message_id: string
  tenant_message: string
  ai_response: string
  complexity_score: number
  flagged_reasons: string[]
  status: 'pending' | 'approved' | 'edited' | 'rejected'
  broker_notes?: string
  created_at: string
  reviewed_at?: string
  reviewed_by?: string
}

export interface DashboardStats {
  total_leads: number
  hot_leads: number
  active_conversations: number
  pending_reviews: number
  conversion_rate: number
  avg_response_time: number
}

export interface LeadScoreDistribution {
  hot: number
  warm: number
  cold: number
}

export interface ConversationTrend {
  date: string
  count: number
}

// API Response types
export interface APIResponse<T> {
  data: T
  message?: string
  status: 'success' | 'error'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

// Filter types
export interface LeadFilters {
  status?: string
  min_score?: number
  max_score?: number
  location?: string
  property_type?: string
  search?: string
}

export interface PropertyFilters {
  property_type?: string
  location?: string
  min_rent?: number
  max_rent?: number
  bedrooms?: number
  availability_status?: string
  search?: string
}

