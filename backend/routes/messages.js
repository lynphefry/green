const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Volunteer = require('../models/Volunteer');
const { sendMessageNotificationToVolunteer, sendMessageNotificationToAdmin } = require('../utils/emailService');
const auth = require('../middleware/auth');

// Send message from volunteer
router.post('/send', auth, async (req, res) => {
  try {
    const { subject, message, messageType } = req.body;

    const volunteer = await Volunteer.findById(req.volunteerId);
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    const newMessage = new Message({
      volunteerId: req.volunteerId,
      volunteerEmail: volunteer.email,
      subject,
      message,
      messageType
    });

    await newMessage.save();

    // Send notification to admin
    await sendMessageNotificationToAdmin(volunteer.fullName, volunteer.email, subject, message);

    res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Get volunteer's messages
router.get('/my-messages', auth, async (req, res) => {
  try {
    const messages = await Message.find({ volunteerId: req.volunteerId }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

// Admin: Send message to volunteer
router.post('/send-to-volunteer', async (req, res) => {
  try {
    const { volunteerId, subject, messageContent } = req.body;

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    // Check if volunteer has enabled email notifications for messages
    if (volunteer.emailNotifications.onMessages) {
      await sendMessageNotificationToVolunteer(
        volunteer.email,
        volunteer.fullName,
        subject,
        messageContent
      );
    }

    res.json({ message: 'Message sent successfully to volunteer' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

module.exports = router;
