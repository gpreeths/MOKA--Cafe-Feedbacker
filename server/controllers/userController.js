const multer = require('multer');
const path = require('path');
const User = require('../models/userModel');
const customerReview = require('../models/ReviewModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Store files in the 'uploads/' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// USER SIGNUP
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// USER LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const passwordMatched = await bcrypt.compare(password, exist.password);
    if (!passwordMatched) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    const token = jwt.sign(
      { name: exist.name, id: exist._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const createReview = async (req, res) => {
  try {
    const { reviewTitle, reviewMessage, rating } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newReview = new customerReview({
      userId: req.user.id, 
      reviewTitle,
      reviewMessage,
      rating:Number(rating), 
      image,
    });

    await newReview.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to submit review", error: error.message });
  }
};

const viewPreviousReviews = async (req, res) => {
  try {
    const userId = req.user._id; 
    console.log("User ID:", userId); 
    const reviews = await customerReview.find({ userId }).sort({ createdAt: -1 });
    console.log("Reviews:", reviews); 
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user reviews' });
  }
}



module.exports = { signup, login, createReview,viewPreviousReviews };
