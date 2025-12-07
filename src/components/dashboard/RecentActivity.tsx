import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRelativeTime } from '@/lib/utils'
import { MessageSquare, UserPlus, CheckCircle } from 'lucide-react'

interface Activity {
  id: string
  type: 'message' | 'lead' | 'review'
  title: string
  description: string
  timestamp: string
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Rahul Kumar',
    description: 'Interested in 3BHK apartment in Koramangala',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: '2',
    type: 'lead',
    title: 'New hot lead',
    description: 'Priya Sharma - Score: 85/100',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: '3',
    type: 'review',
    title: 'Review approved',
    description: 'AI response for Amit Patel approved',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
  },
]

const iconMap = {
  message: MessageSquare,
  lead: UserPlus,
  review: CheckCircle,
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const Icon = iconMap[activity.type]
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

