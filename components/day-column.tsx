'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Activity } from '@/lib/supabase/types'
import { ActivityCard } from './activity-card'

const timeBlocks = ['morning', 'afternoon', 'evening'] as const

interface DayColumnProps {
  dayNumber: number
  activities: Activity[]
}

export function DayColumn({ dayNumber, activities }: DayColumnProps) {
  const dayActivities = activities.filter((a) => a.day_number === dayNumber)

  return (
    <div className="min-w-[300px] flex-shrink-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Day {dayNumber}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">
              {dayActivities.length} activities
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {timeBlocks.map((timeBlock) => {
            const blockActivities = dayActivities.filter(
              (a) => a.time_block === timeBlock
            )
            return (
              <div key={timeBlock} className="space-y-2">
                <div className="text-sm font-medium capitalize text-muted-foreground">
                  {timeBlock}
                </div>
                <div
                  className="min-h-[100px] border-2 border-dashed border-muted rounded-lg p-2 space-y-2"
                  data-day-number={dayNumber}
                  data-time-block={timeBlock}
                >
                  {blockActivities.length === 0 ? (
                    <div className="text-xs text-center text-muted-foreground py-4">
                      Add an activity
                    </div>
                  ) : (
                    blockActivities.map((activity) => (
                      <ActivityCard key={activity.id} activity={activity} />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
