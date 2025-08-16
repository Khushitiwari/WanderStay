const Listing = require("../models/listing.js");
const Review = require('../models/review.js');

module.exports.createReviews = async(req , res) => {

    //console.log(req.params.id);

  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id; // setting the author of the review to the current user
  console.log(newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();


  req.flash("success", "Successfully created a new review!"); // flash message for success
  console.log("new review saved");
  res.redirect(`/listings/${listing._id}`);


}

module.exports.deleteReviews = async (req, res) => {
    
let {id , reviewId} = req.params;

 await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
 await Review.findByIdAndDelete(reviewId) ;
 req.flash("success", "review deleted!"); // flash message for success
 res.redirect(`/listings/${id}`); // redirecting to the listing page after deleting the review

}