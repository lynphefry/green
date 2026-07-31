// Simple Express server handling registrations and emailing an admin.
// Behavior:
// - POST /api/register accepts JSON { name, email, ... }
// - Validates email, sends notification via SendGrid if SENDGRID_API_KEY is set,
//   otherwise falls back to SMTP using SMTP_* env vars.
// - Appends registrations to registrations.json (ignored by git)
// Environment variables required:
// - ADMIN_EMAIL (notification recipient)
// - FROM_EMAIL (sender address, e.g. no-reply@yourdomain.com)
// Optional (SendGrid):
// - SENDGRID_API_KEY
// Optional (SMTP fallback):
// - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// Optional:
// - FRONTEND_ORIGIN (to restrict CORS)

const express = require('express');
const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const REG_FILE = path.join(__dirname, 'registrations.json');

// Configure SendGrid if available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Nodemailer transporter (lazy-create)
function createSmtpTransport() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
}

// Basic CORS
app.use((req, res, next) => {
  const origin = process.env.FRONTEND_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.get('/health', (req, res) => res.json({ ok: true }));

function isValidEmail(e) {
  return typeof e === 'string' && /\S+@\S+\.\S+/.test(e);
}

async function sendNotification({ name, email, payload }) {
  const admin = process.env.ADMIN_EMAIL;
  const from = process.env.FROM_EMAIL || `no-reply@localhost`;
  if (!admin) throw new Error('ADMIN_EMAIL not configured');

  const subject = `New registration: ${email}`;
  const text = `New registration\n\nName: ${name || 'N/A'}\nEmail: ${email}\n\nPayload:\n${JSON.stringify(payload, null, 2)}`;

  if (process.env.SENDGRID_API_KEY) {
    const msg = {
      to: admin,
      from,
      subject,
      text,
    };
    return sgMail.send(msg);
  }

  const transporter = createSmtpTransport();
  if (!transporter) throw new Error('No email transport configured (SENDGRID_API_KEY or SMTP_... required)');

  return transporter.sendMail({
    from,
    to: admin,
    subject,
    text,
  });
}

function persistRegistration(record) {
  try {
    let arr = [];
    if (fs.existsSync(REG_FILE)) {
      const raw = fs.readFileSync(REG_FILE, 'utf8');
      arr = JSON.parse(raw || '[]');
    }
    arr.push(record);
    fs.writeFileSync(REG_FILE, JSON.stringify(arr, null, 2));
  } catch (err) {
    console.error('failed to persist registration', err);
  }
}

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, ...rest } = req.body || {};
    if (!email || !isValidEmail(email)) return res.status(400).json({ error: 'valid email required' });

    const record = { name: name || null, email, timestamp: new Date().toISOString(), data: rest };

    // Send notification
    await sendNotification({ name, email, payload: record }).catch(err => {
      // Bubble as 500 but still persist locally
      console.error('email send failed', err && err.message ? err.message : err);
      throw err;
    });

    // Persist locally (registrations.json)
    persistRegistration(record);

    res.json({ ok: true });
  } catch (err) {
    console.error('register error', err && err.message ? err.message : err);
    res.status(500).json({ error: 'failed to register' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`express backend listening on ${port}`));
