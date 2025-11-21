'use client'

import { supabase } from './client'
import type { Trip, Activity } from './types'
import { useTripStore } from '../store/useTripStore'

export function subscribeToTrip(tripId: string) {
  const setActivities = useTripStore.getState().setActivities
  const setCurrentTrip = useTripStore.getState().setCurrentTrip

  // Subscribe to trip changes
  const tripSubscription = supabase
    .channel(`trip:${tripId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'trips',
        filter: `id=eq.${tripId}`,
      },
      (payload) => {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
          setCurrentTrip(payload.new as Trip)
        }
      }
    )
    .subscribe()

  // Subscribe to activities changes
  const activitiesSubscription = supabase
    .channel(`activities:${tripId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activities',
        filter: `trip_id=eq.${tripId}`,
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          const newActivity = payload.new as Activity
          useTripStore.getState().addActivity(newActivity)
        } else if (payload.eventType === 'UPDATE') {
          const updatedActivity = payload.new as Activity
          useTripStore.getState().updateActivity(updatedActivity.id, updatedActivity)
        } else if (payload.eventType === 'DELETE') {
          const deletedActivity = payload.old as Activity
          useTripStore.getState().removeActivity(deletedActivity.id)
        }
      }
    )
    .subscribe()

  return () => {
    tripSubscription.unsubscribe()
    activitiesSubscription.unsubscribe()
  }
}
