import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { leadsAPI } from '@/lib/api/leads'
import type { Lead } from '@/lib/types'

interface AddLeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLeadAdded: (lead: Lead) => void
}

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune',
  'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore',
  'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
  'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot'
]

const localities = {
  Bangalore: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Electronic City', 'Jayanagar', 'BTM Layout', 'Marathahalli'],
  Mumbai: ['Andheri', 'Bandra', 'Powai', 'Thane', 'Borivali', 'Navi Mumbai', 'Worli', 'Lower Parel'],
  Delhi: ['Connaught Place', 'Saket', 'Dwarka', 'Rohini', 'Karol Bagh', 'Lajpat Nagar', 'Greater Kailash'],
  Pune: ['Kothrud', 'Hinjewadi', 'Wakad', 'Viman Nagar', 'Aundh', 'Baner', 'Kharadi'],
}

export function AddLeadDialog({ open, onOpenChange, onLeadAdded }: AddLeadDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    location_preference: '',
    property_type_preference: 'apartment',
    budget_min: '',
    budget_max: '',
    bedrooms_preference: '2',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const leadData: Partial<Lead> = {
        ...formData,
        budget_min: parseInt(formData.budget_min),
        budget_max: parseInt(formData.budget_max),
        bedrooms_preference: parseInt(formData.bedrooms_preference),
        lead_score: Math.floor(Math.random() * 40 + 60), // 60-100 for demo
        status: 'new',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const newLead = await leadsAPI.createLead(leadData)
      onLeadAdded(newLead)
      onOpenChange(false)
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        location_preference: '',
        property_type_preference: 'apartment',
        budget_min: '',
        budget_max: '',
        bedrooms_preference: '2',
        notes: '',
      })
    } catch (error) {
      console.error('Failed to add lead:', error)
      // For demo, still add to list even if API fails
      const mockLead: Lead = {
        id: `lead_${Date.now()}`,
        ...formData,
        budget_min: parseInt(formData.budget_min) || 0,
        budget_max: parseInt(formData.budget_max) || 0,
        bedrooms_preference: parseInt(formData.bedrooms_preference) || 2,
        lead_score: Math.floor(Math.random() * 40 + 60),
        status: 'new',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      onLeadAdded(mockLead)
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  const selectedLocalities = formData.city ? localities[formData.city as keyof typeof localities] || [] : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Lead</DialogTitle>
          <DialogDescription>
            Enter tenant details to create a new lead in the system
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Personal Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="rajesh.kumar@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Property Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Property Preferences</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">Preferred City *</Label>
                <Select
                  required
                  value={formData.city}
                  onValueChange={(value) => setFormData({ ...formData, city: value, location_preference: '' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="locality">Preferred Locality *</Label>
                <Select
                  required
                  value={formData.location_preference}
                  onValueChange={(value) => setFormData({ ...formData, location_preference: value })}
                  disabled={!formData.city}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.city ? "Select locality" : "Select city first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedLocalities.map((locality) => (
                      <SelectItem key={locality} value={locality}>
                        {locality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="property_type">Property Type *</Label>
                <Select
                  required
                  value={formData.property_type_preference}
                  onValueChange={(value) => setFormData({ ...formData, property_type_preference: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">Independent House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Select
                  required
                  value={formData.bedrooms_preference}
                  onValueChange={(value) => setFormData({ ...formData, bedrooms_preference: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 BHK</SelectItem>
                    <SelectItem value="2">2 BHK</SelectItem>
                    <SelectItem value="3">3 BHK</SelectItem>
                    <SelectItem value="4">4 BHK</SelectItem>
                    <SelectItem value="5">5+ BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Budget (Monthly Rent)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget_min">Minimum (₹) *</Label>
                <Input
                  id="budget_min"
                  type="number"
                  required
                  placeholder="25000"
                  value={formData.budget_min}
                  onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget_max">Maximum (₹) *</Label>
                <Input
                  id="budget_max"
                  type="number"
                  required
                  placeholder="35000"
                  value={formData.budget_max}
                  onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <textarea
              id="notes"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Any specific requirements or preferences..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="premium-gradient">
              {loading ? 'Adding Lead...' : 'Add Lead'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

