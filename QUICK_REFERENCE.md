# RentFlow CRM - Quick Reference Card

## 🚀 Running the App

### Start Development Server
```bash
cd /Users/vastav.bishnoi/Desktop/Rentflow-Frontend
npm run dev
```
**URL:** http://localhost:3000

### Stop Server
```bash
lsof -ti:3000 | xargs kill -9
```

### Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

## 🎯 Pages & Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Dashboard | Stats, charts, recent activity |
| `/leads` | Leads | Lead management table with filters |
| `/conversations` | Conversations | WhatsApp-style message interface |
| `/properties` | Properties | Property listings grid |
| `/reviews` | Review Queue | AI response approval workflow |

## 🎬 Demo Modal

**Access:** Click "Launch Demo" button in sidebar (purple gradient button)

**Flow:**
1. Incoming WhatsApp Message
2. AI Processing
3. Property Matching
4. Response Generation
5. Complexity Check
6. Broker Review
7. Approval & Send

**Controls:** Play | Pause | Reset

## 🔌 Backend Connection

### Environment File: `.env.local`
```env
VITE_API_URL=http://localhost:8000
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Required Backend Endpoints
- `GET /api/v1/leads/stats` - Dashboard stats
- `GET /api/v1/leads` - List leads
- `GET /api/v1/conversations` - List conversations
- `GET /api/v1/properties` - List properties
- `GET /api/v1/reviews` - Pending reviews

### Backend CORS Setup
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📊 Key Features

### Dashboard
- **Stats Cards:** Total leads, hot leads, conversations, reviews
- **Pie Chart:** Lead score distribution
- **Activity Feed:** Recent actions
- **Metrics:** Conversion rate, avg response time

### Leads
- **Search:** By name, phone, email
- **Filters:** Status, score, location, type
- **Scoring:** Visual indicators (hot/warm/cold)
- **Details:** Budget, preferences, contact info

### Conversations
- **List View:** All conversations with unread count
- **Messages:** WhatsApp-style chat interface
- **AI Indicators:** Shows AI-generated responses
- **Send:** Reply to tenants

### Properties
- **Grid View:** Property cards with images placeholder
- **Filters:** Type, bedrooms, location
- **Details:** Rent, deposit, amenities, area
- **Status:** Available/Occupied/Maintenance

### Review Queue
- **Tabs:** Pending/Approved/Edited/Rejected
- **Complexity Score:** AI evaluation (0-100)
- **Actions:** Approve | Edit | Reject
- **Context:** Tenant message + AI response

## 🎨 UI Components

Located in `src/components/ui/`:
- **Button** - Primary/Secondary/Outline/Ghost
- **Card** - Container with header/content/footer
- **Input** - Form inputs
- **Select** - Dropdown menus
- **Table** - Data tables
- **Dialog** - Modals
- **Badge** - Status indicators
- **Tabs** - Tabbed interfaces
- **Toast** - Notifications

## 🛠️ Common Tasks

### Add New Page
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`:
   ```typescript
   <Route path="/new" element={<NewPage />} />
   ```
3. Add to sidebar in `src/components/layout/Sidebar.tsx`

### Add API Endpoint
1. Create function in `src/lib/api/module.ts`:
   ```typescript
   export const moduleAPI = {
     async getData() {
       const response = await apiClient.get('/endpoint')
       return response.data
     }
   }
   ```
2. Use in component:
   ```typescript
   const data = await moduleAPI.getData()
   ```

### Update Styling
- **Global:** `src/index.css`
- **Theme Colors:** `tailwind.config.js`
- **Component-specific:** Use Tailwind classes

## 🐛 Debugging

### Check API Calls
1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Click on requests to see details

### Common Issues
| Issue | Solution |
|-------|----------|
| Blank page | Check browser console for errors |
| API errors | Verify backend is running on port 8000 |
| CORS errors | Update backend CORS configuration |
| Port in use | Kill process: `lsof -ti:3000 \| xargs kill -9` |

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React renderer
- `react-router-dom` - Routing
- `typescript` - Type safety
- `vite` - Build tool

### UI
- `tailwindcss` - Styling
- `@radix-ui/*` - Headless UI primitives
- `lucide-react` - Icons
- `recharts` - Charts

### API
- `axios` - HTTP client
- `date-fns` - Date utilities

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel login
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables for Production
```env
VITE_API_URL=https://your-api.com
VITE_API_BASE_URL=https://your-api.com/api/v1
VITE_ENV=production
```

## 📞 Support Resources

- **Setup Guide:** `SETUP.md`
- **Backend Integration:** `BACKEND_INTEGRATION.md`
- **Deployment:** `DEPLOYMENT.md`
- **Full Summary:** `PROJECT_SUMMARY.md`

## ⚡ Keyboard Shortcuts (Browser)

- `Cmd/Ctrl + K` - Focus search bar
- `Cmd/Ctrl + R` - Refresh page
- `Cmd/Ctrl + Shift + I` - Open DevTools
- `F12` - Open DevTools

## 🎯 Monday Pitch Checklist

- [ ] Server running: `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Test all pages load
- [ ] Practice demo modal flow
- [ ] Prepare talking points
- [ ] Test on presentation screen
- [ ] Have backup plan (screenshots)

## 💡 Quick Tips

1. **Mock Data:** App works without backend using realistic sample data
2. **Type Safety:** Use TypeScript types from `src/lib/types.ts`
3. **Auto-refresh:** Changes auto-reload in dev mode
4. **Console Logs:** Check for errors in browser console
5. **Network Tab:** Monitor API calls in DevTools

---

**Project Location:** `/Users/vastav.bishnoi/Desktop/Rentflow-Frontend`

**Running At:** http://localhost:3000

**Status:** ✅ READY FOR DEMO

