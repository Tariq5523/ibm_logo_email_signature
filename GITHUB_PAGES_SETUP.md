# 🚀 GitHub Pages Setup - Deploy from Branch

Since GitHub Actions is disabled, we'll use the "Deploy from branch" method.

## 📋 Step-by-Step Instructions

### Step 1: Build Your App Locally

```bash
cd /Users/tariq/Desktop/ibm-logo-gif
npm run build
```

This creates a `dist` folder with all your built files.

---

### Step 2: Install gh-pages Package

```bash
npm install --save-dev gh-pages
```

---

### Step 3: Add Deploy Script to package.json

Add this script to your `package.json`:

```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

---

### Step 4: Deploy to gh-pages Branch

```bash
npm run deploy
```

This will:
1. Build your app
2. Create a `gh-pages` branch
3. Push the built files to that branch

---

### Step 5: Configure GitHub Pages

1. Go to: https://github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif
2. Click **"Settings"**
3. Click **"Pages"** (left sidebar)
4. Under **"Build and deployment"**:
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **"gh-pages"**
   - **Folder**: Select **"/ (root)"**
5. Click **"Save"**

---

### Step 6: Wait for Deployment

- GitHub will deploy your site (takes 1-2 minutes)
- Refresh the Pages settings page
- You'll see your live URL!

**Your site will be at:**
```
https://pages.github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif/
```

---

## 🔄 Making Updates

Whenever you make changes:

```bash
cd /Users/tariq/Desktop/ibm-logo-gif

# Make your code changes

# Deploy the updates
npm run deploy
```

The site will automatically update in 1-2 minutes!

---

## 🎯 Quick Commands

```bash
# Build locally
npm run build

# Deploy to GitHub Pages
npm run deploy

# Run locally for testing
npm run dev
```

---

## ✅ Checklist

- [ ] Run `npm install --save-dev gh-pages`
- [ ] Add deploy script to package.json
- [ ] Run `npm run deploy`
- [ ] Go to Settings → Pages
- [ ] Select "Deploy from a branch"
- [ ] Select "gh-pages" branch
- [ ] Wait for deployment
- [ ] Visit your live site!

---

## 🆘 Troubleshooting

### Issue: "gh-pages not found"
**Solution**: Run `npm install --save-dev gh-pages`

### Issue: Deploy fails
**Solution**: 
- Make sure `npm run build` works first
- Check you have push access to the repository
- Verify your IBM GitHub credentials

### Issue: Site shows 404
**Solution**:
- Wait 2-3 minutes after deployment
- Check Pages settings show the correct branch
- Verify the gh-pages branch exists in your repository

### Issue: Site loads but broken
**Solution**:
- Verify `vite.config.ts` has `base: '/ibm-logo-gif/'`
- Clear browser cache
- Check browser console for errors

---

## 📱 Share with Team

Once live, share this message:

```
🎉 IBM Logo GIF Generator is Live!

Generate animated IBM logos for email signatures.

🌐 Live App: https://pages.github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif/
📦 Source: https://github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif

Features:
✅ 4 professional animations (Pulse, Swing, Bounce, Slide)
✅ Live preview before download
✅ One-click GIF download
✅ Email-ready (200×200px transparent)
✅ Compatible with Gmail, Outlook, Apple Mail

Try it out! 🚀
```

---

## 🔐 Security

✅ **100% IBM Infrastructure** - Hosted on IBM GitHub Enterprise
✅ **No External Services** - Everything stays within IBM
✅ **Internal Access** - Only accessible within IBM network
✅ **Version Controlled** - All changes tracked in Git

---

**This method works perfectly when GitHub Actions is disabled!**