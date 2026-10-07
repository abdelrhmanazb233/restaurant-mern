const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: [true, 'Reservation date is required'],
    },
    time: {
      type: String, // Format: HH:MM (12-hour or 24-hour display)
      required: [true, 'Reservation time is required'],
    },
    partySize: {
      type: Number,
      required: [true, 'Party size is required'],
      min: [1, 'Party size must be at least 1'],
      max: [20, 'For party sizes larger than 20, please contact us directly'],
    },
    specialRequests: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Cancelled'],
      default: 'Confirmed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);