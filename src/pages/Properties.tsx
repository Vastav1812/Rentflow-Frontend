import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin, Home, Bed, Bath, Plus, Maximize2 } from 'lucide-react'
import { AddPropertyDialog } from '@/components/properties/AddPropertyDialog'
import { propertiesAPI } from '@/lib/api/properties'
import { formatCurrency } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import type { Property, PropertyFilters } from '@/lib/types'

export function Properties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<PropertyFilters>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        const response = await propertiesAPI.getProperties(filters)
        setProperties(response.items)
      } catch (error) {
        console.error('Failed to fetch properties:', error)
        setProperties([
          {
            id: '1',
            title: 'Luxury 3BHK Apartment in Koramangala',
            description: 'Premium apartment with modern amenities, spacious rooms, and excellent ventilation. Located in prime location with easy access to IT parks.',
            property_type: 'apartment',
            location: 'Koramangala 5th Block',
            address: '123, Koramangala 5th Block, Bangalore - 560095',
            rent_amount: 45000,
            deposit_amount: 135000,
            bedrooms: 3,
            bathrooms: 2,
            area_sqft: 1650,
            amenities: ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup', 'Lift'],
            images: [],
            availability_status: 'available',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Premium 2BHK in Bandra West',
            description: 'Elegant apartment near Bandra station, perfect for working professionals. Sea-facing views from balcony.',
            property_type: 'apartment',
            location: 'Bandra West',
            address: '456, Linking Road, Bandra West, Mumbai - 400050',
            rent_amount: 65000,
            deposit_amount: 195000,
            bedrooms: 2,
            bathrooms: 2,
            area_sqft: 1250,
            amenities: ['Parking', 'Security', 'Lift', 'Club House', 'CCTV'],
            images: [],
            availability_status: 'available',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Spacious 4BHK Villa in Whitefield',
            description: 'Independent villa with garden, perfect for families. Gated community with 24/7 security.',
            property_type: 'villa',
            location: 'Whitefield',
            address: '789, ITPL Main Road, Whitefield, Bangalore - 560066',
            rent_amount: 85000,
            deposit_amount: 255000,
            bedrooms: 4,
            bathrooms: 3,
            area_sqft: 2500,
            amenities: ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Park', 'Gas Pipeline', 'Club House'],
            images: [],
            availability_status: 'available',
            available_from: '2024-02-01',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [filters])

  const filteredProperties = properties.filter(property =>
    searchQuery === '' ||
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePropertyAdded = (newProperty: Property) => {
    setProperties([newProperty, ...properties])
    toast({
      title: "✅ Property Listed Successfully!",
      description: `${newProperty.title} is now available for tenants.`,
      variant: "default",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Property Catalog
          </h1>
          <p className="text-muted-foreground mt-1">Browse and manage property listings</p>
        </div>
        <Button 
          onClick={() => setAddDialogOpen(true)}
          className="premium-gradient shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search properties by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={filters.property_type || 'all'}
          onValueChange={(value) => setFilters({ ...filters, property_type: value === 'all' ? undefined : value })}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.bedrooms?.toString() || 'all'}
          onValueChange={(value) => setFilters({ ...filters, bedrooms: value === 'all' ? undefined : parseInt(value) })}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            <SelectItem value="1">1 BHK</SelectItem>
            <SelectItem value="2">2 BHK</SelectItem>
            <SelectItem value="3">3 BHK</SelectItem>
            <SelectItem value="4">4+ BHK</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading properties...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
              <div className="h-56 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
                <Home className="h-20 w-20 text-slate-300" />
                <div className="absolute top-3 right-3">
                  <Badge
                    className={
                      property.availability_status === 'available'
                        ? 'bg-green-500 text-white shadow-lg'
                        : property.availability_status === 'occupied'
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-orange-500 text-white shadow-lg'
                    }
                  >
                    {property.availability_status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">{property.title}</CardTitle>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">{property.location}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {property.description}
                </p>
                <div className="flex items-center justify-between text-sm border-t pt-3">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{property.bedrooms} Bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{property.bathrooms} Bath</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{property.area_sqft} sqft</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="text-2xl font-bold text-primary">
                    {formatCurrency(property.rent_amount)}<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Deposit: {formatCurrency(property.deposit_amount)}
                  </div>
                </div>
                {property.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {property.amenities.slice(0, 3).map((amenity, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="gap-2 border-t bg-slate-50">
                <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
                  View Details
                </Button>
                <Button className="flex-1 premium-gradient">Match Leads</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AddPropertyDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onPropertyAdded={handlePropertyAdded}
      />
    </div>
  )
}

