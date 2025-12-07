#!/bin/bash

# RentFlow CRM - Quick Deploy to Vercel Script
# Run this script to deploy your app to Vercel

echo "🚀 RentFlow CRM - Vercel Deployment Script"
echo "=========================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed!"
    echo ""
fi

# Login to Vercel
echo "🔐 Logging into Vercel..."
vercel login

# Deploy
echo ""
echo "🚢 Deploying to production..."
echo ""

vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Visit your deployed URL (shown above)"
echo "2. Test all features (Add Lead, Add Property, Demo)"
echo "3. Share the URL for your demo"
echo ""
echo "💡 To add custom domain:"
echo "   Go to Vercel Dashboard → Your Project → Settings → Domains"
echo ""

