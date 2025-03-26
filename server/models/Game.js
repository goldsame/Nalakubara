const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  gameUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [String],
  rating: {
    type: Number,
    default: 0
  },
  plays: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);