# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd /Users/vastav.bishnoi/Desktop/Rentflow-Frontend
vercel
```

4. Set environment variables in Vercel dashboard:
   - `VITE_API_URL` = Your backend URL
   - `VITE_API_BASE_URL` = Your backend URL + /api/v1
   - `VITE_ENV` = production

### Option 2: Deploy via Vercel Dashboard

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Add environment variables
7. Deploy

## Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

3. Login and deploy:
```bash
netlify login
netlify deploy --prod --dir=dist
```

Or use Netlify Dashboard:
1. Drag and drop `dist/` folder
2. Configure environment variables
3. Deploy

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm i -D gh-pages
```

2. Update `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repository-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

## Environment Variables for Production

```env
VITE_API_URL=https://api.rentflow.in
VITE_API_BASE_URL=https://api.rentflow.in/api/v1
VITE_ENV=production
VITE_ENABLE_DEMO_MODE=true
```

## Backend CORS Configuration for Production

Update your FastAPI backend:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend-domain.vercel.app",
        "https://your-custom-domain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Custom Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL is automatic

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records
4. Enable HTTPS

## Performance Optimization

Already included:
- Vite code splitting
- Tree shaking
- Minification
- Lazy loading

Additional optimizations:
1. Enable gzip compression (automatic on Vercel/Netlify)
2. Add CDN for static assets
3. Optimize images
4. Enable caching headers

## Monitoring

Recommended tools:
- **Vercel Analytics** - Built-in performance monitoring
- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **LogRocket** - Session replay

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Health Checks

The app includes:
- Automatic API fallback to mock data
- Error boundaries
- Loading states
- Graceful degradation

## Rollback Strategy

### Vercel
- Go to Deployments
- Select previous deployment
- Click "Promote to Production"

### Manual
- Keep previous `dist/` folder
- Re-deploy old version

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test API connectivity
- [ ] Check demo modal works
- [ ] Verify responsive design on mobile
- [ ] Test all CRUD operations
- [ ] Check browser console for errors
- [ ] Test with backend API
- [ ] Verify CORS is working
- [ ] Test authentication (if implemented)
- [ ] Check analytics tracking

## Production URLs

- Frontend: https://your-app.vercel.app
- Backend API: https://your-backend.railway.app
- Custom Domain: https://app.rentflow.in

## Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- GitHub Pages: https://pages.github.com

