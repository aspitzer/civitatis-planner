'use client'

import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps'
import { useTripStore } from '@/lib/store/useTripStore'
import { Clock, Star, MapPin, Plus } from 'lucide-react'
import type { Activity } from '@/lib/supabase/types'

// Mock recommendations data
const mockRecommendations: Activity[] = [
  {
    id: 'rec-1',
    trip_id: '',
    title: 'Colosseum Guided Tour',
    description: 'Skip-the-line access to the iconic Colosseum with expert guide',
    destination: 'Rome',
    duration_minutes: 180,
    price: 45,
    rating: 4.8,
    location_lat: 41.8902,
    location_lng: 12.4922,
    tags: ['Must-see', 'Skip-the-line', 'History'],
  },
  {
    id: 'rec-2',
    trip_id: '',
    title: 'Vatican Museums & Sistine Chapel',
    description: 'Private tour of Vatican Museums including Sistine Chapel',
    destination: 'Rome',
    duration_minutes: 240,
    price: 65,
    rating: 4.9,
    location_lat: 41.9029,
    location_lng: 12.4534,
    tags: ['Must-see', 'Art', 'History'],
  },
  {
    id: 'rec-3',
    trip_id: '',
    title: 'Trastevere Food Tour',
    description: 'Evening food and wine tour through charming Trastevere',
    destination: 'Rome',
    duration_minutes: 180,
    price: 75,
    rating: 4.7,
    location_lat: 41.8897,
    location_lng: 12.4694,
    tags: ['Food', 'Evening', 'Local'],
  },
]

export function RecommendationsAndMap() {
  const [hoveredActivityId, setHoveredActivityId] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState(1)
  const [selectedTimeBlock, setSelectedTimeBlock] = useState<'morning' | 'afternoon' | 'evening'>('morning')
  const currentTrip = useTripStore((state) => state.currentTrip)
  const addActivity = useTripStore((state) => state.addActivity)

  const handleAddActivity = (activity: Activity) => {
    const newActivity: Activity = {
      ...activity,
      trip_id: currentTrip?.id || 'current-trip',
      day_number: selectedDay,
      time_block: selectedTimeBlock,
      added_by: 'user',
    }
    addActivity(newActivity)
  }

  const hoveredActivity = mockRecommendations.find((a) => a.id === hoveredActivityId)

  return (
    <div className="flex h-full">
      {/* Recommendations List */}
      <div className="w-1/2 border-r flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Recommended Activities</h3>
          <p className="text-sm text-muted-foreground">For Day {selectedDay} - {selectedTimeBlock}</p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {mockRecommendations.map((activity) => (
              <Card
                key={activity.id}
                className="cursor-pointer hover:border-primary transition-colors"
                onMouseEnter={() => setHoveredActivityId(activity.id)}
                onMouseLeave={() => setHoveredActivityId(null)}
              >
                <CardHeader>
                  <CardTitle className="text-base">{activity.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {activity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {activity.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {activity.duration_minutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {activity.duration_minutes}m
                        </div>
                      )}
                      {activity.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {activity.rating.toFixed(1)}
                        </div>
                      )}
                      {activity.price && (
                        <div className="font-medium">€{activity.price}</div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddActivity(activity)}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <Map
          defaultCenter={{ lat: 41.9028, lng: 12.4964 }}
          defaultZoom={13}
          mapId="civitatis-trip-planner"
          className="w-full h-full"
        >
          {mockRecommendations.map((activity) => {
            if (!activity.location_lat || !activity.location_lng) return null
            const isHovered = hoveredActivityId === activity.id
            return (
              <AdvancedMarker
                key={activity.id}
                position={{ lat: activity.location_lat, lng: activity.location_lng }}
              >
                <div className={`transition-all ${isHovered ? 'scale-125' : ''}`}>
                  <MapPin
                    className={`w-8 h-8 ${
                      isHovered
                        ? 'text-primary fill-primary'
                        : 'text-blue-500 fill-blue-500'
                    }`}
                  />
                </div>
              </AdvancedMarker>
            )
          })}
        </Map>
      </div>
    </div>
  )
}
