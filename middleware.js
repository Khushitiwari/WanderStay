const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/expressError.js"); // requiring ExpressError
const {listingSchema , reviewSchema } = require("./schema.js"); // requiring the schema
module.exports.isLoggedIn = (req , res, next) =>{
  
    if(!req.isAuthenticated()){
     
    req.session.redirectUrl = req.originalUrl; // redirect to the path user wants to
    req.flash("error", "You must be logged in first!"); // flash message for success
   return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res, next)=>{
   let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currentUser._id)){
      req.flash("error" , "you don't have permision to this");
      return res.redirect(`/listings/${id}`);
  }
  next();
};

// Middleware to validate the listing data
 module.exports.validateListing = (req, res, next)=>{ 
    let {error}= listingSchema.validate(req.body); // validating the data using the schema
   
      if(error) {
        // if there is an error in validation, throw an error
       let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
      }else{

        next(); // if there is no error, go to the next middleware
      }
};


//middleware to validate reviews
module.exports.validateReview = (req, res, next)=>{ 
    let {error}= reviewSchema.validate(req.body); // validating the data using the schema
   
      if(error) {
        // if there is an error in validation, throw an error
       let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
      }else{

        next(); // if there is no error, go to the next middleware
      }
};

module.exports.isReviewAuthor = async(req,res, next)=>{
   let { id,reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author._id.equals(res.locals.currentUser._id)){
      req.flash("error" , "you don't have permision to this");
      return res.redirect(`/listings/${id}`);
  }
  next();
};