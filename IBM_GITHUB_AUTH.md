# 🔐 IBM GitHub Authentication Guide

## Getting Your Credentials

### Username
Your username is: **Tariq-ElBahrawy**
(This is from your IBM GitHub profile URL)

### Password - Use Personal Access Token

IBM GitHub requires a **Personal Access Token** instead of your regular password for Git operations.

## How to Create a Personal Access Token

### Step 1: Go to IBM GitHub Settings
1. Go to https://github.ibm.com
2. Click your profile picture (top right)
3. Click **Settings**

### Step 2: Navigate to Developer Settings
1. Scroll down in the left sidebar
2. Click **Developer settings** (at the bottom)
3. Click **Personal access tokens**
4. Click **Tokens (classic)**

### Step 3: Generate New Token
1. Click **Generate new token** (or **Generate new token (classic)**)
2. You may need to authenticate with your IBM credentials
3. Fill in the form:
   - **Note**: `ibm-logo-gif deployment` (or any description)
   - **Expiration**: Choose duration (recommend 90 days or No expiration)
   - **Select scopes**: Check these boxes:
     - ✅ **repo** (Full control of private repositories)
     - ✅ **workflow** (Update GitHub Action workflows)

### Step 4: Generate and Copy Token
1. Click **Generate token** at the bottom
2. **IMPORTANT**: Copy the token immediately!
3. It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
4. **Save it somewhere safe** - you won't be able to see it again!

## Using the Token

When Git asks for credentials:

```
Username for 'https://github.ibm.com': Tariq-ElBahrawy
Password for 'https://Tariq-ElBahrawy@github.ibm.com': [paste your token here]
```

**Important**: 
- Use your **username** as username
- Use the **token** as password (NOT your IBM password)

## Push Your Code

Now run:
```bash
cd /Users/tariq/Desktop/ibm-logo-gif
git push -u origin main
```

When prompted:
- **Username**: `Tariq-ElBahrawy`
- **Password**: Paste your personal access token

## Alternative: SSH Keys (Recommended for Frequent Use)

If you push code often, SSH keys are more convenient:

### Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your.email@ibm.com"
```

### Add to IBM GitHub
1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Go to https://github.ibm.com/settings/keys
3. Click **New SSH key**
4. Paste your public key
5. Click **Add SSH key**

### Update Remote URL
```bash
cd /Users/tariq/Desktop/ibm-logo-gif
git remote set-url origin git@github.ibm.com:Tariq-ElBahrawy/ibm-logo-gif.git
git push -u origin main
```

## Troubleshooting

### "Authentication failed"
- Make sure you're using the **token** as password, not your IBM password
- Check that the token has the correct scopes (repo, workflow)
- Verify the token hasn't expired

### "Repository not found"
- First create the repository on https://github.ibm.com
- Make sure the repository name matches: `ibm-logo-gif`

### "Permission denied"
- Verify you have access to create repositories in your IBM GitHub account
- Check with your IBM GitHub admin if needed

## Quick Reference

**IBM GitHub URL**: https://github.ibm.com
**Your Profile**: https://github.ibm.com/Tariq-ElBahrawy
**Token Settings**: https://github.ibm.com/settings/tokens
**Repository URL**: https://github.ibm.com/Tariq-ElBahrawy/ibm-logo-gif

---

**Security Note**: Never share your personal access token. Treat it like a password!