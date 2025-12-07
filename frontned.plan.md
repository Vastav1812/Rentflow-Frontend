# RentFlow Frontend CRM - Implementation Plan

## Overview

Build a modern frontend CRM dashboard in a separate GitHub repository that connects to the RentFlow FastAPI backend. The frontend will showcase lead management, conversation tracking, property management, and broker review queue features, with an interactive demo modal for the Monday pitch presentation.

## Tech Stack Decision

**Recommended: Next.js 14+ (React + TypeScript)**

- Fast development with App Router
- Built-in API route handling
- Server-side rendering for better performance
- Easy deployment (Vercel/Netlify)
- Modern UI with Tailwind CSS + shadcn/ui components

**Alternative stacks if preferred:**

- Vue 3 + Nuxt.js
- React + Vite
- Plain React + TypeScript

## Project Structure

```
rentflow-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   ├── leads/         # Lead management pages
│   │   │   ├── conversations/ # Conversation pages
│   │   │   ├── properties/    # Property management
│   │   │   ├── reviews/       # Review queue
│   │   │   └── dashboard/     # Main dashboard
│   │   ├── demo/              # Demo modal/page
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── leads/             # Lead components
│   │   ├── conversations/     # Conversation components
│   │   └── demo/              # Demo modal components
│   ├── lib/
│   │   ├── api/               # API client functions
│   │   ├── utils/             # Utility functions
│   │   └── types/             # TypeScript types
│   └── hooks/                 # Custom React hooks
├── public/
├── .env.local                 # Environment variables
├── package.json
└── README.md
```

## Key Features to Implement

### 1. Authentication (Simple for Demo)

- Simple API key-based auth or mock auth for demo
- Store auth token in localStorage/sessionStorage
- Protected route wrapper

### 2. Main Dashboard

- **Stats Cards**: Total leads, hot leads, pending reviews, active conversations
- **Recent Activity**: Latest messages, new leads, reviews
- **Quick Actions**: Create property, view hot leads, review queue
- **Charts**: Lead score distribution, conversation trends (using Recharts)

### 3. Leads Management

- **Leads List**: Table with filters (status, score, location, property type)
- **Lead Detail**: Full lead profile, conversation history, property matches
- **Lead Scoring**: Visual indicators (hot/warm/cold badges)
- **Search & Filter**: Real-time search, advanced filters

### 4. Conversations

- **Conversation List**: WhatsApp-style conversation list
- **Message Thread**: Chat interface showing messages
- **Context View**: Show AI context, property matches, lead info

### 5. Properties

- **Property List**: Grid/table view with images
- **Property Detail**: Full property info, photos, availability
- **Create/Edit**: Form for adding/editing properties
- **Filters**: Location, type, rent range, bedrooms

### 6. Review Queue (Critical for Demo)

- **Pending Reviews**: List of messages needing broker review
- **Review Detail**: 
  - Original tenant message
  - AI-generated response
  - Complexity score & flagged reasons
  - Conversation context
  - Actions: Approve, Edit, Reject
- **Review Stats**: Approval rate, complexity distribution

### 7. Demo Modal (Pitch Feature)

- **Interactive Flow Demo**:

  1. Simulated WhatsApp message arrives
  2. AI processes and generates response
  3. Shows property matching
  4. Demonstrates review queue for complex queries
  5. Shows broker approval/edit flow

- **Animated Transitions**: Smooth animations between steps
- **Mock Data**: Use realistic sample data
- **Play/Pause Controls**: User can control demo speed
- **Key Metrics Highlight**: Show time saved, response rate, etc.

## API Integration

### API Client Setup

- Create typed API client using fetch/axios
- Base URL from environment variable
- Error handling and retry logic
- Loading states management

### Key API Endpoints to Integrate

- `GET /api/v1/leads` - List leads with filters
- `GET /api/v1/leads/{id}` - Lead details
- `GET /api/v1/leads/stats` - Lead statistics
- `GET /api/v1/conversations` - List conversations
- `GET /api/v1/conversations/{id}/messages` - Get messages
- `GET /api/v1/properties` - List properties
- `GET /api/v1/reviews` - List pending reviews
- `POST /api/v1/reviews/{id}/approve` - Approve review
- `POST /api/v1/reviews/{id}/edit` - Edit review
- `POST /api/v1/reviews/{id}/reject` - Reject review

## UI/UX Design

### Design System

- **Color Scheme**: Professional blue/green (trust, growth)
- **Typography**: Inter or Poppins font
- **Components**: shadcn/ui for consistent, accessible components
- **Icons**: Lucide React icons
- **Responsive**: Mobile-first, works on tablet/desktop

### Key UI Patterns

- **Cards**: For stats and summaries
- **Tables**: For lists (with sorting, pagination)
- **Modals**: For details and actions
- **Toast Notifications**: For success/error messages
- **Loading Skeletons**: For better perceived performance
- **Empty States**: Helpful messages when no data

## Implementation Steps

### Phase 1: Project Setup (Day 1)

1. Initialize Next.js project with TypeScript
2. Install dependencies (Tailwind, shadcn/ui, axios, etc.)
3. Set up project structure
4. Configure environment variables
5. Create API client utilities
6. Set up basic routing and layout

### Phase 2: Core Components (Day 1-2)

1. Create reusable UI components (Button, Card, Table, Modal, etc.)
2. Build layout components (Sidebar, Header, Dashboard shell)
3. Implement authentication wrapper
4. Create loading and error states

### Phase 3: Dashboard Pages (Day 2)

1. Main dashboard with stats
2. Leads list and detail pages
3. Conversations list and message view
4. Properties list and detail pages
5. Review queue page

### Phase 4: Demo Modal (Day 2-3)

1. Create demo modal component
2. Build interactive flow animations
3. Add mock data and scenarios
4. Implement play/pause controls
5. Add metrics highlights

### Phase 5: Polish & Testing (Day 3)

1. Add error handling
2. Implement loading states
3. Responsive design fixes
4. Test API integration
5. Add demo data seeding script (optional)

## Environment Configuration

### Frontend Environment Variables

Create `.env.local` in the frontend repository:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# Environment
NEXT_PUBLIC_ENV=development

# Optional: API Authentication (if implemented)
NEXT_PUBLIC_API_KEY=your_api_key_here

# Feature Flags
NEXT_PUBLIC_ENABLE_DEMO_MODE=true
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### Environment-Specific Configurations

**Development (.env.local):**

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_ENV=development
```

**Staging (.env.staging):**

```env
NEXT_PUBLIC_API_URL=https://staging-api.rentflow.in
NEXT_PUBLIC_API_BASE_URL=https://staging-api.rentflow.in/api/v1
NEXT_PUBLIC_ENV=staging
```

**Production (.env.production):**

```env
NEXT_PUBLIC_API_URL=https://api.rentflow.in
NEXT_PUBLIC_API_BASE_URL=https://api.rentflow.in/api/v1
NEXT_PUBLIC_ENV=production
```

### Backend CORS Configuration

Ensure backend `ALLOWED_ORIGINS` includes frontend URL:

- Development: `http://localhost:3000`
- Staging: `https://staging.rentflow.in`
- Production: `https://app.rentflow.in`

## Deployment Considerations

- **Vercel** (recommended for Next.js): Easy deployment, automatic SSL
- **Netlify**: Alternative option
- **Environment Variables**: Set in deployment platform
- **CORS**: Ensure backend allows frontend origin

## Demo Data Strategy

For Monday demo, consider:

1. Pre-seed backend with sample leads, conversations, properties
2. Use mock data in demo modal (doesn't require backend)
3. Create realistic scenarios showing:

   - Hot lead with quick AI response
   - Complex query requiring review
   - Property matching in action
   - Broker approving/editing responses

## Files to Create

### Core Files

- `src/lib/api/client.ts` - API client configuration
- `src/lib/api/leads.ts` - Lead API functions
- `src/lib/api/conversations.ts` - Conversation API functions
- `src/lib/api/properties.ts` - Property API functions
- `src/lib/api/reviews.ts` - Review API functions
- `src/lib/types/index.ts` - TypeScript type definitions

### Key Components

- `src/components/demo/DemoModal.tsx` - Main demo modal
- `src/components/demo/DemoFlow.tsx` - Interactive flow component
- `src/components/dashboard/StatsCards.tsx` - Dashboard stats
- `src/components/leads/LeadList.tsx` - Leads table
- `src/components/reviews/ReviewQueue.tsx` - Review queue list
- `src/components/reviews/ReviewDetail.tsx` - Review detail modal

### Pages

- `src/app/(dashboard)/dashboard/page.tsx` - Main dashboard
- `src/app/(dashboard)/leads/page.tsx` - Leads list
- `src/app/(dashboard)/leads/[id]/page.tsx` - Lead detail
- `src/app/(dashboard)/conversations/page.tsx` - Conversations
- `src/app/(dashboard)/reviews/page.tsx` - Review queue
- `src/app/demo/page.tsx` - Standalone demo page (optional)

## Success Criteria for Monday Demo

1. ✅ Dashboard loads with real backend data
2. ✅ Demo modal showcases complete workflow using live API calls
3. ✅ Review queue shows real pending reviews from backend
4. ✅ Can approve/edit/reject reviews (actual API operations)
5. ✅ Leads list shows real scoring and filtering
6. ✅ Conversations display real message threads
7. ✅ Responsive and visually appealing
8. ✅ Smooth animations and transitions
9. ✅ Graceful fallback to mock data if backend unavailable
10. ✅ Real-time updates when data changes

## Notes

- Focus on demo modal quality for pitch impact
- Ensure backend CORS is configured for frontend origin
- Use optimistic UI updates for better UX
- Add error boundaries for graceful error handling
- Consider adding WebSocket support for real-time updates (future enhancement)