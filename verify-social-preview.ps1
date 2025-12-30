# Social Media Preview Verification Script
# Run this AFTER deployment to verify everything is working

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "OLYNK - Social Preview Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$url = "https://olynk.ai"
$imageUrl = "https://olynk.ai/assets/Olynk_Logo.png"

Write-Host "Testing: $url" -ForegroundColor Yellow
Write-Host ""

# Test 1: Check if site is accessible
Write-Host "[1/4] Checking site accessibility..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✓ Site is accessible (HTTP 200)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Unexpected status: $($response.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "  ✗ Site not accessible: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Check if image is accessible
Write-Host "[2/4] Checking social share image..." -ForegroundColor Yellow
try {
    $imageResponse = Invoke-WebRequest -Uri $imageUrl -Method Head -UseBasicParsing
    if ($imageResponse.StatusCode -eq 200) {
        Write-Host "  ✓ Image is accessible (HTTP 200)" -ForegroundColor Green
        $contentType = $imageResponse.Headers.'Content-Type'
        Write-Host "  ✓ Content-Type: $contentType" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Image not accessible: $($imageResponse.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "  ✗ Image not accessible: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Check meta tags in HTML
Write-Host "[3/4] Checking Open Graph meta tags..." -ForegroundColor Yellow
try {
    $htmlResponse = Invoke-WebRequest -Uri $url -UseBasicParsing
    $html = $htmlResponse.Content
    
    # Check for og:image
    if ($html -match 'og:image.*content="(https://[^"]+)"') {
        $ogImage = $matches[1]
        Write-Host "  ✓ og:image found: $ogImage" -ForegroundColor Green
        
        if ($ogImage -like "https://*") {
            Write-Host "  ✓ Using absolute URL" -ForegroundColor Green
        } else {
            Write-Host "  ✗ Not using absolute URL" -ForegroundColor Red
        }
    } else {
        Write-Host "  ✗ og:image not found or using relative URL" -ForegroundColor Red
    }
    
    # Check for og:title
    if ($html -match 'og:title.*content="([^"]+)"') {
        Write-Host "  ✓ og:title found: $($matches[1])" -ForegroundColor Green
    } else {
        Write-Host "  ✗ og:title not found" -ForegroundColor Red
    }
    
    # Check for og:description
    if ($html -match 'og:description.*content="([^"]+)"') {
        Write-Host "  ✓ og:description found" -ForegroundColor Green
    } else {
        Write-Host "  ✗ og:description not found" -ForegroundColor Red
    }
    
    # Check for twitter:card
    if ($html -match 'twitter:card.*content="([^"]+)"') {
        Write-Host "  ✓ twitter:card found: $($matches[1])" -ForegroundColor Green
    } else {
        Write-Host "  ✗ twitter:card not found" -ForegroundColor Red
    }
    
} catch {
    Write-Host "  ✗ Could not fetch HTML: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Instructions for manual testing
Write-Host "[4/4] Manual Testing Required" -ForegroundColor Yellow
Write-Host "  Please test on these platforms:" -ForegroundColor White
Write-Host ""
Write-Host "  Facebook Debugger:" -ForegroundColor Cyan
Write-Host "  https://developers.facebook.com/tools/debug/" -ForegroundColor Gray
Write-Host "  1. Enter: $url" -ForegroundColor Gray
Write-Host "  2. Click 'Scrape Again'" -ForegroundColor Gray
Write-Host "  3. Verify preview shows logo and description" -ForegroundColor Gray
Write-Host ""
Write-Host "  Twitter Card Validator:" -ForegroundColor Cyan
Write-Host "  https://cards-dev.twitter.com/validator" -ForegroundColor Gray
Write-Host "  1. Enter: $url" -ForegroundColor Gray
Write-Host "  2. Click 'Preview card'" -ForegroundColor Gray
Write-Host "  3. Verify card shows correctly" -ForegroundColor Gray
Write-Host ""
Write-Host "  LinkedIn Post Inspector:" -ForegroundColor Cyan
Write-Host "  https://www.linkedin.com/post-inspector/" -ForegroundColor Gray
Write-Host "  1. Enter: $url" -ForegroundColor Gray
Write-Host "  2. Click 'Inspect'" -ForegroundColor Gray
Write-Host "  3. Verify preview shows correctly" -ForegroundColor Gray
Write-Host ""
Write-Host "  Generic Preview Tool:" -ForegroundColor Cyan
Write-Host "  https://www.opengraph.xyz/" -ForegroundColor Gray
Write-Host "  1. Enter: $url" -ForegroundColor Gray
Write-Host "  2. View preview across all platforms" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verification Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If all tests passed, your social previews should work!" -ForegroundColor Green
Write-Host "Remember to clear social media caches using the tools above." -ForegroundColor Yellow
Write-Host ""
