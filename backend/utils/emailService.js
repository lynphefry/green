const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send volunteer join confirmation email to volunteer
const sendWelcomeEmail = async (volunteerEmail, volunteerName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: volunteerEmail,
    subject: 'Welcome to Green - Volunteer Program',
    html: `
      <h2>Welcome to Green, ${volunteerName}!</h2>
      <p>Thank you for joining our volunteer program. We're excited to have you on board!</p>
      <p>You will receive email notifications for:</p>
      <ul>
        <li>Important updates about volunteer opportunities</li>
        <li>Messages from our team</li>
        <li>Event announcements</li>
      </ul>
      <p>You can manage your notification preferences in your account settings.</p>
      <p>Best regards,<br/>The Green Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', volunteerEmail);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

// Send volunteer join notification email to admin
const sendAdminNotificationOnJoin = async (volunteerName, volunteerEmail, volunteerPhone) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Volunteer Joined: ' + volunteerName,
    html: `
      <h2>New Volunteer Registration</h2>
      <p>A new volunteer has joined the program!</p>
      <ul>
        <li><strong>Name:</strong> ${volunteerName}</li>
        <li><strong>Email:</strong> ${volunteerEmail}</li>
        <li><strong>Phone:</strong> ${volunteerPhone}</li>
      </ul>
      <p>Please review their profile and welcome them to the team.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin notification sent');
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
};

// Send message notification email to volunteer
const sendMessageNotificationToVolunteer = async (volunteerEmail, volunteerName, messageSubject, messageContent) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: volunteerEmail,
    subject: 'New Message from Green Team: ' + messageSubject,
    html: `
      <h2>Hello ${volunteerName},</h2>
      <p>You have received a new message:</p>
      <h3>${messageSubject}</h3>
      <p>${messageContent}</p>
      <p><a href="${process.env.FRONTEND_URL}/messages">View all messages</a></p>
      <p>Best regards,<br/>The Green Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Message notification sent to:', volunteerEmail);
  } catch (error) {
    console.error('Error sending message notification:', error);
  }
};

// Send message notification email to admin
const sendMessageNotificationToAdmin = async (volunteerName, volunteerEmail, messageSubject, messageContent) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Message from Volunteer: ' + volunteerName,
    html: `
      <h2>New Message from Volunteer</h2>
      <p><strong>From:</strong> ${volunteerName} (${volunteerEmail})</p>
      <h3>${messageSubject}</h3>
      <p>${messageContent}</p>
      <p><a href="${process.env.FRONTEND_URL}/admin/messages">View in Dashboard</a></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin message notification sent');
  } catch (error) {
    console.error('Error sending admin message notification:', error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendAdminNotificationOnJoin,
  sendMessageNotificationToVolunteer,
  sendMessageNotificationToAdmin
};
