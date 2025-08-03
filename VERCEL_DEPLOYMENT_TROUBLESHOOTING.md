# Vercel Deployment Troubleshooting Guide

## 🚨 **Current Issue: App works locally but not on Vercel**

### **Step 1: Check Environment Variables**

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Find your project: `olynk-website-git-main-sathviks-projects-f8750398`

2. **Navigate to Environment Variables**
   - Click on your project
   - Go to **Settings** tab
   - Click **Environment Variables**

3. **Add Required Variables**
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_SUPABASE_SERVICE_KEY=your-service-key
   ```

### **Step 2: Check Build Logs**

1. **Go to Deployments**
   - Click **Deployments** tab
   - Click on the latest deployment
   - Check **Build Logs** for errors

2. **Common Build Issues**
   - Missing environment variables
   - Build timeout
   - Memory issues
   - TypeScript errors

### **Step 3: Force Redeploy**

1. **Redeploy Current Version**
   - Go to **Deployments** tab
   - Click **Redeploy** on latest deployment

2. **Or Push New Commit**
   ```bash
   git add .
   git commit -m "Fix deployment issues"
   git push
   ```

### **Step 4: Verify Environment Variables**

After deployment, check browser console for:
```
🔧 Environment Variables Check:
VITE_SUPABASE_URL: ✅ Set
VITE_SUPABASE_ANON_KEY: ✅ Set
VITE_SUPABASE_SERVICE_KEY: ✅ Set
✅ All environment variables are set
```

### **Step 5: Test Supabase Connection**

Look for these console messages:
```
🔧 Testing Supabase connection with configured credentials...
✅ Supabase connection successful
🔧 Supabase URL: https://your-project.supabase.co
```

## 🔧 **Common Issues & Solutions**

### **Issue 1: Environment Variables Not Loading**
**Symptoms:**
- Console shows "❌ Missing environment variables"
- Supabase connection fails

**Solution:**
1. Double-check variable names (must start with `VITE_`)
2. Ensure variables are set for all environments (Production, Preview, Development)
3. Redeploy after adding variables

### **Issue 2: Build Fails**
**Symptoms:**
- Deployment shows "Build Failed"
- Error in build logs

**Solution:**
1. Check for TypeScript errors
2. Verify all imports are correct
3. Check for missing dependencies

### **Issue 3: App Shows Blank Page**
**Symptoms:**
- Page loads but shows nothing
- No console errors

**Solution:**
1. Check if React app is mounting
2. Verify routing is working
3. Check for JavaScript errors

### **Issue 4: Supabase Connection Fails**
**Symptoms:**
- "❌ Supabase connection failed" in console
- Authentication doesn't work

**Solution:**
1. Verify Supabase project is active
2. Check API keys are correct
3. Ensure CORS settings include your Vercel domain

## 🚀 **Quick Fix Checklist**

- [ ] Environment variables set in Vercel dashboard
- [ ] Variables include `VITE_` prefix
- [ ] Variables set for all environments
- [ ] Redeployed after adding variables
- [ ] Checked browser console for errors
- [ ] Verified Supabase project is active
- [ ] Tested local development works

## 📞 **Debugging Steps**

### **1. Check Environment Variables**
```javascript
// In browser console
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);
```

### **2. Test Supabase Connection**
```javascript
// In browser console
import { supabase } from './src/supabase';
supabase.auth.getSession().then(console.log);
```

### **3. Check Build Output**
- Look at Vercel build logs
- Check for any error messages
- Verify all files are being built

## 🎯 **Expected Results**

After fixing the issues, you should see:
- ✅ Environment variables loading correctly
- ✅ Supabase connection successful
- ✅ App renders properly
- ✅ Authentication working
- ✅ No console errors

## 📞 **Need More Help?**

1. **Check Vercel Documentation**: https://vercel.com/docs
2. **Check Supabase Documentation**: https://supabase.com/docs
3. **Review Build Logs**: Look for specific error messages
4. **Test Locally**: Ensure everything works in development

## 🔄 **Next Steps**

Once deployment is working:
1. Set up your Supabase database using `database_schema.sql`
2. Test authentication functionality
3. Verify all forms are working
4. Check admin dashboard access 