# 🚂 Deploy to Railway - Step by Step

## **What is Railway?**
Railway is a modern cloud platform that auto-deploys from GitHub. It's free to start and handles all the DevOps for you.

---

## **Step 1: Sign In to Railway with GitHub**

1. Go to https://railway.app
2. Click **"Deploy Now"**
3. Click **"GitHub"** to sign in
4. Authorize Railway to access your GitHub account
5. You'll land in your Railway dashboard

---

## **Step 2: Create a New Project**

1. Click **"New Project"** (top right corner)
2. Select **"Deploy from GitHub repo"**

---

## **Step 3: Connect Your Repository**

1. Search for and select **`lynphefry/green`**
2. Click **"Deploy Now"**
3. Railway will create a new project

---

## **Step 4: Configure Environment Variables**

Railway needs your secrets to run the backend. Here's where to get them:

### A. MongoDB URI (Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free) → Create a cluster (M0 free tier)
3. Click **"Connect"** → **"Connect your application"**
4. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/green-volunteers?retryWrites=true&w=majority
   ```
5. Replace `username` and `password` with your MongoDB user

### B. Gmail App Password (Email)

1. Go to https://myaccount.google.com/apppasswords
2. Select **"Mail"** and **"Windows Computer"**
3. Copy the 16-character password
4. This is your `EMAIL_PASSWORD`

### C. JWT Secret (Generate Random)

Use any random string, e.g.:
```
your_random_secret_key_12345
```

---

## **Step 5: Add Variables in Railway**

In your Railway project dashboard:

1. Click **"Variables"** tab
2. Add these variables:

| Variable | Value |
|----------|-------|
| `PORT` | `5000` |
| `MONGODB_URI` | MongoDB connection string from step A |
| `EMAIL_USER` | `lynphefry@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password from step B |
| `EMAIL_SERVICE` | `gmail` |
| `ADMIN_EMAIL` | `lynphefry@gmail.com` |
| `JWT_SECRET` | Random string from step C |
| `FRONTEND_URL` | `https://green-pi-wine.vercel.app` |
| `NODE_ENV` | `production` |

3. Click **"Save"**

---

## **Step 6: Configure Build Settings (If Needed)**

If Railway doesn't auto-detect the backend folder:

1. Click **"Settings"**
2. Find **"Build & Deploy"**
3. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

---

## **Step 7: Watch the Deployment**

1. Click **"Build"** or **"Deployments"** tab
2. Watch the logs scroll by
3. When you see **"Server running on port 5000"**, it's live! ✅

---

## **Step 8: Get Your Live API URL**

1. Click the **"Domains"** tab
2. Copy your Railway domain (looks like: `https://green-volunteer-backend-prod.up.railway.app`)
3. This is your **API_URL** for the frontend!

---

## **Step 9: Update Your Frontend**

In your `volunteer.html` or frontend code:

```javascript
// Replace with your Railway URL
const API_URL = 'https://green-volunteer-backend-prod.up.railway.app/api';

// Example: Register volunteer
async function registerVolunteer(event) {
  event.preventDefault();
  
  const formData = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    password: document.getElementById('password').value,
    availability: document.getElementById('availability').value,
    skills: document.getElementById('skills').value.split(',').map(s => s.trim())
  };

  try {
    const response = await fetch(`${API_URL}/volunteers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (response.ok) {
      alert('✅ Welcome to Green! Check your email for confirmation.');
      document.getElementById('volunteerForm').reset();
    } else {
      alert('❌ Error: ' + data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Failed to register. Please try again.');
  }
}
```

---

## **Step 10: Test It Out!**

1. Go to your frontend at https://green-pi-wine.vercel.app
2. Fill out the volunteer registration form
3. Submit the form
4. Check your email (lynphefry@gmail.com) for:
   - Welcome email sent to volunteer
   - New volunteer notification email sent to admin

✅ **If both emails arrive, your backend is working perfectly!**

---

## **Auto-Deployment**

Railway watches your GitHub repo:
- Every time you push to `main` branch → **Auto-deploys** ✅
- No manual deployment needed
- Logs available in Railway dashboard

---

## **Troubleshooting**

### **Build Failed?**
- Check Railway logs for error messages
- Verify all environment variables are set
- Make sure `backend/package.json` exists

### **Emails not sending?**
- Verify `EMAIL_PASSWORD` is correct (16-char app password)
- Check `ADMIN_EMAIL` is `lynphefry@gmail.com`
- Make sure Gmail 2FA is enabled

### **Database connection error?**
- Test MongoDB URI locally first
- Check MongoDB Atlas allows your IP (or set to 0.0.0.0/0 for testing)
- Verify username/password in URI

### **API returns 404?**
- Make sure frontend is calling correct URL
- Check Railway domain in Railway dashboard
- Verify backend is running in Railway logs

---

## **Next Features to Add**

After deployment, you can add:
- Admin dashboard to manage volunteers
- Message history display
- Volunteer profile pages
- Email template customization
- SMS notifications (Twilio)

---

## **Support Links**

- Railway Docs: https://docs.railway.app
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Gmail App Passwords: https://myaccount.google.com/apppasswords

**Your backend is ready to ship! 🚀**
