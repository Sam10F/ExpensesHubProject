# 🚀 Deployment Guide: ExpensesHub PWA

**Last Updated:** 2025-10-03  
**Status:** Production Ready

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas production cluster created
- [ ] Environment variables prepared
- [ ] Hosting account created (Vercel/Netlify)
- [ ] Domain name ready (optional)
- [ ] All tests passing locally
- [ ] Code linted and formatted
- [ ] Build succeeds without errors

---

## 🌐 Option 1: Deploy to Vercel (Recommended)

### Why Vercel?

- Excellent Nuxt 3 support
- Automatic HTTPS and CDN
- Zero configuration
- Edge functions for API routes
- Free tier sufficient for MVP

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
# From project root
vercel

# Follow prompts:
# - Setup and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name: expenseshub-pwa
# - Directory: ./
# - Override settings? No
```

### Step 4: Configure Environment Variables

In Vercel dashboard (https://vercel.com/dashboard):

1. Go to your project
2. Settings → Environment Variables
3. Add variables:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB_NAME = expenseshub_prod
NUXT_PUBLIC_APP_URL = https://your-domain.vercel.app
```

### Step 5: Redeploy

```bash
vercel --prod
```

---

## 🔷 Option 2: Deploy to Netlify

### Step 1: Install Netlify CLI

```bash
npm i -g netlify-cli
```

### Step 2: Login

```bash
netlify login
```

### Step 3: Initialize

```bash
netlify init
```

### Step 4: Configure Build Settings

In `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".output/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 5: Set Environment Variables

```bash
netlify env:set MONGODB_URI "mongodb+srv://..."
netlify env:set MONGODB_DB_NAME "expenseshub_prod"
netlify env:set NUXT_PUBLIC_APP_URL "https://your-domain.netlify.app"
```

### Step 6: Deploy

```bash
netlify deploy --prod
```

---

## 🗄️ MongoDB Atlas Production Setup

### Step 1: Create Production Cluster

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Create new cluster (M0 free tier or paid)
3. Name: `ExpensesHub-Prod`
4. Region: Choose closest to your hosting

### Step 2: Configure Network Access

1. Network Access → Add IP Address
2. Add: `0.0.0.0/0` (allow from anywhere)
   - Or add specific Vercel/Netlify IPs for better security

### Step 3: Create Database User

1. Database Access → Add New Database User
2. Username: `expenseshub_prod`
3. Password: Generate secure password
4. Role: Read and write to any database

### Step 4: Get Connection String

1. Click "Connect" → "Connect your application"
2. Copy connection string
3. Replace `<password>` with your database password

---

## 🔒 Security Checklist

- [ ] MongoDB connection string uses strong password
- [ ] Environment variables never committed to git
- [ ] MongoDB network access restricted (if possible)
- [ ] HTTPS enforced in production
- [ ] Error messages don't expose sensitive data
- [ ] npm audit run and vulnerabilities fixed
- [ ] CSP headers configured
- [ ] Rate limiting considered (future enhancement)

---

## ✅ Post-Deployment Verification

### Test Core Features

1. **Landing Page**
   - [ ] Add transaction works
   - [ ] Transactions display correctly
   - [ ] Delete transaction works
   - [ ] CSV export downloads
   - [ ] Available money calculates correctly

2. **Charts Page**
   - [ ] All 4 chart types render
   - [ ] Data type toggle works
   - [ ] Period selector works
   - [ ] Charts display correct data

3. **Settings Page**
   - [ ] Categories display
   - [ ] Add category works
   - [ ] Default categories present

4. **Navigation**
   - [ ] Bottom nav works
   - [ ] Settings icon works
   - [ ] Active states correct

5. **PWA**
   - [ ] App installable on mobile
   - [ ] Icons display correctly
   - [ ] Service worker registered
   - [ ] Offline mode works

### Performance Testing

```bash
# Run Lighthouse audit
npm run build
npm run preview

# Then in Chrome DevTools:
# - Open Lighthouse tab
# - Run audit
# - Check Core Web Vitals
```

**Targets:**

- Performance: > 90
- Accessibility: 100
- Best Practices: > 90
- SEO: > 80
- PWA: Installable

---

## 📊 Monitoring Setup (Optional)

### Option 1: Vercel Analytics

```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to nuxt.config.ts
modules: ['@vercel/analytics/nuxt']
```

### Option 2: Sentry Error Tracking

```bash
# Install Sentry
npm install @sentry/nuxt

# Configure in nuxt.config.ts
```

---

## 🔄 Continuous Deployment

### Vercel

Automatic deployment on git push:

1. Connect GitHub repository in Vercel dashboard
2. Set branch: `main` or `master`
3. Auto-deploy enabled by default

### Netlify

Automatic deployment:

1. Connect GitHub repository
2. Set branch to deploy
3. Configure build settings

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem:** Can't connect to MongoDB Atlas

**Solutions:**

- Check IP whitelist in Atlas
- Verify connection string is correct
- Check database user has correct permissions
- Test connection string with MongoDB Compass

### Build Failures

**Problem:** Build fails on hosting platform

**Solutions:**

- Run `npm run build` locally first
- Check Node.js version (18.x required)
- Verify all dependencies installed
- Check build logs for specific errors

### PWA Not Installing

**Problem:** Install prompt doesn't appear

**Solutions:**

- Check manifest.json is accessible
- Verify HTTPS is enabled
- Check service worker registration
- Test on different browsers/devices

---

## 📈 Scaling Considerations

### When to Upgrade

**MongoDB:**

- Free tier: 512MB storage (~2500 users)
- Upgrade when: > 400MB used or slow queries

**Hosting:**

- Vercel/Netlify free tier: 100GB bandwidth/month
- Upgrade when: > 80GB bandwidth used

### Performance Optimization

If performance degrades:

1. Enable MongoDB Atlas indexes
2. Implement Redis caching layer
3. Add CDN for static assets
4. Optimize images (WebP, lazy loading)
5. Implement virtual scrolling for large lists

---

## 🎉 Launch Checklist

- [ ] Production MongoDB cluster configured
- [ ] Environment variables set in hosting
- [ ] Application deployed successfully
- [ ] All features tested in production
- [ ] PWA installable on mobile devices
- [ ] Core Web Vitals meeting targets
- [ ] Error tracking configured (optional)
- [ ] Analytics configured (optional)
- [ ] Documentation up to date
- [ ] Backup strategy in place
- [ ] Team trained on maintenance procedures

---

## 📞 Support

If issues arise:

1. Check application logs in hosting dashboard
2. Check MongoDB Atlas logs
3. Review error tracking service (if configured)
4. Test locally to reproduce issues
5. Check GitHub Actions CI/CD logs

---

**Your ExpensesHub PWA is ready for production!** 🚀

**Next:** Monitor usage, collect feedback, plan Phase 2 features.
