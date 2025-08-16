const Listing = require("../models/listing.js");
// const axios = require('axios');


module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  
  res.render("listings/new.ejs");
};


module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listings = await Listing.findById(id)
  .populate({
    path:"reviews" ,
     populate:{
       path: "author",
    },
  })
  .populate("owner");
  if(!listings){
     req.flash("error", "Listing doesn't exist!"); // flash message for success
     res.redirect("/listings");
  }
  console.log(listings);
  res.render("listings/show.ejs", { listings });
}


module.exports.createListing = async (req,res,next) =>{
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listings);
  newListing.owner = req.user._id;
  newListing.image = {url, filename};
  await newListing.save();
  req.flash("success" , "New Listing Created");
  res.redirect("/listings");
}

// module.exports.createListing = async (req, res) => {
//   const { location } = req.body.listing;

//   // Geocode using Nominatim
//   const geoRes = await axios.get("https://nominatim.openstreetmap.org/search", {
//     params: {
//       q: location,
//       format: "json",
//       limit: 1
//     },
//     headers: {
//       'User-Agent': 'WanderStayApp/1.0 (your_email@example.com)'
//     }
//   });

//   const listing = new Listing(req.body.listing);

//   if (geoRes.data.length > 0) {
//     const lat = parseFloat(geoRes.data[0].lat);
//     const lon = parseFloat(geoRes.data[0].lon);
//     listing.geometry = {
//       type: "Point",
//       coordinates: [lon, lat] // GeoJSON = [lng, lat]
//     };
//   } else {
//     listing.geometry = { type: "Point", coordinates: [] };
//   }

//   await listing.save();
//   res.redirect(`/listings/${listing._id}`);
// };


module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listings = await Listing.findById(id);
    if(!listings){
     req.flash("error", "Listing doesn't exist!"); // flash message for success
     res.redirect("/listings");
  }
  let originalImageUrl = listings.image.url;
  originalImageUrl = originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_350/"); // resizing the image for edit form
  
  res.render("listings/edit.ejs", { listings , originalImageUrl });

}

module.exports.updateListing = async (req, res) => {
  //  if (!req.body.listing) {
  //       throw new ExpressError(400, "Invalid Listing Data");  //  if listing data is not provided the error will be thrown
  //     }
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listings });
  //   console.log(updated);
  if(typeof req.file != "undefined"){
     let url = req.file.path;
      let filename = req.file.filename;
   listing.image = {url , filename};
   await listing.save();
  }
  req.flash("success", "Successfully upadted the listing!"); // flash message for success
  res.redirect(`/listings/${id}`);
}


module.exports.deleteListings = async (req, res) => {
  let { id } = req.params;
  let deletedList = await Listing.findByIdAndDelete(id);
  console.log(deletedList);
  req.flash("success", "listing deleted!"); // flash message for success
  res.redirect("/listings");
}


