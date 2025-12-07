#!/bin/bash

echo "🔐 GitHub Authentication Fix"
echo "=============================="
echo ""
echo "Follow these steps:"
echo ""
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click 'Generate new token (classic)'"
echo "3. Give it a name: 'RentFlow CRM Deploy'"
echo "4. Select scope: ✓ repo (all)"
echo "5. Generate and COPY the token"
echo ""
echo -n "6. Paste your GitHub token here: "
read -s GITHUB_TOKEN
echo ""
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ No token provided. Exiting."
    exit 1
fi

echo "📝 Updating git remote..."
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/Vastav1812/Rentflow-Frontend.git"

echo "✅ Remote updated!"
echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "Next step: Deploy to Vercel"
    echo "1. Go to: https://vercel.com/new"
    echo "2. Import: Vastav1812/Rentflow-Frontend"
    echo "3. Deploy!"
else
    echo ""
    echo "❌ Push failed. Check token permissions."
fi

