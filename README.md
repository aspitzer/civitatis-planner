# Civitatis Trip Planner - Pilot Implementation

An AI-powered trip planning application built with Next.js 15, featuring real-time collaboration, interactive maps, and intelligent activity recommendations.

## Features

- **AI-Powered Trip Planning**: Describe your trip in natural language and let the AI companion help you build your itinerary
- **Interactive Timeline**: Drag and drop activities between days and time blocks (morning/afternoon/evening)
- **Real-time Collaboration**: Share trips with collaborators and see changes in real-time
- **Map Integration**: Visualize recommended activities on Google Maps
- **Smart Recommendations**: Context-aware suggestions based on your preferences and trip structure

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **UI**: Tailwind CSS, shadcn/ui components, Framer Motion
- **State Management**: Zustand for client state, TanStack Query for server state
- **AI**: Vercel AI SDK with OpenAI
- **Maps**: Google Maps via @vis.gl/react-google-maps
- **Database**: Supabase (PostgreSQL with real-time subscriptions)
- **Drag & Drop**: dnd-kit

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- OpenAI API key
- Google Maps API key

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

Copy `.env.local.example` to `.env.local` and fill in your API keys:

```bash
cp .env.local.example .env.local
```

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for server-side operations)

3. Set up the database:

Run the SQL schema in `supabase/schema.sql` in your Supabase SQL editor to create the necessary tables and policies.

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/workspace
├── app/                    # Next.js app directory
│   ├── api/               # API routes (AI chat endpoint)
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page (landing/cockpit)
│   └── providers.tsx      # React Query and Google Maps providers
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   ├── landing-page.tsx  # Landing page with trip story input
│   ├── trip-cockpit.tsx  # Main trip planning interface
│   ├── ai-companion-panel.tsx  # AI chat interface
│   ├── trip-overview.tsx # Timeline with day columns
│   └── ...
├── lib/
│   ├── store/            # Zustand stores
│   ├── supabase/         # Supabase client and utilities
│   └── utils.ts          # Utility functions
└── supabase/
    └── schema.sql        # Database schema
```

## Usage

1. **Start Planning**: Enter your trip description on the landing page (e.g., "I'm going to Rome for 4 days in July with my partner. We like history and food.")

2. **AI Companion**: The AI will help you build your itinerary, suggest activities, and answer questions about your trip.

3. **Add Activities**: Browse recommendations and add activities to specific days and time blocks.

4. **Drag & Drop**: Reorganize activities by dragging them between days or time blocks.

5. **Map View**: Hover over recommendations to see their locations on the map.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Notes

- This is a pilot implementation. Some features may be stubbed or use mock data.
- Real-time collaboration requires proper Supabase authentication setup.
- The AI integration uses OpenAI's GPT-4o-mini model by default.
