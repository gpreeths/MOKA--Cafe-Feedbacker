const admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const customerReview = require('../models/ReviewModel');
const OpenAIApi = require('openai');

// Admin Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const exist = await admin.findOne({ email });
        if (!exist) {
            return res.status(404).json({ message: "Admin not found, try using correct admin email" });
        }

        const passwordMatched = await bcrypt.compare(password, exist.password);
        if (!passwordMatched) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: exist._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// View All Reviews
const view = async (req, res) => {
    try {
        const reviews = await customerReview.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Reply to a Review
const reply = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { reviewReply } = req.body;

        if (!reviewReply) {
            return res.status(400).json({ message: "reviewReply is required" });
        }

        const review = await customerReview.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        review.replies.push({ reviewReply });
        await review.save();

        res.status(200).json({ message: "Reply added successfully", review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Total and Average Ratings
const totAvg = async (req, res) => {
    try {
        const totalReviews = await customerReview.countDocuments();
        const avgRatingResult = await customerReview.aggregate([
            { $group: { _id: null, avgRating: { $avg: "$rating" } } }
        ]);

        const avgRating = avgRatingResult[0]?.avgRating || 0;

        res.status(200).json({ totalReviews, avgRating: avgRating.toFixed(2) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Sort Reviews
const sort = async (req, res) => {
    try {
        const { sortBy = 'rating', order = 'asc' } = req.query;

        const validSortFields = ['rating', 'createdAt'];
        const validOrders = ['asc', 'desc'];

        if (!validSortFields.includes(sortBy)) {
            return res.status(400).json({ message: 'Invalid sort field. Use "rating" or "createdAt".' });
        }

        if (!validOrders.includes(order)) {
            return res.status(400).json({ message: 'Invalid sort order. Use "asc" or "desc".' });
        }

        const sortObject = {};
        sortObject[sortBy] = order === 'asc' ? 1 : -1;

        const reviews = await customerReview.find()
            .populate('userId', 'name email')
            .sort(sortObject);

        res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const Review = require('../models/ReviewModel'); // Assuming you have a Review model

// Function to get review by ID
const getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);  // Send the review data back
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Failed to fetch review' });
  }
};

const suggestReply = async (req, res) => {
    const { reviewMessage } = req.body;
  
    const openai = new OpenAIApi({
      apiKey: process.env.OPENAI_API_KEY,
    })
  
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful customer support agent.' },
              { role: 'user', content: `Generate a professional reply to this customer review: "${reviewMessage}"` }
            ],
          });
          
  
          res.json({ suggestedReply: completion.choices[0].message.content });

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to generate reply' });
    }
  };
module.exports = { login, view, reply, totAvg, sort,getReviewById,suggestReply };
