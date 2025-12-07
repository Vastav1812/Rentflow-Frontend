# Backend Integration Guide

This document explains how to connect the RentFlow frontend with your FastAPI backend.

## Prerequisites

- FastAPI backend running on `http://localhost:8000`
- CORS properly configured in backend
- All API endpoints implemented as per the spec

## Step 1: Configure Environment

Create `.env.local` file in the frontend root:

```env
VITE_API_URL=http://localhost:8000
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_ENV=development
```

## Step 2: Backend CORS Configuration

In your FastAPI `main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev server
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Step 3: Expected API Response Format

The frontend expects responses in the following formats:

### Paginated Endpoints

```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "page_size": 20,
  "total_pages": 5
}
```

### Single Item Endpoints

```json
{
  "id": "uuid",
  "field1": "value1",
  ...
}
```

## Step 4: Required API Endpoints

### Dashboard Stats
```
GET /api/v1/leads/stats

Response:
{
  "total_leads": 247,
  "hot_leads": 86,
  "active_conversations": 124,
  "pending_reviews": 12,
  "conversion_rate": 23.5,
  "avg_response_time": 2.3
}
```

### Leads Endpoints

```
GET /api/v1/leads?page=1&page_size=20&status=hot&search=john
GET /api/v1/leads/{lead_id}
POST /api/v1/leads
PATCH /api/v1/leads/{lead_id}
```

Lead object structure:
```json
{
  "id": "uuid",
  "name": "string",
  "phone": "string",
  "email": "string",
  "lead_score": 85,
  "status": "hot|warm|cold|new|converted|lost",
  "location_preference": "string",
  "property_type_preference": "apartment|house|villa",
  "budget_min": 25000,
  "budget_max": 35000,
  "bedrooms_preference": 3,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "last_contact": "2024-01-01T00:00:00Z",
  "notes": "string"
}
```

### Conversations Endpoints

```
GET /api/v1/conversations?page=1&page_size=20
GET /api/v1/conversations/{conversation_id}
GET /api/v1/conversations/{conversation_id}/messages
POST /api/v1/conversations/{conversation_id}/messages
```

Conversation object:
```json
{
  "id": "uuid",
  "lead_id": "uuid",
  "lead_name": "string",
  "lead_phone": "string",
  "status": "active|pending|closed",
  "last_message": "string",
  "last_message_time": "2024-01-01T00:00:00Z",
  "unread_count": 2,
  "created_at": "2024-01-01T00:00:00Z"
}
```

Message object:
```json
{
  "id": "uuid",
  "conversation_id": "uuid",
  "sender": "tenant|ai|broker",
  "content": "string",
  "timestamp": "2024-01-01T00:00:00Z",
  "status": "sent|delivered|read",
  "ai_context": {
    "intent": "property_search",
    "entities": {},
    "sentiment": "positive",
    "confidence": 0.95,
    "suggested_properties": ["uuid1", "uuid2"]
  }
}
```

### Properties Endpoints

```
GET /api/v1/properties?page=1&page_size=20&property_type=apartment
GET /api/v1/properties/{property_id}
POST /api/v1/properties
PATCH /api/v1/properties/{property_id}
```

Property object:
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "property_type": "apartment|house|villa|studio|commercial",
  "location": "string",
  "address": "string",
  "rent_amount": 35000,
  "deposit_amount": 105000,
  "bedrooms": 3,
  "bathrooms": 2,
  "area_sqft": 1500,
  "amenities": ["Parking", "Gym", "Pool"],
  "images": ["url1", "url2"],
  "availability_status": "available|occupied|maintenance",
  "available_from": "2024-01-01",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Reviews Endpoints

```
GET /api/v1/reviews?status=pending&page=1&page_size=20
GET /api/v1/reviews/{review_id}
POST /api/v1/reviews/{review_id}/approve
POST /api/v1/reviews/{review_id}/edit
POST /api/v1/reviews/{review_id}/reject
```

Review object:
```json
{
  "id": "uuid",
  "conversation_id": "uuid",
  "message_id": "uuid",
  "tenant_message": "string",
  "ai_response": "string",
  "complexity_score": 75,
  "flagged_reasons": ["Multiple requirements", "Budget-sensitive"],
  "status": "pending|approved|edited|rejected",
  "broker_notes": "string",
  "created_at": "2024-01-01T00:00:00Z",
  "reviewed_at": "2024-01-01T00:00:00Z",
  "reviewed_by": "uuid"
}
```

Edit review request:
```json
{
  "edited_response": "string",
  "broker_notes": "string"
}
```

Reject review request:
```json
{
  "reason": "string"
}
```

## Step 5: Testing the Integration

1. Start your FastAPI backend:
   ```bash
   cd your-backend-directory
   uvicorn main:app --reload --port 8000
   ```

2. Start the React frontend:
   ```bash
   cd Rentflow-Frontend
   npm run dev
   ```

3. Open browser at `http://localhost:3000`

4. Check browser console for any API errors

5. Verify data is loading in each page:
   - Dashboard shows stats
   - Leads table displays data
   - Conversations list appears
   - Properties grid shows listings
   - Review queue displays pending items

## Step 6: Error Handling

The frontend includes automatic fallback to mock data if API fails. To test real API:

1. Open browser DevTools > Network tab
2. Filter by "XHR" or "Fetch"
3. Click on API requests to see:
   - Request URL
   - Request headers
   - Response status
   - Response data

Common issues:
- **CORS errors**: Check backend CORS configuration
- **404 Not Found**: Verify endpoint URLs match
- **500 Server Error**: Check backend logs
- **Network Error**: Ensure backend is running

## Step 7: Authentication (Optional)

If you want to add authentication:

1. Update `src/lib/api/client.ts`:
   ```typescript
   // After login, store token
   localStorage.setItem('auth_token', 'your-token')
   
   // API client already includes token in requests
   ```

2. Create login page:
   ```typescript
   // src/pages/Login.tsx
   async function handleLogin(username: string, password: string) {
     const response = await fetch('http://localhost:8000/api/v1/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ username, password })
     })
     const data = await response.json()
     localStorage.setItem('auth_token', data.access_token)
     window.location.href = '/'
   }
   ```

3. Add protected route wrapper in `App.tsx`

## Step 8: Production Deployment

### Backend
Deploy your FastAPI backend to a cloud provider:
- Heroku
- Railway
- Render
- AWS/GCP/Azure

Update CORS to include production frontend URL:
```python
allow_origins=[
    "https://your-frontend-domain.com",
]
```

### Frontend
Update `.env.production`:
```env
VITE_API_URL=https://your-backend-domain.com
VITE_API_BASE_URL=https://your-backend-domain.com/api/v1
VITE_ENV=production
```

Build and deploy:
```bash
npm run build
# Deploy dist/ folder to Vercel/Netlify
```

## API Client Architecture

The frontend uses a centralized API client (`src/lib/api/client.ts`) that:
- Automatically adds authentication tokens
- Handles errors consistently
- Provides retry logic
- Formats responses

All API calls go through type-safe functions in:
- `src/lib/api/leads.ts`
- `src/lib/api/conversations.ts`
- `src/lib/api/properties.ts`
- `src/lib/api/reviews.ts`

This makes it easy to:
- Mock API calls for testing
- Add caching
- Update endpoints globally
- Handle API version changes

## WebSocket Support (Future)

For real-time updates, you can add WebSocket support:

1. Backend: Use FastAPI WebSockets
2. Frontend: Add WebSocket connection in `src/lib/api/websocket.ts`
3. Update conversations to show real-time messages
4. Add notifications for new leads/reviews

Example:
```typescript
const ws = new WebSocket('ws://localhost:8000/ws')
ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  // Update UI with new data
}
```

## Monitoring & Analytics

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics, Mixpanel)
- Performance monitoring (Web Vitals)
- API response time tracking

## Support

If you encounter issues:
1. Check backend logs for errors
2. Use browser DevTools Network tab
3. Verify API response format matches expected structure
4. Test endpoints directly with curl or Postman
5. Check CORS headers in response

## Example curl Commands

Test your backend endpoints:

```bash
# Get dashboard stats
curl http://localhost:8000/api/v1/leads/stats

# Get leads
curl http://localhost:8000/api/v1/leads?page=1&page_size=20

# Get conversations
curl http://localhost:8000/api/v1/conversations

# Approve a review
curl -X POST http://localhost:8000/api/v1/reviews/{id}/approve
```

