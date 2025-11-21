-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trips table
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  num_travelers INTEGER DEFAULT 1,
  destinations TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities table (Civitatis experiences)
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  civitatis_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  destination TEXT,
  day_number INTEGER,
  time_block TEXT CHECK (time_block IN ('morning', 'afternoon', 'evening')),
  start_time TIME,
  duration_minutes INTEGER,
  price DECIMAL(10, 2),
  rating DECIMAL(3, 2),
  image_url TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  tags TEXT[] DEFAULT '{}',
  added_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collaborators table
CREATE TABLE IF NOT EXISTS collaborators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  user_email TEXT,
  role TEXT CHECK (role IN ('owner', 'editor', 'viewer')) DEFAULT 'viewer',
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trip_id, user_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_activities_trip_id ON activities(trip_id);
CREATE INDEX IF NOT EXISTS idx_activities_day_number ON activities(trip_id, day_number);
CREATE INDEX IF NOT EXISTS idx_collaborators_trip_id ON collaborators(trip_id);
CREATE INDEX IF NOT EXISTS idx_collaborators_user_id ON collaborators(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic - can be refined later)
-- For trips: users can read/write their own trips or trips they collaborate on
CREATE POLICY "Users can view their own trips" ON trips
  FOR SELECT USING (
    owner_id = current_setting('app.user_id', true) OR
    id IN (SELECT trip_id FROM collaborators WHERE user_id = current_setting('app.user_id', true))
  );

CREATE POLICY "Users can create trips" ON trips
  FOR INSERT WITH CHECK (owner_id = current_setting('app.user_id', true));

CREATE POLICY "Users can update their own trips" ON trips
  FOR UPDATE USING (
    owner_id = current_setting('app.user_id', true) OR
    id IN (SELECT trip_id FROM collaborators WHERE user_id = current_setting('app.user_id', true) AND role IN ('owner', 'editor'))
  );

-- For activities: similar policies
CREATE POLICY "Users can view activities for accessible trips" ON activities
  FOR SELECT USING (
    trip_id IN (
      SELECT id FROM trips WHERE
        owner_id = current_setting('app.user_id', true) OR
        id IN (SELECT trip_id FROM collaborators WHERE user_id = current_setting('app.user_id', true))
    )
  );

CREATE POLICY "Users can create activities for accessible trips" ON activities
  FOR INSERT WITH CHECK (
    trip_id IN (
      SELECT id FROM trips WHERE
        owner_id = current_setting('app.user_id', true) OR
        id IN (SELECT trip_id FROM collaborators WHERE user_id = current_setting('app.user_id', true) AND role IN ('owner', 'editor'))
    )
  );

CREATE POLICY "Users can update activities for accessible trips" ON activities
  FOR UPDATE USING (
    trip_id IN (
      SELECT id FROM trips WHERE
        owner_id = current_setting('app.user_id', true) OR
        id IN (SELECT trip_id FROM collaborators WHERE user_id = current_setting('app.user_id', true) AND role IN ('owner', 'editor'))
    )
  );

CREATE POLICY "Users can delete activities for accessible trips" ON activities
  FOR DELETE USING (
    trip_id IN (
      SELECT id FROM trips WHERE
        owner_id = current_setting('app.user_id', true) OR
        id IN (SELECT trip_id FROM collaborators WHERE user_id = current_setting('app.user_id', true) AND role IN ('owner', 'editor'))
    )
  );

-- For collaborators: users can view collaborators for trips they have access to
CREATE POLICY "Users can view collaborators for accessible trips" ON collaborators
  FOR SELECT USING (
    trip_id IN (
      SELECT id FROM trips WHERE
        owner_id = current_setting('app.user_id', true) OR
        id IN (SELECT trip_id FROM collaborators WHERE user_id = current_setting('app.user_id', true))
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
