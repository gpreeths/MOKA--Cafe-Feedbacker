const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');

// Middleware setup
app.use(cors());
app.use(express.json());
require("dotenv").config();

// MongoDB connection with options
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Static file setup for image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads', 'reviews')));

// Logging for image requests
app.use('/reviews', (req, res, next) => {
    console.log('Requested image:', req.url);
    next();
  });

// Routes for user and admin
const userRoute = require('./routes/userRoute');
app.use('/user', userRoute);

const adminRoute = require('./routes/adminRoute');
app.use('/admin', adminRoute);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Catch-all route to handle React routing
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
} else {
  console.log("In development mode");
}
