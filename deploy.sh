#!/bin/bash

# OLYNK Deployment Script
# This script helps ensure a successful deployment to Vercel

echo "🚀 Starting OLYNK deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Found package.json"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist node_modules/.vite

# Install dependencies
print_status "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

# Type check
print_status "Running TypeScript type check..."
npm run type-check

if [ $? -ne 0 ]; then
    print_error "TypeScript type check failed"
    exit 1
fi

# Lint check
print_status "Running ESLint..."
npm run lint

if [ $? -ne 0 ]; then
    print_warning "ESLint found issues, but continuing with deployment..."
fi

# Build the project
print_status "Building project..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi

# Check if dist directory was created
if [ ! -d "dist" ]; then
    print_error "Build output directory 'dist' not found"
    exit 1
fi

# Check for critical files
print_status "Verifying build output..."
if [ ! -f "dist/index.html" ]; then
    print_error "dist/index.html not found"
    exit 1
fi

if [ ! -d "dist/assets" ]; then
    print_error "dist/assets directory not found"
    exit 1
fi

print_status "Build verification completed successfully"

# Check environment variables (if .env.local exists)
if [ -f ".env.local" ]; then
    print_status "Checking environment variables..."
    if grep -q "VITE_SUPABASE_URL" .env.local; then
        print_status "VITE_SUPABASE_URL is set"
    else
        print_warning "VITE_SUPABASE_URL not found in .env.local"
    fi
    
    if grep -q "VITE_SUPABASE_ANON_KEY" .env.local; then
        print_status "VITE_SUPABASE_ANON_KEY is set"
    else
        print_warning "VITE_SUPABASE_ANON_KEY not found in .env.local"
    fi
else
    print_warning ".env.local not found - make sure environment variables are set in Vercel"
fi

# Check Vercel configuration
if [ -f "vercel.json" ]; then
    print_status "vercel.json found"
else
    print_warning "vercel.json not found - using default Vercel configuration"
fi

print_status "Local build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Push your changes to Git: git push"
echo "2. Check Vercel dashboard for deployment status"
echo "3. Verify environment variables are set in Vercel project settings"
echo "4. Monitor the deployment logs for any issues"
echo ""
echo "🔧 If deployment fails:"
echo "- Check Vercel build logs for specific error messages"
echo "- Verify all environment variables are set correctly"
echo "- Ensure all dependencies are properly installed"
echo "- Run 'npm run type-check' locally to catch TypeScript errors"
echo ""
print_status "Deployment script completed successfully!" 