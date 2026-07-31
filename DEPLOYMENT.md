# Backend Deployment Guide

Your Green volunteer backend is configured and ready for production! Here's how to deploy:

## Quick Deploy Options

### 🚀 Option 1: Railway (Recommended - Easiest)

1. Go to https://railway.app/
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `lynphefry/green`
5. Configure environment variables in Railway dashboard:
   - `MONGODB_URI` → MongoDB Atlas connection string
   - `EMAIL_USER` → lynphefry@gmail.com
   - `EMAIL_PASSWORD` → Gmail App Password
   - `JWT_SECRET` → Random secret (e.g., `openssl rand -hex 32`)
   - `ADMIN_EMAIL` → lynphefry@gmail.com

Your backend will auto-deploy from the main branch!

---

### 🦅 Option 2: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create green-volunteer-backend

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set EMAIL_USER=lynphefry@gmail.com
heroku config:set EMAIL_PASSWORD=your_app_password
heroku config:set JWT_SECRET=your_secret_key
heroku config:set ADMIN_EMAIL=lynphefry@gmail.com

# Deploy
git push heroku main
```

---

### 🎨 Option 3: Render

1. Go to https://render.com/
2. Create new "Web Service"
3. Connect your GitHub repo
4. Build Command: `cd backend && npm install`
5. Start Command: `cd backend && npm start`
6. Add Environment Variables (same as Railway)
7. Deploy!

---

### ☁️ Option 4: Google Cloud Run

```bash
# Install Google Cloud SDK
curl https://sdk.cloud.google.com | bash

# Initialize
gcloud init

# Deploy
gcloud run deploy green-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated

# Set environment variables
gcloud run services update green-backend \
  --set-env-vars MONGODB_URI=your_uri,EMAIL_USER=lynphefry@gmail.com,etc...
```

---

## Prerequisites

### 1. MongoDB Atlas (Free Cloud Database)

```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create M0 Free Cluster
4. Create database user
5. Get connection string: mongodb+srv://user:pass@cluster.mongodb.net/green-volunteers?retryWrites=true&w=majority
6. Use as MONGODB_URI
```

### 2. Gmail App Password

```
1. Enable 2FA: https://myaccount.google.com/security
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Copy the 16-character password
5. Use as EMAIL_PASSWORD (lynphefry@gmail.com email)
```

### 3. Generate JWT Secret

```bash
# On Linux/Mac
openssl rand -hex 32

# On Windows
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Random -Maximum 1000000000000)))
```

---

## After Deployment

### Update Frontend URL

Once your backend is deployed, update your frontend to use the new API:

```javascript
// In volunteer.html or your frontend code
const API_URL = 'https://your-backend-url.com/api'; // Update this!

// Register form submission
document.getElementById('volunteerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const response = await fetch(`${API_URL}/volunteers/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      password: document.getElementById('password').value,
      availability: document.getElementById('availability').value,
      skills: document.getElementById('skills').value.split(',')
    })
  });
  
  const data = await response.json();
  if (response.ok) {
    alert('✅ Welcome to Green! Check your email for confirmation.');
  }
});
```

---

## API Endpoints Available

```
POST   /api/volunteers/register          - Register new volunteer
POST   /api/auth/login                   - Volunteer login
GET    /api/volunteers/profile           - Get profile (requires auth token)
PUT    /api/volunteers/profile           - Update profile (requires auth token)
POST   /api/messages/send                - Send message (requires auth token)
GET    /api/messages/my-messages         - Get messages (requires auth token)
POST   /api/messages/send-to-volunteer   - Admin send message to volunteer
```

---

## Email Notifications Flow

✅ **Volunteer Joins:**
- Volunteer receives welcome email
- Admin (lynphefry@gmail.com) receives notification

✅ **Volunteer Sends Message:**
- Admin receives email with message
- Volunteer can check inbox in dashboard

✅ **Admin Sends Message:**
- Volunteer receives email (if notifications enabled)
- Message stored in database

---

## Testing Locally

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your values
# MONGODB_URI=mongodb://localhost:27017/green-volunteers (or Atlas URI)
# EMAIL_USER=lynphefry@gmail.com
# EMAIL_PASSWORD=your_app_password
# JWT_SECRET=test_secret

# Start server
npm start

# Visit http://localhost:5000
```

---

## Troubleshooting

**Email not sending?**
- Check Gmail 2FA is enabled
- Verify App Password is correct
- Check ADMIN_EMAIL is lynphefry@gmail.com

**Database connection error?**
- Verify MONGODB_URI in environment variables
- Check MongoDB Atlas allows your IP

**Backend not starting?**
- Check logs in deployment dashboard
- Ensure all environment variables are set
- Run `npm install` locally to verify dependencies

---

## Next Steps

1. ✅ Choose a deployment platform (Railway recommended)
2. ✅ Set up MongoDB Atlas
3. ✅ Generate Gmail App Password
4. ✅ Deploy the backend
5. ✅ Update frontend API_URL
6. ✅ Test volunteer registration
7. ✅ Check email notifications work

Your backend is production-ready! 🎉
