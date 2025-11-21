import { create } from 'zustand'
import type { Trip, Activity } from '@/lib/supabase/types'

interface TripState {
  currentTrip: Trip | null
  activities: Activity[]
  isLandingMode: boolean
  setCurrentTrip: (trip: Trip | null) => void
  setActivities: (activities: Activity[]) => void
  addActivity: (activity: Activity) => void
  updateActivity: (id: string, updates: Partial<Activity>) => void
  removeActivity: (id: string) => void
  setLandingMode: (isLanding: boolean) => void
  reset: () => void
}

export const useTripStore = create<TripState>((set) => ({
  currentTrip: null,
  activities: [],
  isLandingMode: true,
  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  setActivities: (activities) => set({ activities }),
  addActivity: (activity) =>
    set((state) => ({ activities: [...state.activities, activity] })),
  updateActivity: (id, updates) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    })),
  removeActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((a) => a.id !== id),
    })),
  setLandingMode: (isLanding) => set({ isLandingMode: isLanding }),
  reset: () =>
    set({
      currentTrip: null,
      activities: [],
      isLandingMode: true,
    }),
}))
