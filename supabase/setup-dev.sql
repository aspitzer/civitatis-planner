-- Development setup: Temporarily allow all operations for testing
-- WARNING: This disables security! Only use for development.

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own trips" ON trips;
DROP POLICY IF EXISTS "Users can create trips" ON trips;
DROP POLICY IF EXISTS "Users can update their own trips" ON trips;
DROP POLICY IF EXISTS "Users can view activities for accessible trips" ON activities;
DROP POLICY IF EXISTS "Users can create activities for accessible trips" ON activities;
DROP POLICY IF EXISTS "Users can update activities for accessible trips" ON activities;
DROP POLICY IF EXISTS "Users can delete activities for accessible trips" ON activities;
DROP POLICY IF EXISTS "Users can view collaborators for accessible trips" ON collaborators;

-- Create permissive policies for development
CREATE POLICY "dev_allow_all_trips" ON trips
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "dev_allow_all_activities" ON activities
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "dev_allow_all_collaborators" ON collaborators
  FOR ALL USING (true) WITH CHECK (true);
