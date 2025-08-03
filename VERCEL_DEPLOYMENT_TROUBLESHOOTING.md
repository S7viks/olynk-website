# Vercel Deployment Troubleshooting Guide

## MIME Type Error Fix

If you're seeing this error:
```
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html"
```

### Solution Steps:

1. **Clear Vercel Cache**
   ```bash
   vercel --clear-cache
   ```

2. **Redeploy with Force**
   ```bash
   vercel --prod --force
   ```

3. **Check Build Output**
   - Ensure `dist/index.html` exists
   - Verify JavaScript files are in `dist/assets/`
   - Check that all assets have proper file extensions

4. **Verify Configuration Files**
   - `vercel.json` has proper headers for JavaScript files
   - `public/_headers` file is present for MIME type control
   - `vite.config.ts` is configured for production

### Manifest.json 401 Error Fix

If you're seeing this error:
```
manifest.json:1 Failed to load resource: the server responded with a status of 401
```

### Solution Steps:

1. **Check manifest.json exists**
   - Ensure `public/manifest.json` is present
   - Verify it's copied to `dist/manifest.json` after build

2. **Add proper headers**
   - `vercel.json` includes headers for manifest.json
   - `public/_headers` includes Content-Type for manifest.json

3. **Redeploy**
   ```bash
   vercel --prod --force
   ```

### Configuration Files Updated:

1. **vercel.json** - Added proper MIME type headers
2. **public/_redirects** - Added routing rules
3. **vite.config.ts** - Optimized for production builds

### Manual Deployment Steps:

1. Run the deployment script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

3. If issues persist, try:
   ```bash
   vercel --prod --force --clear-cache
   ```

### Common Issues:

1. **Module Loading Error**: Usually caused by incorrect MIME types
2. **404 Errors**: Check routing configuration
3. **Build Failures**: Verify all dependencies are installed

### Debugging:

1. Check Vercel deployment logs
2. Verify build output locally: `npm run build && npm run preview`
3. Test with different browsers/devices

### Support:

If issues persist, check:
- Vercel deployment logs
- Browser developer console
- Network tab for failed requests 