import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { reviewsAPI } from '@/lib/api/reviews'
import { formatDate } from '@/lib/utils'
import type { Review } from '@/lib/types'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [editedResponse, setEditedResponse] = useState('')
  const [statusFilter, setStatusFilter] = useState('pending')

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true)
        const response = await reviewsAPI.getReviews(statusFilter)
        setReviews(response.items)
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
        // Mock data
        setReviews([
          {
            id: '1',
            conversation_id: '1',
            message_id: '1',
            tenant_message: 'I need a pet-friendly 3BHK apartment with a balcony in Koramangala under 40k. Also, is parking included?',
            ai_response: 'I have a perfect match! We have a pet-friendly 3BHK apartment in Koramangala for ₹38,000/month with a spacious balcony and covered parking included. Would you like to schedule a visit?',
            complexity_score: 75,
            flagged_reasons: ['Multiple requirements', 'Budget-sensitive query'],
            status: 'pending',
            created_at: new Date(Date.now() - 10 * 60000).toISOString(),
          },
          {
            id: '2',
            conversation_id: '2',
            message_id: '2',
            tenant_message: 'What are the lease terms and can I move in next week?',
            ai_response: 'The standard lease term is 11 months with a lock-in period of 3 months. For next week move-in, we can expedite the agreement process. I\'ll need your KYC documents to proceed.',
            complexity_score: 65,
            flagged_reasons: ['Legal/contractual query', 'Urgent timeline'],
            status: 'pending',
            created_at: new Date(Date.now() - 25 * 60000).toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [statusFilter])

  const handleApprove = async (reviewId: string) => {
    try {
      await reviewsAPI.approveReview(reviewId)
      setReviews(reviews.filter(r => r.id !== reviewId))
      setSelectedReview(null)
    } catch (error) {
      console.error('Failed to approve review:', error)
    }
  }

  const handleEdit = async (reviewId: string) => {
    try {
      await reviewsAPI.editReview(reviewId, editedResponse)
      setReviews(reviews.filter(r => r.id !== reviewId))
      setSelectedReview(null)
      setEditedResponse('')
    } catch (error) {
      console.error('Failed to edit review:', error)
    }
  }

  const handleReject = async (reviewId: string) => {
    try {
      await reviewsAPI.rejectReview(reviewId, 'Inappropriate response')
      setReviews(reviews.filter(r => r.id !== reviewId))
      setSelectedReview(null)
    } catch (error) {
      console.error('Failed to reject review:', error)
    }
  }

  const openReviewDialog = (review: Review) => {
    setSelectedReview(review)
    setEditedResponse(review.ai_response)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Review Queue</h1>
        <p className="text-muted-foreground">
          Review and approve AI-generated responses before sending
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
            <p className="text-xs text-muted-foreground">Needs your attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Complexity</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72</div>
            <p className="text-xs text-muted-foreground">Out of 100</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="edited">Edited</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter} className="space-y-4 mt-6">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : reviews.length === 0 ? (
            <Card>
              <CardContent className="flex h-64 items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                  <p>No {statusFilter} reviews</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Review #{review.id.slice(0, 8)}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        Complexity: {review.complexity_score}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tenant Message */}
                  <div>
                    <div className="text-sm font-medium mb-2">Tenant Message</div>
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      {review.tenant_message}
                    </div>
                  </div>

                  {/* AI Response */}
                  <div>
                    <div className="text-sm font-medium mb-2">AI Generated Response</div>
                    <div className="rounded-lg bg-blue-50 p-3 text-sm">
                      {review.ai_response}
                    </div>
                  </div>

                  {/* Flagged Reasons */}
                  {review.flagged_reasons.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-2">Flagged For</div>
                      <div className="flex gap-2">
                        {review.flagged_reasons.map((reason, index) => (
                          <Badge key={index} variant="secondary">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {review.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="default"
                        onClick={() => handleApprove(review.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve & Send
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => openReviewDialog(review)}
                        className="flex-1"
                      >
                        Edit Response
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(review.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit AI Response</DialogTitle>
            <DialogDescription>
              Modify the AI-generated response before sending to the tenant
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Tenant Message</label>
              <div className="mt-2 rounded-lg bg-muted p-3 text-sm">
                {selectedReview?.tenant_message}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Your Response</label>
              <textarea
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-32"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReview(null)}>
              Cancel
            </Button>
            <Button onClick={() => selectedReview && handleEdit(selectedReview.id)}>
              Save & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

