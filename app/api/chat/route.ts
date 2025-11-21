import { openai } from '@ai-sdk/openai'
import { streamText, tool } from 'ai'
import { z } from 'zod'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `You are a helpful AI travel companion for Civitatis, a platform that offers experiences, tours, and activities in destinations worldwide.

Your role:
- Help users plan their trips by understanding their preferences, destinations, dates, and group composition
- Suggest relevant Civitatis activities that match their interests
- Be trip-aware: consider day structure, time blocks (morning/afternoon/evening), and avoid overloading schedules
- Provide contextual cross-selling: suggest complementary activities that enhance the trip experience
- Be conversational, friendly, and helpful

When a user describes their trip, you should:
1. Acknowledge their trip details (destination, dates, group, preferences)
2. Propose a logical day structure
3. Suggest initial activities for Day 1
4. Use the available tools to add activities to their trip

Always be mindful of:
- Budget constraints mentioned
- Time preferences (e.g., "not too early mornings")
- Group composition (couples, families, solo travelers)
- Interests (history, food, art, etc.)
- Not overloading any single day`,
    messages,
    tools: {
      addActivity: tool({
        description: 'Add an activity to the trip itinerary',
        parameters: z.object({
          title: z.string().describe('Activity title'),
          description: z.string().optional().describe('Activity description'),
          destination: z.string().optional().describe('Destination city'),
          dayNumber: z.number().describe('Day number (1-based)'),
          timeBlock: z.enum(['morning', 'afternoon', 'evening']).describe('Time block for the activity'),
          durationMinutes: z.number().optional().describe('Duration in minutes'),
          price: z.number().optional().describe('Price in euros'),
          rating: z.number().optional().describe('Rating (0-5)'),
          tags: z.array(z.string()).optional().describe('Tags like "Must-see", "Food", "History", etc.'),
        }),
        execute: async ({ title, description, destination, dayNumber, timeBlock, durationMinutes, price, rating, tags }) => {
          // In a real implementation, this would save to Supabase
          // For now, return success
          return {
            success: true,
            message: `Added "${title}" to Day ${dayNumber} ${timeBlock}`,
          }
        },
      }),
      suggestItinerary: tool({
        description: 'Suggest a complete itinerary structure for the trip',
        parameters: z.object({
          numDays: z.number().describe('Number of days'),
          destinations: z.array(z.string()).describe('List of destinations'),
          preferences: z.string().optional().describe('User preferences and interests'),
        }),
        execute: async ({ numDays, destinations, preferences }) => {
          return {
            success: true,
            message: `Created a ${numDays}-day itinerary for ${destinations.join(', ')}`,
            structure: `Day structure created with ${numDays} days`,
          }
        },
      }),
    },
  })

  return result.toDataStreamResponse()
}
