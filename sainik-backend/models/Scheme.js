// models/Scheme.js
const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Scheme', SchemeSchema);
