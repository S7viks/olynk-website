#!/bin/bash

echo "🔧 Fixing MIME type and manifest issues..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

# Check for manifest.json
if [ ! -f "dist/manifest.json" ]; then
    echo "❌ Build failed - manifest.json not found in dist"
    exit 1
fi

# Check for JavaScript files
if [ ! -d "dist/assets" ]; then
    echo "❌ Build failed - assets directory not found in dist"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output:"
ls -la dist/

echo "🚀 Ready for deployment!"
echo "💡 Run 'vercel --prod' to deploy to production"
echo ""
echo "🔧 MIME Type Fixes Applied:"
echo "- Added proper Content-Type headers for JavaScript files"
echo "- Added proper Content-Type headers for CSS files"
echo "- Added proper Content-Type headers for manifest.json"
echo "- Created _headers file for additional MIME type control" 