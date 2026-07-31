const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Volunteer = require('../models/Volunteer');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await volunteer.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: volunteer._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      volunteer: {
        id: volunteer._id,
        fullName: volunteer.fullName,
        email: volunteer.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
