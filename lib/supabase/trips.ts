'use client'

import { supabase } from './client'
import type { Trip, Activity } from './types'

export async function createTrip(trip: Omit<Trip, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('trips')
    .insert([trip])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getTrip(tripId: string) {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .single()

  if (error) throw error
  return data
}

export async function getTripActivities(tripId: string) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('trip_id', tripId)
    .order('day_number', { ascending: true })
    .order('time_block', { ascending: true })

  if (error) throw error
  return data
}

export async function addActivity(activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('activities')
    .insert([activity])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateActivity(activityId: string, updates: Partial<Activity>) {
  const { data, error } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', activityId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteActivity(activityId: string) {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', activityId)

  if (error) throw error
}
