import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlayCircle, PauseCircle, RotateCcw, CheckCircle, MessageSquare, Brain, Building2, User } from 'lucide-react'

interface DemoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type DemoStep = {
  id: number
  title: string
  description: string
  duration: number
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: 'Incoming WhatsApp Message',
    description: 'A new message arrives from a potential tenant',
    duration: 2000,
  },
  {
    id: 2,
    title: 'AI Processing',
    description: 'AI analyzes the message and extracts intent, requirements, and sentiment',
    duration: 2500,
  },
  {
    id: 3,
    title: 'Property Matching',
    description: 'System matches tenant requirements with available properties',
    duration: 2000,
  },
  {
    id: 4,
    title: 'Response Generation',
    description: 'AI generates a personalized response with property recommendations',
    duration: 2000,
  },
  {
    id: 5,
    title: 'Complexity Check',
    description: 'AI evaluates if broker review is needed (Score: 75/100)',
    duration: 1500,
  },
  {
    id: 6,
    title: 'Broker Review',
    description: 'Response sent to review queue for broker approval',
    duration: 2000,
  },
  {
    id: 7,
    title: 'Approval & Send',
    description: 'Broker approves and message is sent to tenant',
    duration: 2000,
  },
]

export function DemoModal({ open, onOpenChange }: DemoModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)

  useEffect(() => {
    if (!open) {
      setCurrentStep(0)
      setIsPlaying(false)
      setShowMetrics(false)
      return
    }
  }, [open])

  useEffect(() => {
    if (!isPlaying || currentStep >= demoSteps.length) {
      if (currentStep >= demoSteps.length) {
        setShowMetrics(true)
        setIsPlaying(false)
      }
      return
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1)
    }, demoSteps[currentStep].duration)

    return () => clearTimeout(timer)
  }, [isPlaying, currentStep])

  const handlePlay = () => {
    if (currentStep >= demoSteps.length) {
      setCurrentStep(0)
      setShowMetrics(false)
    }
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setShowMetrics(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">RentFlow AI Demo</DialogTitle>
          <p className="text-muted-foreground">
            Interactive demo showing how RentFlow handles tenant inquiries
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">
                {currentStep}/{demoSteps.length} steps
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(currentStep / demoSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Demo Content */}
          {!showMetrics ? (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Workflow Steps</h3>
                <div className="space-y-3">
                  {demoSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                        index === currentStep
                          ? 'bg-primary/10 border-2 border-primary'
                          : index < currentStep
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-muted border border-transparent'
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                          index < currentStep
                            ? 'bg-green-500 text-white'
                            : index === currentStep
                            ? 'bg-primary text-white'
                            : 'bg-muted-foreground/20'
                        }`}
                      >
                        {index < currentStep ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-sm">{step.id}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{step.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Demo */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Live Preview</h3>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Current Step</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentStep === 0 && (
                      <div className="text-center py-12">
                        <PlayCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Click Play to start demo</p>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <MessageSquare className="h-4 w-4" />
                          New Message Received
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium text-sm">Rahul Kumar</span>
                            <Badge variant="secondary">+91 98765 43210</Badge>
                          </div>
                          <p className="text-sm">
                            "Hi, I'm looking for a pet-friendly 3BHK apartment in Koramangala 
                            under 40k with parking. Can you help?"
                          </p>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Brain className="h-4 w-4" />
                          AI Analysis in Progress
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Intent:</span>
                            <Badge>Property Search</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Requirements:</span>
                            <Badge>3BHK, Pet-friendly, Parking</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Budget:</span>
                            <Badge>Under ₹40,000/mo</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Sentiment:</span>
                            <Badge variant="secondary">Positive</Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Building2 className="h-4 w-4" />
                          Matching Properties
                        </div>
                        <div className="space-y-2">
                          <div className="bg-blue-50 rounded p-3 border border-blue-200">
                            <div className="font-medium text-sm">3BHK in Koramangala</div>
                            <div className="text-xs text-muted-foreground">
                              ₹38,000/mo • Pet-friendly • Parking
                            </div>
                            <Badge className="mt-2 bg-green-500">95% Match</Badge>
                          </div>
                          <div className="bg-blue-50 rounded p-3 border border-blue-200">
                            <div className="font-medium text-sm">3BHK in HSR Layout</div>
                            <div className="text-xs text-muted-foreground">
                              ₹35,000/mo • Pet-friendly • Parking
                            </div>
                            <Badge className="mt-2 bg-green-500">92% Match</Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep >= 4 && currentStep <= 6 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <MessageSquare className="h-4 w-4" />
                          AI Generated Response
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <p className="text-sm">
                            "Hi Rahul! Great news - I have a perfect pet-friendly 3BHK apartment 
                            in Koramangala for ₹38,000/month with dedicated parking. It's available 
                            for immediate move-in. Would you like to schedule a visit?"
                          </p>
                        </div>
                        {currentStep >= 5 && (
                          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                            <div className="text-sm font-medium mb-1">⚠️ Complexity Score: 75</div>
                            <div className="text-xs text-muted-foreground">
                              Flagged for: Multiple requirements, Budget-sensitive
                            </div>
                          </div>
                        )}
                        {currentStep >= 6 && (
                          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                            <div className="text-sm font-medium text-green-700">
                              ✓ Sent to Review Queue
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {currentStep === 7 && (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
                        <p className="font-medium text-lg mb-2">Message Sent Successfully!</p>
                        <p className="text-sm text-muted-foreground">
                          Total time: 2.3 minutes (vs 15+ minutes manually)
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            /* Metrics Summary */
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="h-20 w-20 mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Demo Complete!</h3>
                <p className="text-muted-foreground">
                  See how RentFlow transforms tenant management
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Time Saved</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">85%</div>
                    <p className="text-xs text-muted-foreground">
                      2.3 min vs 15+ min manually
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Response Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">98%</div>
                    <p className="text-xs text-muted-foreground">
                      Near-instant responses
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Lead Conversion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">+42%</div>
                    <p className="text-xs text-muted-foreground">
                      With AI assistance
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 pt-4 border-t">
            {!isPlaying ? (
              <Button onClick={handlePlay} size="lg">
                <PlayCircle className="h-5 w-5 mr-2" />
                {currentStep === 0 ? 'Start Demo' : 'Resume'}
              </Button>
            ) : (
              <Button onClick={handlePause} size="lg" variant="outline">
                <PauseCircle className="h-5 w-5 mr-2" />
                Pause
              </Button>
            )}
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

