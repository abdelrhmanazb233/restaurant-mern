const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Main, Starter, Dessert, Drink
  imageUrl: { type: String, required: true },
  isPopular: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);