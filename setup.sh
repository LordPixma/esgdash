#!/bin/bash

# ESGDash Setup Script
# This script helps set up the development environment

set -e

echo "🚀 Setting up ESGDash..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Build shared package
echo ""
echo "🔨 Building shared package..."
cd packages/shared
npm run build
cd ../..

# Setup API environment
echo ""
echo "⚙️  Setting up API environment..."
if [ ! -f "apps/api/.dev.vars" ]; then
    cp apps/api/.dev.vars.example apps/api/.dev.vars
    echo "📝 Created apps/api/.dev.vars - Please add your FRED API key"
else
    echo "✅ API environment file already exists"
fi

# Setup web environment
echo ""
echo "⚙️  Setting up web environment..."
if [ ! -f "apps/web/.env.local" ]; then
    cp apps/web/.env.example apps/web/.env.local
    echo "✅ Created apps/web/.env.local"
else
    echo "✅ Web environment file already exists"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Get a FRED API key from https://fred.stlouisfed.org/docs/api/api_key.html"
echo "2. Add your API key to apps/api/.dev.vars"
echo "3. Run 'cd apps/api && npm run dev' to start the API"
echo "4. In another terminal, run 'cd apps/web && npm run dev' to start the frontend"
echo ""
echo "📖 For more information, see README.md and DEVELOPMENT.md"
