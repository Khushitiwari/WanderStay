
const express = require('express');
const router = express.Router();
const User = require("../models/users.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require("passport");
const { saveRedirectUrl } = require('../middleware.js');

const userController = require("../controllers/users.js");

//combinig same path route using Router.router
//combining signup get and post routes
router.route("/signup")
.get( userController.renderSignup )
.post( wrapAsync(userController.singup));

// router.get("/signup" , userController.renderSignup );
// router.post("/signup", wrapAsync(userController.singup));


//combining login get and post routes

router.route("/login")
.get( userController.renderLogin)
.post(
    saveRedirectUrl,
     passport.authenticate("local" ,{
    failureRedirect : "/login" ,
     failureFlash: true
    }), 
    userController.login
    );


// router.get("/login" , userController.renderLogin);
// router.post(
//     "/login" ,
//     saveRedirectUrl,
//      passport.authenticate("local" ,{
//     failureRedirect : "/login" ,
//      failureFlash: true
//     }), 
//     userController.login
//     );


// route to logout  req.logout() is a passport method to logout the user
// it will remove the user from the session and redirect to the listings page
router.get("/logout", userController.logout);

module.exports = router;