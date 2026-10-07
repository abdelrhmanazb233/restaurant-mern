const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST /api/reservations - Create a new table reservation
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, time, partySize, specialRequests } = req.body;

    // Basic Validation
    if (!name || !email || !phone || !date || !time || !partySize) {
      return res.status(400).json({ message: 'Please complete all required fields.' });
    }

    // Check for existing bookings at the exact same date & time slot
    const existingBookingsCount = await Reservation.countDocuments({
      date,
      time,
      status: { $ne: 'Cancelled' },
    });

    // Example capacity restriction: max 5 bookings per slot
    if (existingBookingsCount >= 5) {
      return res.status(400).json({
        message: 'This time slot is fully booked. Please choose another time.',
      });
    }

    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      partySize,
      specialRequests,
    });

    const savedReservation = await newReservation.save();
    res.status(201).json({
      success: true,
      message: 'Reservation confirmed successfully!',
      reservation: savedReservation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error creating reservation.' });
  }
});

// GET /api/reservations - Retrieve all reservations (For Admin)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;