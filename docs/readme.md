# Civitatis Trip Planner – Pilot Concept & First UI

## 1. Project Summary

Build a **pilot web application** for a Civitatis Trip Planner where:

- A **TRIP** is a collection of experiences (activities, tours, excursions) across one or several destinations.
- An **AI companion** helps users *shape* that trip, not just search.  
- The AI is a **website companion**, not just a chat: it can update the UI, navigate sections, populate lists, and help build an itinerary.

This pilot is an **experimental sandbox** to explore a differentiated, AI-first trip planning UX that we can later bring back into the main Civitatis ecosystem.

---

## 2. What Is a “TRIP” in This App?

For this pilot, a **TRIP** is:

- A structured plan of experiences for a traveler or group.
- It may be:
  - **Multi-destination**: e.g. *Mexican traveler visiting Rome → Paris → Milan in one trip*.
  - **Mono-destination**: e.g. *Trip to Madrid only*.
- Civitatis only sells **experiences in each destination** (no flights/hotels), so the TRIP focuses on:
  - What you **do** in each place.
  - On **which day**, at roughly **what time**.

Conceptually, a TRIP has:

- **Metadata**: name, owner, dates (optional at first), number of travelers, notes.
- **Destinations**: one or multiple cities / areas.
- **Days / Blocks**: e.g. Day 1 morning/afternoon/evening.
- **Assigned experiences**: specific Civitatis activities assigned to those blocks.

The app’s job: help the user **craft that structure** and **fill it with Civitatis experiences**.

---

## 3. Social & Collaboration Concept

We assume there is usually **one primary planner** in a group (family, couple, friends) who:

- Creates and curates the TRIP.
- Wants to share a **summary and details** with others.
- Often wants **input and collaboration** (e.g. “Which day do you prefer for the Vatican?”).

For the pilot:

- A TRIP has:
  - **Owner**: the creator.
  - **Collaborators**: invited via link (no heavy auth required for v1).
- Collaborators can:
  - View the itinerary.
  - Suggest or add activities.
  - Comment or react (lightweight).
- Sharing is via:
  - **Shareable URL**.
  - A **read-only view** for people who just want to see the plan.
  - An **edit view** for collaborators (same UI, fewer actions than owner if needed).

The social dimension is central: the TRIP is a **shared planning artifact**, not just a private wishlist.

---

## 4. Cross-Selling & Recommendation Concept

The planner should **naturally drive attach rate** (more experiences per trip) through smart suggestions, not aggressive upsell.

Example: TRIP to Rome

- User adds **Colosseum guided tour** to Day 1 morning.
- The AI companion:
  - Recognizes that this is a **“must-see” anchor activity** in Rome.
  - Suggests **complementary must-sees**:
    - e.g. Vatican City tour, Sistine Chapel private visit, city walking tour, food tour.
  - Proposes a logical structure:
    - Day 1: Colosseum + Roman Forum.
    - Day 2: Vatican Museums + Sistine Chapel.
    - Day 3: Trastevere food tour, etc.

Cross-selling is:

- **Contextual** (based on destination, day load, type of traveler).
- **Trip-aware** (won’t overload a day or suggest overlapping times).
- **Value-adding** (“this makes your Rome experience more complete”), not random.

---

## 5. First-Time UI Concept (Landing & First Interaction)

### 5.1 Look & Feel on Landing

The landing page should instantly communicate:

- This is **not** a normal search results page.
- This is a **creative, AI-assisted planning space**.

**Layout (desktop, pilot version):**

- Background: clean, light, travel-inspiring but minimal (no heavy imagery).
- Center: a **large, prominent “trip story” input card**, not a classic search bar.
- Around it: subtle hints that this is about **building a trip**, e.g.:
  - Small timeline sketch.
  - Destination chips (Rome, Paris, Madrid…) as examples.
  - Micro-copy like:  
    *“Describe your trip in your own words and we’ll build it with you.”*

**Main input card content:**

- Title:  
  **“Describe your next trip”**
- Subtitle:  
  *“In one message, tell us where you’re going, when, who’s coming and what you like.”*
- Placeholder example:  
  > “I’m going to Rome for 4 days in July with my partner. We like history and food, not too early mornings, medium budget.”
- Optional:
  - Chips below for quick start:
    - “Weekend in a single city”
    - “Multi-city Europe trip”
    - “Family trip with kids”
- Secondary link (small, bottom):  
  *“Prefer classic destination search?”* → (for future, but can be stubbed).

### 5.2 First Interaction Flow (Step-by-Step)

1. **User types their trip description** into the big central card and hits Enter.
2. On submission, **animated transition**:
   - The central card **shrinks and slides** to the left side of the screen, becoming the **AI companion panel**.
   - The **main canvas** in the center/right area appears, ready to show:
     - A **Trip Overview Panel** (top/middle).
     - A **List + Map view** of recommended activities (bottom/side-by-side).

The idea: the page “wakes up”. The user sees that their input didn’t just trigger chat; it **reshaped the interface** into a planning cockpit.

---

## 6. Post-First-Input: How the Page Responds

### 6.1 AI Companion Panel (Left Side)

Once moved to the side, the AI panel behaves as:

- A **vertical chat-like panel** with:
  - User’s initial trip description.
  - AI’s first message summarizing understanding and proposing a starting structure.
- First AI response content (conceptually):

  > “Great, a 4-day trip to Rome in July with your partner, into history and food, no very early mornings, medium budget.  
  > I’ll suggest a 4-day plan with must-see sites and some food experiences.  
  > Let’s start with Day 1. Here are some ideas you can add to your trip.”

- The AI also **triggers UI changes**:
  - Sets **destination: Rome**.
  - Creates a **4-day skeleton** in the trip overview.
  - Loads **recommended activities** for Day 1.

The AI is always:
- **Trip-aware** (talks about days, destinations, group).
- **Actionable** (offering buttons / chips that modify the center view).

### 6.2 Trip Overview Canvas (Center-Top)

The central area shows a **Trip Overview**:

- Horizontal day timeline: Day 1, Day 2, Day 3, Day 4.
- Each day has blocks: Morning, Afternoon, Evening.
- For now, blocks are **empty slots** with hints:
  - “Add an activity”
  - “AI suggestion”

As the user adds something:

- The slot shows the **activity card** (short: title, time window, duration, rating).
- The day footer summarizes:
  - Total activities.
  - Approximate “fullness” (light / medium / packed).

The overview is **interactive**:

- Clicking a day focuses the recommendations on that day.
- Hover or click on an activity opens a detail panel or side-card.

### 6.3 List + Map Recommendations (Center-Bottom / Right)

Below or alongside the overview:

- **Left:** List of recommended activities for the current context (e.g. Day 1 in Rome, morning/afternoon).
- **Right:** Map centered on destination, showing pins for the same activities.

Each list item:

- Activity name, short description, rating, price, duration, time slots.
- Tags (e.g. “Must-see”, “Skip-the-line”, “Good for couples”).
- Primary action: **“Add to Trip”**.
- Secondary: **“Details”** (opens a side panel with more info).

When user clicks **“Add to Trip”**:

- The corresponding slot in the Trip Overview fills with that activity.
- Small animation connects list item → timeline slot.
- AI companion may respond:

  > “Nice choice! I’ve added the Colosseum guided tour to Day 1 morning.  
  > Want me to propose something for the afternoon that’s nearby?”

This is where **cross-selling** logic kicks in:
- After adding one activity, the AI:
  - Suggests **logical complements** (e.g. Roman Forum, Palatine Hill).
  - Avoids overloading the schedule.

---

## 7. Iteration Loop: How Users Continue Interacting

After the first setup, the main loop is:

1. User types **natural language** instructions in the AI panel:
   - “Make Day 2 lighter.”
   - “Add something food-related for one evening.”
   - “We decided to skip Vatican Museums.”
2. AI:
   - Updates the **Trip Overview** (reassigns/removes activities).
   - Refreshes **recommendation list** and **map**.
   - Explains major changes briefly.

3. User can also interact **directly with the UI**:
   - Drag and drop activities between days.
   - Remove an activity.
   - Click “Ask AI for alternatives” from a specific slot.

4. Over time, the trip transitions from:
   - Empty skeleton → rough plan → refined itinerary.

---

## 8. Social & Sharing in the UI (Pilot Level)

For the pilot, keep it simple but visible:

- Top-right of the app:
  - **“Share Trip”** button.
- Clicking it:
  - Generates a **shareable link**.
  - Offers two modes:
    - **View only** (read-only).
    - **Can collaborate** (edit access, no login or very lightweight auth).

In the UI:

- Collaborators see the same **Trip Overview + List + Map + AI** structure.
- For v1:
  - Either everyone shares the same AI thread.
  - Or we clearly show who added what (e.g. “Added by Ana” in small text).

This reinforces the TRIP as a **shared artifact**, not just an individual plan.

---

## 9. Scope Boundaries for the Pilot

Explicitly **in scope** for the pilot:

- Trip definition: mono- and multi-destination (even if multi-destination UI is basic at first).
- AI-driven **first interaction** as described.
- Trip Overview + List + Map layout with **“Add to Trip”** flow.
- Basic cross-selling logic (heuristic or mocked if needed).
- Simple shareable trips with basic collaboration.

**Out of scope** for the pilot (can be stubbed):

- Payment/checkout flows (can be “fake” or link out to existing Civitatis product pages).
- Deep user accounts, authentication, and permissions.
- Advanced time/transport calculations between cities or within cities.
- Full mobile optimization (can be “desktop-first” prototype, responsive later).

---
