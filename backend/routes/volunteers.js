const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const { sendWelcomeEmail, sendAdminNotificationOnJoin } = require('../utils/emailService');
const auth = require('../middleware/auth');

// Register new volunteer
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password, availability, skills } = req.body;

    // Check if volunteer already exists
    let volunteer = await Volunteer.findOne({ email });
    if (volunteer) {
      return res.status(400).json({ error: 'Volunteer already exists' });
    }

    // Create new volunteer
    volunteer = new Volunteer({
      fullName,
      email,
      phone,
      password,
      availability,
      skills
    });

    await volunteer.save();

    // Send welcome email to volunteer
    await sendWelcomeEmail(email, fullName);

    // Send notification to admin
    await sendAdminNotificationOnJoin(fullName, email, phone);

    res.status(201).json({
      message: 'Volunteer registered successfully',
      volunteer: {
        id: volunteer._id,
        fullName: volunteer.fullName,
        email: volunteer.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering volunteer' });
  }
});

// Get volunteer profile
router.get('/profile', auth, async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.volunteerId).select('-password');
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

// Update volunteer profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { bio, skills, availability, profilePicture, emailNotifications } = req.body;
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.volunteerId,
      { bio, skills, availability, profilePicture, emailNotifications },
      { new: true }
    );
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
});

module.exports = router;
