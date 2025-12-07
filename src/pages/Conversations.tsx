import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Send } from 'lucide-react'
import { conversationsAPI } from '@/lib/api/conversations'
import { formatRelativeTime } from '@/lib/utils'
import type { Conversation, Message } from '@/lib/types'

export function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchConversations() {
      try {
        setLoading(true)
        const response = await conversationsAPI.getConversations()
        setConversations(response.items)
      } catch (error) {
        console.error('Failed to fetch conversations:', error)
        // Mock data
        setConversations([
          {
            id: '1',
            lead_id: '1',
            lead_name: 'Rahul Kumar',
            lead_phone: '+91 98765 43210',
            status: 'active',
            last_message: 'Looking for 3BHK in Koramangala',
            last_message_time: new Date(Date.now() - 5 * 60000).toISOString(),
            unread_count: 2,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [])

  useEffect(() => {
    async function fetchMessages() {
      if (!selectedConversation) return

      try {
        const msgs = await conversationsAPI.getMessages(selectedConversation.id)
        setMessages(msgs)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
        setMessages([
          {
            id: '1',
            conversation_id: selectedConversation.id,
            sender: 'tenant',
            content: 'Hi, I\'m looking for a 3BHK apartment in Koramangala',
            timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
            status: 'read',
          },
          {
            id: '2',
            conversation_id: selectedConversation.id,
            sender: 'ai',
            content: 'Hello! I\'d be happy to help you find a 3BHK apartment in Koramangala. What\'s your budget range?',
            timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
            status: 'read',
          },
        ])
      }
    }

    fetchMessages()
  }, [selectedConversation])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    try {
      await conversationsAPI.sendMessage(selectedConversation.id, newMessage)
      setNewMessage('')
      // Refresh messages
      const msgs = await conversationsAPI.getMessages(selectedConversation.id)
      setMessages(msgs)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Conversations</h1>
        <p className="text-muted-foreground">WhatsApp message threads with leads</p>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="col-span-1 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`cursor-pointer border-b p-4 hover:bg-accent ${
                    selectedConversation?.id === conv.id ? 'bg-accent' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{conv.lead_name}</div>
                        {conv.unread_count > 0 && (
                          <Badge variant="destructive" className="h-5 min-w-5 px-1">
                            {conv.unread_count}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {conv.last_message}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatRelativeTime(conv.last_message_time)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Message Thread */}
        <Card className="col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Header */}
              <div className="border-b p-4">
                <div className="font-semibold">{selectedConversation.lead_name}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedConversation.lead_phone}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'tenant' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'tenant'
                          ? 'bg-muted'
                          : message.sender === 'ai'
                          ? 'bg-blue-100'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs mt-1 opacity-70">
                        {formatRelativeTime(message.timestamp)}
                        {message.sender === 'ai' && (
                          <span className="ml-2 text-blue-600">• AI Generated</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a conversation to view messages
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

