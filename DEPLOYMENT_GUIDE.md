# 🚀 IBM GitHub Enterprise Deployment Guide

Follow these steps to deploy your IBM Logo GIF Generator to IBM's GitHub Enterprise.

## Step 1: Create Repository on IBM GitHub

1. Go to [IBM GitHub Enterprise](https://github.ibm.com)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `ibm-logo-gif`
   - **Description**: "IBM Logo GIF Generator for email signatures"
   - **Visibility**: Choose based on your department's policy
   - **DO NOT** initialize with README (we already have one)
4. Click **"Create repository"**

## Step 2: Push Your Code to IBM GitHub

Run these commands in your terminal:

```bash
cd /Users/tariq/Desktop/ibm-logo-gif

# Add the IBM GitHub remote
git remote add origin https://github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif.git

# Push your code
git branch -M main
git push -u origin main
```

When prompted, enter your IBM credentials (W3ID and password).

## Step 3: Enable GitHub Pages (if available)

**Note**: GitHub Pages availability depends on your IBM GitHub Enterprise configuration.

1. Go to your repository: `https://github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif`
2. Click **"Settings"** (top menu)
3. Look for **"Pages"** in the left sidebar
4. If available:
   - **Source**: Select "GitHub Actions"
   - The deployment will start automatically

## Alternative: Deploy to IBM Cloud or Internal Hosting

If GitHub Pages is not available on IBM's GitHub Enterprise, you have these options:

### Option A: IBM Cloud Foundry
```bash
# Build the app
npm run build

# Deploy to IBM Cloud (requires IBM Cloud CLI)
ibmcloud cf push ibm-logo-gif -p dist
```

### Option B: Share the Built Files
```bash
# Build the app
npm run build

# The 'dist' folder contains all files
# Upload to your internal web server or file share
```

### Option C: Run Locally and Share
Team members can run it locally:
```bash
git clone https://github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif.git
cd ibm-logo-gif
npm install
npm run dev
```

## Step 4: Share with Your Department

### Via Slack:
```
🎉 New Tool: IBM Logo GIF Generator

I've created a tool to generate animated IBM logos for email signatures!

📦 Repository: https://github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif

Features:
✅ 4 animation styles (Pulse, Swing, Bounce, Slide)
✅ Live preview
✅ One-click download
✅ Email-ready (Gmail, Outlook, Apple Mail)

[Instructions for accessing the tool based on deployment method]
```

## 🔄 Making Updates

Whenever you make changes:

```bash
cd /Users/tariq/Desktop/ibm-logo-gif

# Stage changes
git add .

# Commit
git commit -m "Description of changes"

# Push to IBM GitHub
git push
```

## 📋 Quick Commands Reference

```bash
# Clone the repository
git clone https://github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🆘 Troubleshooting

### Issue: Authentication fails
**Solution**: 
- Use your IBM W3ID credentials
- If using 2FA, you may need a personal access token
- Go to: Settings → Developer settings → Personal access tokens

### Issue: GitHub Pages not available
**Solution**: 
- Contact your IBM GitHub admin to enable Pages
- Or use alternative deployment methods above

### Issue: Repository not found
**Solution**: 
- Verify the URL: `https://github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif`
- Check repository visibility settings
- Ensure you have access permissions

## 📝 Repository Information

- **Owner**: Tariq-ElBahrawy
- **Repository**: ibm-logo-gif
- **URL**: https://github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif
- **Type**: IBM GitHub Enterprise

## 🔐 Security Notes

- This repository is hosted on IBM's internal GitHub Enterprise
- Follow IBM's security and compliance guidelines
- Do not include sensitive information in the code
- Review IBM's open source and code sharing policies

---

For IBM GitHub Enterprise support, contact your IT department or check internal documentation.