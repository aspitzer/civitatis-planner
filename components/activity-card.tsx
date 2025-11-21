'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Activity } from '@/lib/supabase/types'
import { Clock, Star, X } from 'lucide-react'
import { useTripStore } from '@/lib/store/useTripStore'

interface ActivityCardProps {
  activity: Activity
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: activity.id,
  })
  const removeActivity = useTripStore((state) => state.removeActivity)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{activity.title}</h4>
            {activity.description && (
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {activity.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {activity.duration_minutes && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {activity.duration_minutes}m
                </div>
              )}
              {activity.rating && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {activity.rating.toFixed(1)}
                </div>
              )}
              {activity.price && (
                <Badge variant="outline" className="text-xs">
                  €{activity.price}
                </Badge>
              )}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              removeActivity(activity.id)
            }}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
