const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  originalText: { type: String, required: true },
  translatedText: { type: String },
  to: { type: String, required: true },
  status: { type: String, enum: ['queued', 'processing', 'completed', 'failed'], default: 'queued' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Translation', translationSchema);
