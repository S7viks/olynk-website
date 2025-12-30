# Vercel Deployment Troubleshooting Guide

## Issues Fixed

### 1. Import Error
- **Problem**: `testSupabaseSetup` was being imported but didn't exist
- **Fix**: Removed the non-existent import from `App.tsx`

### 2. Build Configuration
- **Problem**: Missing TypeScript compilation step
- **Fix**: Updated build script to include `tsc && vite build`

### 3. Vercel Configuration
- **Problem**: Missing install command and function configuration
- **Fix**: Added `installCommand` and `functions` configuration

## Current Configuration

### package.json
```json
{
  "scripts": {
    "build": "tsc && vite build",
    "type-check": "tsc --noEmit"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "rewrites": [...],
  "headers": [...],
  "functions": {
    "src/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### vite.config.ts
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
  // ... other config
});
```

## Environment Variables

Make sure these are set in your Vercel project settings:

```env
VITE_SUPABASE_URL=https://bmfakoiiebmsgdtimwdu.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_KEY=your-service-key
```

## Deployment Steps

1. **Push your changes** to your Git repository
2. **Check Vercel dashboard** for build logs
3. **Verify environment variables** are set correctly
4. **Monitor deployment** for any new errors

## Common Issues and Solutions

### Build Fails with TypeScript Errors
```bash
# Run locally to check for TypeScript errors
npm run type-check
```

### Missing Dependencies
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Available
- Check Vercel project settings
- Ensure variables start with `VITE_`
- Redeploy after adding variables

### Build Timeout
- The build should complete within 5-10 minutes
- If it times out, check for infinite loops or heavy operations

## Local Testing

Before deploying, test locally:

```bash
# Install dependencies
npm install

# Type check
npm run type-check

# Build locally
npm run build

# Preview build
npm run preview
```

## Monitoring

After deployment:
1. Check the live site for any runtime errors
2. Monitor browser console for JavaScript errors
3. Verify all routes work correctly
4. Test authentication flow

## Rollback Plan

If deployment fails:
1. Check the previous successful deployment
2. Compare changes between versions
3. Revert problematic changes
4. Deploy again

## Support

If issues persist:
1. Check Vercel build logs for specific error messages
2. Verify all imports and exports are correct
3. Ensure all components exist and are properly exported
4. Test with a minimal build first 