

const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // requiring wrapAsync 

const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js"); // requiring the isLoggedIn middleware

const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); // setting up multer for file uploads

// const axios = require("axios");

// const upload = multer({dest : 'uploads/' });

//combinig same path route using Router.router
//combining index and create route together
router
.route("/")
.get(wrapAsync (listingController.index))
.post(
  isLoggedIn, 

  upload.single("listings[image]"),
    validateListing , // validating the data using the schema
  wrapAsync( listingController.createListing) // using the showListing controller to handle the request);
);



//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//combining show ,update and delete route together
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
  isLoggedIn, 
  isOwner, // middleware for checking if the user is the owner of the listing
  upload.single("listings[image]"),
  validateListing , 
  wrapAsync(listingController.updateListing))
  .delete(
  isLoggedIn,
  isOwner,
  wrapAsync( listingController.deleteListings));


  
  //edit route
  router.get("/:id/edit", 
  isLoggedIn, 
  isOwner,
  wrapAsync(listingController.renderEditForm)); // using the createListing controller to handle the request








// index route
// router.get("/", wrapAsync (listingController.index));


//show route
// router.get("/:id", wrapAsync(listingController.showListing));

//create route
// router.post("/",
//   isLoggedIn, 
//   validateListing , // validating the data using the schema
//   wrapAsync( listingController.createListing) // using the showListing controller to handle the request);
// );


//Update Route
// router.put("/:id",
//   isLoggedIn, 
//   isOwner, // middleware for checking if the user is the owner of the listing
//   validateListing , 
//   wrapAsync(listingController.updateListing));

//delete route
// router.delete("/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync( listingController.deleteListings));



module.exports = router;