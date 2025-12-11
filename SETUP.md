# Setup Guide

## Quick Start

### 1. Environment Variables ✅
You've already set up your `.env.local` file with:
- Supabase URL and keys
- OpenAI API key
- Google Maps API key

### 2. Database Schema ✅
You've run the schema SQL in Supabase.

### 3. Development RLS Policies (Optional but Recommended)

The default RLS policies require authentication. For development/testing, you have two options:

**Option A: Use Development Policies (Easier for testing)**
Run `supabase/setup-dev.sql` in your Supabase SQL Editor to allow all operations without authentication.

**Option B: Keep Production Policies (Requires Auth Setup)**
If you want to test with proper authentication, you'll need to:
1. Set up Supabase Auth
2. Configure the app to set `app.user_id` via `SET LOCAL app.user_id = 'user-id'` in database functions
3. Or modify the client to use Supabase Auth

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 5. Test the Application

1. **Landing Page**: Enter a trip description like:
   ```
   I'm going to Rome for 4 days in July with my partner. We like history and food, not too early mornings, medium budget.
   ```

2. **Trip Cockpit**: After submitting, you should see:
   - AI Companion panel on the left
   - Trip Overview timeline in the center-top
   - Recommendations & Map in the bottom

3. **Add Activities**: Click "Add to Trip" on recommendations to add them to your timeline

4. **Drag & Drop**: Try dragging activities between days/time blocks

## Troubleshooting

### RLS Policy Errors
If you see "permission denied" errors when trying to create/read trips:
- Run `supabase/setup-dev.sql` for development
- Or set up proper authentication

### Google Maps Not Loading
- Verify your Google Maps API key is correct
- Check that the Maps JavaScript API is enabled in Google Cloud Console
- Ensure billing is enabled (Google Maps requires a billing account)

### AI Chat Not Working
- Verify your OpenAI API key is correct
- Check the browser console for errors
- Ensure the API route at `/api/chat` is accessible

### Supabase Connection Issues
- Verify your Supabase URL and keys in `.env.local`
- Check that your Supabase project is active
- Ensure the database schema was created successfully

## Next Steps

Once everything is working:
1. Test the full flow: landing → cockpit → add activities → drag & drop
2. Test real-time collaboration (open in two browsers)
3. Customize the AI prompts in `app/api/chat/route.ts`
4. Add more mock recommendations in `components/recommendations-and-map.tsx`
5. Set up proper authentication for production
