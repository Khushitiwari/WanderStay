
const express = require('express');
const router = express.Router({mergeParams:true});
const Review = require("../models/review.js"); // requiring the review model
const wrapAsync = require("../utils/wrapAsync.js"); // requiring wrapAsync 
const ExpressError = require("../utils/expressError.js"); // requiring ExpressError

const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,  isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js");
const review = require('../models/review.js');


//post reviews route
router.post("/",
  isLoggedIn, // middleware to check if user is logged in
  validateReview,
   wrapAsync(reviewController.createReviews));

//delete review route
router.delete("/:reviewId", 
  isLoggedIn,
  isReviewAuthor,
  
  wrapAsync(reviewController.deleteReviews));

module.exports = router;