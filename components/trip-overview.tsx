'use client'

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useTripStore } from '@/lib/store/useTripStore'
import { DayColumn } from './day-column'
import { useMemo } from 'react'

export function TripOverview() {
  const activities = useTripStore((state) => state.activities)
  const currentTrip = useTripStore((state) => state.currentTrip)
  const updateActivity = useTripStore((state) => state.updateActivity)

  // Generate days based on trip or default to 4 days
  const numDays = useMemo(() => {
    if (currentTrip?.start_date && currentTrip?.end_date) {
      const start = new Date(currentTrip.start_date)
      const end = new Date(currentTrip.end_date)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return Math.max(1, diffDays)
    }
    return 4
  }, [currentTrip])

  const days = Array.from({ length: numDays }, (_, i) => i + 1)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activityId = active.id as string
    const targetData = over.data.current

    if (targetData?.dayNumber && targetData?.timeBlock) {
      updateActivity(activityId, {
        day_number: targetData.dayNumber,
        time_block: targetData.timeBlock,
      })
    }
  }

  return (
    <div className="h-full p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          {currentTrip?.name || 'My Trip'}
        </h1>
        {currentTrip?.destinations && currentTrip.destinations.length > 0 && (
          <p className="text-muted-foreground">
            {currentTrip.destinations.join(', ')}
          </p>
        )}
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {days.map((day) => (
            <DayColumn key={day} dayNumber={day} activities={activities} />
          ))}
        </div>
      </DndContext>
    </div>
  )
}
