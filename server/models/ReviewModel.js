const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewTitle: {
    type: String,
    required: true,
  },
  reviewMessage: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    required: true 
  },
  image: { 
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      reviewReply: {
        type: String,
        required: true,
      },
      repliedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('CustomerReview', ReviewSchema);
