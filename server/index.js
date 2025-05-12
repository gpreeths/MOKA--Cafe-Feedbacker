const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const app = express();

const allowedOrigins = ['https://moka-cafe-feedbacker-1.onrender.com']; // frontend URL here

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads', 'reviews')));
app.use('/reviews', (req, res, next) => {
  console.log('Requested image:', req.url);
  next();
});

// API routes
const userRoute = require('./routes/userRoute');
app.use('/user', userRoute);

const adminRoute = require('./routes/adminRoute');
app.use('/admin', adminRoute);



app.listen(process.env.PORT || 5000, () => {
  console.log(`Running on port ${process.env.PORT || 5000}`);
});
