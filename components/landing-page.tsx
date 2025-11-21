'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useTripStore } from '@/lib/store/useTripStore'
import { MapPin, Calendar, Users } from 'lucide-react'

export function LandingPage() {
  const [tripStory, setTripStory] = useState('')
  const setLandingMode = useTripStore((state) => state.setLandingMode)
  const setCurrentTrip = useTripStore((state) => state.setCurrentTrip)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tripStory.trim()) return

    // Create a basic trip object
    const newTrip = {
      id: `trip-${Date.now()}`,
      name: 'My Trip',
      owner_id: 'user-1',
      description: tripStory,
      destinations: [],
      num_travelers: 1,
    }

    setCurrentTrip(newTrip as any)
    setLandingMode(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center space-y-4 pb-6">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Describe your next trip
            </CardTitle>
            <CardDescription className="text-lg">
              In one message, tell us where you&apos;re going, when, who&apos;s coming and what you like.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="I'm going to Rome for 4 days in July with my partner. We like history and food, not too early mornings, medium budget."
                value={tripStory}
                onChange={(e) => setTripStory(e.target.value)}
                className="min-h-[150px] text-lg resize-none"
              />
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Weekend in a single city
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Multi-city Europe trip
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Users className="w-4 h-4" />
                  Family trip with kids
                </Button>
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!tripStory.trim()}
              >
                Start Planning
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Prefer classic destination search?{' '}
              <a href="#" className="underline hover:text-primary">
                Click here
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
