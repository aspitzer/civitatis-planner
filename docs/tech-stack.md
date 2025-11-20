# Tech Stack Recommendation for Civitatis Trip Planner (Pilot)

Based on the project requirements for a highly interactive, AI-first, collaborative trip planner, the following technology stack is recommended. This stack prioritizes **speed of development**, **real-time capabilities**, and **rich UI interactions** necessary for the "landing-to-cockpit" transition and map/timeline visualizations.

## 1. Core Framework
**Recommendation:** [Next.js 15 (App Router)](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)

*   **Why:**
    *   **Server Components:** Efficiently render the initial "Trip Story" landing page for SEO and performance.
    *   **AI Integration:** First-class support for streaming AI responses (see Vercel AI SDK below) directly from server actions.
    *   **Routing:** Robust routing for sharing trip URLs (e.g., `/trip/[tripId]`) and handling deep links.
    *   **React Ecosystem:** Access to the widest range of UI libraries for maps and drag-and-drop.

## 2. UI & Styling
**Recommendation:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Framer Motion](https://www.framer.com/motion/)

*   **Why:**
    *   **shadcn/ui:** Provides accessible, high-quality components (Cards, Dialogs, Sheets) that look professional out of the box but are fully customizable (they are code, not an npm dependency). Essential for the "Trip Overview Panel" and "Activity Cards".
    *   **Framer Motion:** Critical for the **"Landing to Planning Cockpit" transition**. The requirement to have the central input card "shrink and slide to the left" while the main canvas appears requires a robust animation library. Framer Motion handles layout animations (`layoutId`) effortlessly.
    *   **Tailwind:** Rapid styling for custom layouts like the day timeline and map/list split views.

## 3. AI Integration
**Recommendation:** [Vercel AI SDK](https://sdk.vercel.ai/docs) (Core + UI)

*   **Why:**
    *   **Generative UI:** The key differentiator is the AI's ability to "update the UI, navigate sections, populate lists." The Vercel AI SDK allows the LLM to return React components (Generative UI) or structured data (using `tool` calling) instead of just text.
    *   **Streaming:** Essential for the "chat-like" feel where the plan builds up incrementally in the side panel.
    *   **Provider Agnostic:** Easy to switch between OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), or others to find the best model for travel reasoning.

## 4. Maps
**Recommendation:** [Google Maps Platform](https://developers.google.com/maps) via [@vis.gl/react-google-maps](https://visgl.github.io/react-google-maps/)

*   **Why:**
    *   **Familiarity:** Users trust Google Maps for travel.
    *   **Performance:** The `@vis.gl` library is the modern, performant React wrapper for Google Maps, handling markers and info windows efficiently.
    *   **Rich Data:** Access to the Places API for activity details if Civitatis data needs augmentation (though Civitatis data should be primary).
    *   **Sync:** Easy to synchronize map markers with the "List" view (hover on list -> highlight on map).

## 5. State Management & Data Fetching
**Recommendation:** [Zustand](https://github.com/pmndrs/zustand) (Client State) + [TanStack Query](https://tanstack.com/query/latest) (Server State)

*   **Why:**
    *   **Zustand:** The "Trip" state involves complex interactions: moving an activity from the recommendation list to a specific day/slot, managing the "drag and drop" state, and local UI state for the AI panel. Redux is too heavy; Context is too slow for frequent updates. Zustand is perfect for this global client-side store.
    *   **TanStack Query:** For fetching trip details, activity lists, and managing caching/invalidation when the AI updates the plan backend.

## 6. Backend & Real-time Database
**Recommendation:** [Supabase](https://supabase.com/)

*   **Why:**
    *   **Real-time (Postgres Changes):** The pilot requires collaboration ("Social & Collaboration Concept"). Supabase exposes real-time subscriptions to database changes out of the box. When User A adds an activity, User B's UI updates instantly.
    *   **Auth:** "Lightweight auth" or anonymous sessions for collaborators can be handled easily with Supabase Auth.
    *   **Speed:** Provides a full Postgres database and auto-generated APIs without writing a custom backend server, allowing focus on the complex UI and AI logic.
    *   **Vector Support (pgvector):** If semantic search for activities ("Find me something chill near the Pantheon") is needed later, Supabase supports vector embeddings natively.

## 7. Drag and Drop
**Recommendation:** [dnd-kit](https://dndkit.com/)

*   **Why:**
    *   Modern, accessible, and lightweight.
    *   Necessary for the interaction: "Drag and drop activities between days" or reordering activities within a day.

## Summary of Architecture

```mermaid
graph TD
    User[User] --> Client[Next.js Client (Browser)]
    Client --> |Stream UI/Text| AI[Vercel AI SDK]
    Client --> |Real-time Sync| DB[Supabase (Postgres)]
    Client --> |Maps API| Maps[Google Maps]
    AI --> |LLM Calls| LLM[OpenAI / Anthropic]
    Client -- "Drag & Drop" --> Store[Zustand Store]
```

