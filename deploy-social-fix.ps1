# Social Media Preview Fix - Deployment Script
# Run this script to deploy the fixes to Vercel

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "OLYNK - Social Media Preview Fix" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

Write-Host "Step 1: Checking Git status..." -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "Step 2: Adding changes to Git..." -ForegroundColor Yellow
git add index.html dist/index.html vercel.json public/_headers SOCIAL_PREVIEW_FIX.md public/assets/olynk-social-preview.png

Write-Host ""
Write-Host "Step 3: Committing changes..." -ForegroundColor Yellow
git commit -m "Fix social media preview meta tags with absolute URLs and Vercel config"

Write-Host ""
Write-Host "Step 4: Pushing to GitHub (triggers Vercel deployment)..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Deployment initiated!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Wait 2-3 minutes for Vercel deployment to complete" -ForegroundColor White
Write-Host "2. Clear social media caches:" -ForegroundColor White
Write-Host "   - Facebook: https://developers.facebook.com/tools/debug/" -ForegroundColor Gray
Write-Host "   - Twitter: https://cards-dev.twitter.com/validator" -ForegroundColor Gray
Write-Host "   - LinkedIn: https://www.linkedin.com/post-inspector/" -ForegroundColor Gray
Write-Host "3. Test sharing https://www.olynkai.com/ on each platform" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see: SOCIAL_PREVIEW_FIX.md" -ForegroundColor Cyan
Write-Host ""
