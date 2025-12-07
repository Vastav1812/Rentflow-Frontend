# RentFlow Frontend - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the environment example file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure your backend URL:

```env
VITE_API_URL=http://localhost:8000
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_ENV=development
VITE_ENABLE_DEMO_MODE=true
VITE_USE_MOCK_DATA=false
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   └── toast.tsx
│   ├── layout/                # Layout components
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   ├── dashboard/             # Dashboard-specific components
│   │   ├── StatsCard.tsx
│   │   ├── RecentActivity.tsx
│   │   └── LeadScoreChart.tsx
│   └── demo/                  # Demo modal for pitch
│       └── DemoModal.tsx
├── pages/                     # Page components
│   ├── Dashboard.tsx          # Main dashboard with stats
│   ├── Leads.tsx              # Lead management
│   ├── Conversations.tsx      # WhatsApp conversations
│   ├── Properties.tsx         # Property listings
│   └── Reviews.tsx            # Review queue
├── lib/
│   ├── api/                   # API client functions
│   │   ├── client.ts          # Base API client
│   │   ├── leads.ts           # Lead endpoints
│   │   ├── conversations.ts   # Conversation endpoints
│   │   ├── properties.ts      # Property endpoints
│   │   └── reviews.ts         # Review endpoints
│   ├── types.ts               # TypeScript type definitions
│   └── utils.ts               # Utility functions
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
└── index.css                  # Global styles

```

## Features

### 1. Dashboard
- Real-time statistics (total leads, hot leads, conversations, reviews)
- Lead score distribution chart
- Recent activity feed
- Quick metrics (conversion rate, response time)

### 2. Leads Management
- Searchable and filterable lead table
- Lead scoring with visual indicators
- Status badges (hot/warm/cold/converted)
- Budget and preference tracking
- Contact information

### 3. Conversations
- WhatsApp-style conversation interface
- Message threading with AI-generated responses
- Real-time message status
- Lead context sidebar
- Send message functionality

### 4. Properties
- Grid view of available properties
- Property details (type, location, rent, amenities)
- Availability status
- Match leads to properties
- Filter by type, bedrooms, location

### 5. Review Queue
- Pending AI-generated responses
- Complexity scoring
- Flagged reasons display
- Approve/Edit/Reject workflow
- Review statistics

### 6. Interactive Demo Modal
- 7-step workflow demonstration
- Real-time progress visualization
- Play/Pause/Reset controls
- Metrics summary
- Perfect for pitch presentations

## API Integration

The frontend connects to your FastAPI backend via the following endpoints:

### Leads API
- `GET /api/v1/leads` - Get all leads with filters
- `GET /api/v1/leads/{id}` - Get lead details
- `GET /api/v1/leads/stats` - Get dashboard statistics
- `POST /api/v1/leads` - Create new lead
- `PATCH /api/v1/leads/{id}` - Update lead

### Conversations API
- `GET /api/v1/conversations` - Get all conversations
- `GET /api/v1/conversations/{id}` - Get conversation details
- `GET /api/v1/conversations/{id}/messages` - Get messages
- `POST /api/v1/conversations/{id}/messages` - Send message

### Properties API
- `GET /api/v1/properties` - Get all properties with filters
- `GET /api/v1/properties/{id}` - Get property details
- `POST /api/v1/properties` - Create property
- `PATCH /api/v1/properties/{id}` - Update property

### Reviews API
- `GET /api/v1/reviews` - Get pending reviews
- `GET /api/v1/reviews/{id}` - Get review details
- `POST /api/v1/reviews/{id}/approve` - Approve review
- `POST /api/v1/reviews/{id}/edit` - Edit and send review
- `POST /api/v1/reviews/{id}/reject` - Reject review

## Mock Data Fallback

If the backend is unavailable, the frontend automatically falls back to mock data for demonstration purposes. This allows you to:
- Test the UI without backend
- Demo the application offline
- Develop frontend independently

## CORS Configuration

Ensure your FastAPI backend allows requests from the frontend:

```python
# In your backend main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `VITE_API_URL=https://your-api-domain.com`
   - `VITE_API_BASE_URL=https://your-api-domain.com/api/v1`
   - `VITE_ENV=production`
4. Deploy

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/` folder
3. Configure environment variables in Netlify dashboard

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in vite.config.ts
```

### API Connection Issues
1. Check backend is running on port 8000
2. Verify CORS is configured correctly
3. Check `.env.local` has correct API URLs
4. Open browser console for detailed errors

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

1. **Hot Reload**: Vite provides instant hot module replacement
2. **Type Safety**: Use TypeScript types from `src/lib/types.ts`
3. **API Client**: All API calls use the centralized client in `src/lib/api/`
4. **Styling**: Use Tailwind utility classes + shadcn/ui components
5. **State Management**: React hooks (useState, useEffect) for local state

## Demo Mode for Pitch

The interactive demo modal (`DemoModal.tsx`) is perfect for Monday pitch:
1. Click "Launch Demo" button in sidebar
2. Click "Start Demo" to begin automated walkthrough
3. Shows complete workflow from message receipt to broker approval
4. Displays key metrics at the end
5. Can pause/resume at any step

## Next Steps

1. Connect to your backend API
2. Test all features with real data
3. Customize branding and colors in `tailwind.config.js`
4. Add authentication if needed
5. Deploy to production

## Support

For issues or questions, refer to:
- Vite docs: https://vitejs.dev
- React Router: https://reactrouter.com
- Tailwind CSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com

