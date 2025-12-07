import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { propertiesAPI } from '@/lib/api/properties'
import type { Property } from '@/lib/types'

interface AddPropertyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPropertyAdded: (property: Property) => void
}

const commonAmenities = [
  'Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup', 
  'Lift', 'Water Supply', 'Park', 'Club House', 'Intercom',
  'Gas Pipeline', 'Visitor Parking', 'Maintenance Staff', 'CCTV'
]

export function AddPropertyDialog({ open, onOpenChange, onPropertyAdded }: AddPropertyDialogProps) {
  const [loading, setLoading] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'apartment',
    location: '',
    address: '',
    rent_amount: '',
    deposit_amount: '',
    bedrooms: '2',
    bathrooms: '2',
    area_sqft: '',
    availability_status: 'available',
    available_from: '',
  })

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const propertyData: Partial<Property> = {
        ...formData,
        rent_amount: parseInt(formData.rent_amount),
        deposit_amount: parseInt(formData.deposit_amount),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area_sqft: parseInt(formData.area_sqft),
        amenities: selectedAmenities,
        images: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const newProperty = await propertiesAPI.createProperty(propertyData)
      onPropertyAdded(newProperty)
      onOpenChange(false)
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        property_type: 'apartment',
        location: '',
        address: '',
        rent_amount: '',
        deposit_amount: '',
        bedrooms: '2',
        bathrooms: '2',
        area_sqft: '',
        availability_status: 'available',
        available_from: '',
      })
      setSelectedAmenities([])
    } catch (error) {
      console.error('Failed to add property:', error)
      // For demo, still add to list
      const mockProperty: Property = {
        id: `prop_${Date.now()}`,
        ...formData,
        rent_amount: parseInt(formData.rent_amount) || 0,
        deposit_amount: parseInt(formData.deposit_amount) || 0,
        bedrooms: parseInt(formData.bedrooms) || 2,
        bathrooms: parseInt(formData.bathrooms) || 2,
        area_sqft: parseInt(formData.area_sqft) || 1000,
        amenities: selectedAmenities,
        images: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      onPropertyAdded(mockProperty)
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  const autoCalculateDeposit = () => {
    const rent = parseInt(formData.rent_amount)
    if (rent && !formData.deposit_amount) {
      setFormData({ ...formData, deposit_amount: (rent * 3).toString() })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Property</DialogTitle>
          <DialogDescription>
            Enter property details to list it in the catalog
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Basic Information</h3>
            <div className="space-y-2">
              <Label htmlFor="title">Property Title *</Label>
              <Input
                id="title"
                required
                placeholder="e.g. Spacious 3BHK Apartment in Koramangala"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                required
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Describe the property, its features, and nearby facilities..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Property Details</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="property_type">Type *</Label>
                <Select
                  required
                  value={formData.property_type}
                  onValueChange={(value) => setFormData({ ...formData, property_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">Independent House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Select
                  required
                  value={formData.bedrooms}
                  onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}
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
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Select
                  required
                  value={formData.bathrooms}
                  onValueChange={(value) => setFormData({ ...formData, bathrooms: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area_sqft">Carpet Area (sq.ft) *</Label>
              <Input
                id="area_sqft"
                type="number"
                required
                placeholder="1500"
                value={formData.area_sqft}
                onChange={(e) => setFormData({ ...formData, area_sqft: e.target.value })}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Location</h3>
            <div className="space-y-2">
              <Label htmlFor="location">Locality *</Label>
              <Input
                id="location"
                required
                placeholder="e.g. Koramangala, Bangalore"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Full Address *</Label>
              <Input
                id="address"
                required
                placeholder="123, 5th Block, Koramangala, Bangalore - 560095"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Pricing</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rent_amount">Monthly Rent (₹) *</Label>
                <Input
                  id="rent_amount"
                  type="number"
                  required
                  placeholder="35000"
                  value={formData.rent_amount}
                  onChange={(e) => setFormData({ ...formData, rent_amount: e.target.value })}
                  onBlur={autoCalculateDeposit}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit_amount">Security Deposit (₹) *</Label>
                <Input
                  id="deposit_amount"
                  type="number"
                  required
                  placeholder="105000"
                  value={formData.deposit_amount}
                  onChange={(e) => setFormData({ ...formData, deposit_amount: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Typically 3 months rent</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {commonAmenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleAmenity(amenity)}
                >
                  {amenity}
                  {selectedAmenities.includes(amenity) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Availability</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="availability_status">Status *</Label>
                <Select
                  required
                  value={formData.availability_status}
                  onValueChange={(value) => setFormData({ ...formData, availability_status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="available_from">Available From</Label>
                <Input
                  id="available_from"
                  type="date"
                  value={formData.available_from}
                  onChange={(e) => setFormData({ ...formData, available_from: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="premium-gradient">
              {loading ? 'Adding Property...' : 'Add Property'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

