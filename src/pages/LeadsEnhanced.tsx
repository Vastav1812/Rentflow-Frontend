import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Plus, TrendingUp, Users, Flame } from 'lucide-react'
import { AddLeadDialog } from '@/components/leads/AddLeadDialog'
import { leadsAPI } from '@/lib/api/leads'
import { formatDate, getLeadStatusColor, formatCurrency } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import type { Lead, LeadFilters } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<LeadFilters>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true)
        const response = await leadsAPI.getLeads(filters)
        setLeads(response.items)
      } catch (error) {
        console.error('Failed to fetch leads:', error)
        // Enhanced mock data with Indian names and locations
        setLeads([
          {
            id: '1',
            name: 'Rajesh Kumar Sharma',
            phone: '+91 98765 43210',
            email: 'rajesh.sharma@email.com',
            lead_score: 92,
            status: 'hot',
            location_preference: 'Koramangala, Bangalore',
            property_type_preference: 'apartment',
            budget_min: 35000,
            budget_max: 45000,
            bedrooms_preference: 3,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Priya Patel',
            phone: '+91 87654 32109',
            email: 'priya.patel@gmail.com',
            lead_score: 85,
            status: 'hot',
            location_preference: 'Bandra West, Mumbai',
            property_type_preference: 'apartment',
            budget_min: 50000,
            budget_max: 65000,
            bedrooms_preference: 2,
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            name: 'Amit Gupta',
            phone: '+91 99887 76655',
            email: 'amit.g@outlook.com',
            lead_score: 78,
            status: 'warm',
            location_preference: 'Indiranagar, Bangalore',
            property_type_preference: 'house',
            budget_min: 40000,
            budget_max: 55000,
            bedrooms_preference: 3,
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '4',
            name: 'Sneha Reddy',
            phone: '+91 91234 56789',
            email: 'sneha.reddy@email.com',
            lead_score: 71,
            status: 'warm',
            location_preference: 'Hitech City, Hyderabad',
            property_type_preference: 'apartment',
            budget_min: 25000,
            budget_max: 35000,
            bedrooms_preference: 2,
            created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '5',
            name: 'Vikram Singh',
            phone: '+91 98888 77777',
            email: 'vikram.singh@company.com',
            lead_score: 45,
            status: 'cold',
            location_preference: 'Gurgaon Sector 29, Delhi NCR',
            property_type_preference: 'villa',
            budget_min: 75000,
            budget_max: 100000,
            bedrooms_preference: 4,
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [filters])

  const filteredLeads = leads.filter(lead =>
    searchQuery === '' ||
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery) ||
    lead.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const hotLeads = leads.filter(l => l.lead_score >= 80).length
  const warmLeads = leads.filter(l => l.lead_score >= 50 && l.lead_score < 80).length

  const handleLeadAdded = (newLead: Lead) => {
    setLeads([newLead, ...leads])
    toast({
      title: "✅ Lead Added Successfully!",
      description: `${newLead.name} has been added to your leads list.`,
      variant: "default",
    })
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-primary bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{leads.length}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">12% increase</span> this month
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
            <Flame className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{hotLeads}</div>
            <p className="text-xs text-muted-foreground">
              Score 80+ • Immediate attention required
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warm Leads</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{warmLeads}</div>
            <p className="text-xs text-muted-foreground">
              Score 50-79 • Active engagement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Lead Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage and track your property leads</p>
        </div>
        <Button 
          onClick={() => setAddDialogOpen(true)} 
          className="premium-gradient shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Lead
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? undefined : value })}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="hot">Hot</SelectItem>
            <SelectItem value="warm">Warm</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading leads...</p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border bg-card shadow-premium overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Contact</TableHead>
                <TableHead className="font-semibold text-center">Score</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Preferences</TableHead>
                <TableHead className="font-semibold">Budget (Monthly)</TableHead>
                <TableHead className="font-semibold">Created</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">📱</span>
                        {lead.phone}
                      </div>
                      {lead.email && (
                        <div className="text-muted-foreground flex items-center gap-1">
                          <span className="text-xs">✉️</span>
                          {lead.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center gap-1">
                      <div className="text-2xl font-bold text-primary">{lead.lead_score}</div>
                      <div className={`h-2 w-16 rounded-full ${
                        lead.lead_score >= 80 ? 'bg-red-500' :
                        lead.lead_score >= 50 ? 'bg-orange-500' : 'bg-blue-500'
                      }`} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getLeadStatusColor(lead.status)}>
                      {lead.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">📍 {lead.location_preference}</div>
                      <div className="text-muted-foreground">
                        {lead.bedrooms_preference}BHK {lead.property_type_preference}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-semibold text-primary">
                      {formatCurrency(lead.budget_min || 0)} - {formatCurrency(lead.budget_max || 0)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AddLeadDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onLeadAdded={handleLeadAdded}
      />
    </div>
  )
}

