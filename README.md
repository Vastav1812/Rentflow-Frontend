# RentFlow CRM Frontend

Modern CRM dashboard for RentFlow - AI-powered WhatsApp lead management system.

## Features

- 📊 **Dashboard**: Real-time stats and analytics
- 👥 **Lead Management**: Track and score leads automatically
- 💬 **Conversations**: WhatsApp message threads with AI context
- 🏢 **Property Management**: Browse and manage property listings
- ✅ **Review Queue**: Approve/edit AI-generated responses
- 🎯 **Demo Mode**: Interactive pitch presentation

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router v6
- Tailwind CSS
- shadcn/ui components
- Recharts for analytics
- Axios for API calls

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- RentFlow backend running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8000
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_ENV=development
VITE_ENABLE_DEMO_MODE=true
VITE_USE_MOCK_DATA=false
```

## Project Structure

```
src/
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (Sidebar, Header)
│   ├── dashboard/         # Dashboard components
│   ├── leads/             # Lead components
│   ├── conversations/     # Conversation components
│   ├── properties/        # Property components
│   ├── reviews/           # Review queue components
│   └── demo/              # Demo modal
├── pages/
│   ├── Dashboard.tsx      # Main dashboard
│   ├── Leads.tsx          # Leads management
│   ├── Conversations.tsx  # Conversations
│   ├── Properties.tsx     # Properties
│   └── Reviews.tsx        # Review queue
├── lib/
│   ├── api/               # API client
│   ├── utils.ts           # Utilities
│   └── types.ts           # TypeScript types
├── hooks/                 # Custom React hooks
├── App.tsx                # Main app component
└── main.tsx               # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Backend Integration

Ensure your RentFlow FastAPI backend is running and CORS is configured to allow requests from `http://localhost:3000`.

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Environment Variables for Production

```env
VITE_API_URL=https://api.rentflow.in
VITE_API_BASE_URL=https://api.rentflow.in/api/v1
VITE_ENV=production
```

## License

Private - RentFlow Team
