# Green Volunteer Backend

Backend API for volunteer management and messaging system.

## Features

- Volunteer registration with email confirmation
- Email notifications for volunteer join events (sent to admin)
- Message system with email notifications
- User authentication with JWT
- Volunteer profile management
- Email notification preferences

## Email Notifications

### When a Volunteer Joins:
1. **Volunteer receives**: Welcome email confirming their registration
2. **Admin receives**: Notification of new volunteer registration

### When a Volunteer Sends a Message:
1. **Admin receives**: Notification of new message from volunteer
2. **Volunteer receives**: Confirmation that their message was received

### When Admin Sends a Message to Volunteer:
1. **Volunteer receives**: Message email (if they have notifications enabled)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from `.env.example` and fill in your values:
   ```bash
   cp .env.example .env
   ```

3. Configure email service (Gmail recommended):
   - Enable 2FA on your Gmail account
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the app password in EMAIL_PASSWORD

4. Start the server:
   ```bash
   npm start
   ```
   
   Or for development:
   ```bash
   npm run dev
   ```

## API Endpoints

### Volunteers
- `POST /api/volunteers/register` - Register new volunteer
- `GET /api/volunteers/profile` - Get volunteer profile
- `PUT /api/volunteers/profile` - Update volunteer profile

### Messages
- `POST /api/messages/send` - Send message from volunteer
- `GET /api/messages/my-messages` - Get volunteer's messages
- `POST /api/messages/send-to-volunteer` - Admin send message to volunteer

### Auth
- `POST /api/auth/login` - Login volunteer

## Email Notification Preferences

Volunteers can manage their email notification preferences in their profile:
- `onJoin` - Receive welcome email
- `onMessages` - Receive emails when admin sends messages
- `onUpdates` - Receive general update emails
