#!/bin/bash

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

# Check for JavaScript files in dist
echo "🔍 Checking build output..."
if [ ! -f "dist/index.html" ]; then
    echo "❌ Build failed - index.html not found in dist"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output:"
ls -la dist/

echo "🚀 Ready for deployment!"
echo "💡 Run 'vercel --prod' to deploy to production" 