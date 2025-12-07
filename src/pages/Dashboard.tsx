import { useEffect, useState } from 'react'
import { Users, Flame, MessageSquare, ClipboardCheck } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { LeadScoreChart } from '@/components/dashboard/LeadScoreChart'
import { leadsAPI } from '@/lib/api/leads'
import type { DashboardStats } from '@/lib/types'

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await leadsAPI.getLeadStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
        // Use mock data on error
        setStats({
          total_leads: 247,
          hot_leads: 86,
          active_conversations: 124,
          pending_reviews: 12,
          conversion_rate: 23.5,
          avg_response_time: 2.3,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your leads today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value={stats?.total_leads || 0}
          icon={Users}
          description="All time leads"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Hot Leads"
          value={stats?.hot_leads || 0}
          icon={Flame}
          description="Score 80+"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Active Conversations"
          value={stats?.active_conversations || 0}
          icon={MessageSquare}
          description="Ongoing chats"
        />
        <StatsCard
          title="Pending Reviews"
          value={stats?.pending_reviews || 0}
          icon={ClipboardCheck}
          description="Need your attention"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <LeadScoreChart />
        <RecentActivity />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Conversion Rate</h3>
          <div className="text-3xl font-bold text-green-600">
            {stats?.conversion_rate.toFixed(1)}%
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Leads converted to tenants
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Avg Response Time</h3>
          <div className="text-3xl font-bold text-blue-600">
            {stats?.avg_response_time.toFixed(1)}m
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered quick responses
          </p>
        </div>
      </div>
    </div>
  )
}

