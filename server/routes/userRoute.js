const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/userAuth');
const upload = require('../middlewares/upload'); 


userRoute.post('/signup', userController.signup);
userRoute.post('/login', userController.login);
userRoute.post('/createreview',auth,upload.single('image'),userController.createReview);  // 👈 protected by auth
userRoute.get('/previousreviews', userController.viewPreviousReviews); // 👈 protected by auth
module.exports = userRoute;
