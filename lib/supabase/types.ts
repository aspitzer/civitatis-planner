export type Trip = {
  id: string
  name: string
  owner_id: string
  description?: string
  start_date?: string
  end_date?: string
  num_travelers?: number
  destinations?: string[]
  notes?: string
  created_at?: string
  updated_at?: string
}

export type Activity = {
  id: string
  trip_id: string
  civitatis_id?: string
  title: string
  description?: string
  destination?: string
  day_number?: number
  time_block?: 'morning' | 'afternoon' | 'evening'
  start_time?: string
  duration_minutes?: number
  price?: number
  rating?: number
  image_url?: string
  location_lat?: number
  location_lng?: number
  tags?: string[]
  added_by?: string
  created_at?: string
  updated_at?: string
}

export type Collaborator = {
  id: string
  trip_id: string
  user_id: string
  user_email?: string
  role: 'owner' | 'editor' | 'viewer'
  invited_at?: string
}
