## Backend (Express) for registration notifications

This repository now includes a small Express backend (branch: feature/express-backend) that exposes an endpoint to receive registrations from your frontend and sends an email notification to the admin address.

Files added
- server.js — Express app handling POST /api/register and sending email notifications
- package.json — deps and scripts
- .gitignore — ignores node_modules, .env, registrations.json
- docs/register-snippet.html — frontend snippet showing how to POST to the API

Environment variables
- ADMIN_EMAIL (required) — address that will receive registration emails
- FROM_EMAIL (optional) — sender address used in emails (default: no-reply@localhost)
- SENDGRID_API_KEY (optional) — if set, SendGrid is used to send email
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (optional) — SMTP fallback if SendGrid is not configured
- FRONTEND_ORIGIN (optional) — CORS origin to allow (defaults to '*')
- PORT (optional) — port to run the server on (default 3000)

Recommended .env (example)
# Set the admin email to receive notifications
ADMIN_EMAIL=lynphefry@gmail.com
FROM_EMAIL=no-reply@yourdomain.com

# Either SendGrid (recommended for deliverability)
SENDGRID_API_KEY=SG.xxxxx

# Or SMTP fallback
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=user
# SMTP_PASS=pass

# Optional
FRONTEND_ORIGIN=https://green-pi-wine.vercel.app
PORT=3000

Usage (development)
1. Create a `.env` file (do NOT commit it) with the variables above.
2. Install dependencies: `npm install`
3. Run: `npm run dev` (requires nodemon) or `npm start`

Deployment
- Deploy to any Node-capable host (Render, Heroku, Railway, Vercel).
- Add the required env vars in the host's dashboard (ADMIN_EMAIL and a mail provider key).

Security notes
- Do not commit secrets. Use environment variables.
- Add rate-limiting, CAPTCHA, and input validation before exposing publicly to prevent spam.
