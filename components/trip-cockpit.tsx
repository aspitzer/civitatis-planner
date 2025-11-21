'use client'

import { useEffect } from 'react'
import { AICompanionPanel } from './ai-companion-panel'
import { TripOverview } from './trip-overview'
import { RecommendationsAndMap } from './recommendations-and-map'
import { useTripStore } from '@/lib/store/useTripStore'
import { subscribeToTrip } from '@/lib/supabase/realtime'
import { getTripActivities } from '@/lib/supabase/trips'

export function TripCockpit() {
  const currentTrip = useTripStore((state) => state.currentTrip)
  const setActivities = useTripStore((state) => state.setActivities)

  useEffect(() => {
    if (!currentTrip?.id) return

    // Check if trip ID is a valid UUID (Supabase format)
    // If it's a temporary ID (like "trip-123456"), skip Supabase operations
    const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(currentTrip.id)
    
    if (isValidUUID) {
      // Load activities from Supabase only if trip ID is a valid UUID
      getTripActivities(currentTrip.id)
        .then((activities) => {
          setActivities(activities || [])
        })
        .catch((error) => {
          // Only log if it's a real error (not just missing trip)
          if (error?.code !== 'PGRST116') {
            console.error('Error loading activities:', error)
          }
          // In development, continue with empty activities
        })

      // Subscribe to real-time updates
      const unsubscribe = subscribeToTrip(currentTrip.id)

      return () => {
        unsubscribe()
      }
    } else {
      // For temporary trips, just use empty activities
      setActivities([])
    }
  }, [currentTrip?.id, setActivities])

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - AI Companion */}
        <div className="w-80 border-r bg-card flex flex-col">
          <AICompanionPanel />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top - Trip Overview */}
          <div className="flex-1 border-b overflow-auto">
            <TripOverview />
          </div>

          {/* Bottom - Recommendations & Map */}
          <div className="h-1/2 flex border-t">
            <RecommendationsAndMap />
          </div>
        </div>
      </div>
    </div>
  )
}
