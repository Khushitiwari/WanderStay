
if(process.env.NODE_ENV != "production") {
  // if not in production, load environment variables from .env file
  require('dotenv').config();
}


const express = require("express");
const app = express();


const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");

//const mongoUrl = "mongodb://127.0.0.1:27017/WanderStay";
const dbUrl = process.env.ATLASDB_URL ;
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const flash = require("connect-flash"); // requiring connect-flash for flash messages
const passport = require("passport"); // requiring passport for authentication
const LocalStrategy = require("passport-local"); // requiring passport-local for local authentication
const User = require("./models/users.js"); // requiring the user model for authentication

//const wrapAsync = require("./utils/wrapAsync.js"); // requiring wrapAsync 
const ExpressError = require("./utils/expressError.js"); // requiring ExpressError
//const {listingSchema , reviewSchema } = require("./schema.js"); // requiring the schema
//const Review = require("./models/review.js"); // requiring the review model

const session = require("express-session");
const MongoStore = require("connect-mongo"); // requiring connect-mongo for session storage in MongoDB
const userRouter = require("./routes/user.js");



main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // to parse form data

app.use(methodOverride("_method")); // to use PUT and DELETE methods

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public"))); // to use the static files


const store = MongoStore.create({
   mongoUrl: dbUrl,
   crypto: {
    secret :process.env.SECRET ,
   },
   touchAfter: 24 * 3600, // 24 hours
});

store.on("error", ()=>{
  console.log("Error in connecting to MongoDB for session storage", err);
});  


const sessionOptions = {
  store,
  secret: process.env.SECRET ,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly :true, // to prevent client side script from accessing the cookie
  }


};






app.use(session(sessionOptions));
app.use(flash()); // using flash middleware

app.use(passport.initialize()); // initializing passport
app.use(passport.session()); // using passport session
passport.use(new LocalStrategy(User.authenticate()));// passport local strategy for authentication

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success"); // flash message for success
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; // current user
  next();
});


// app.get("/demouser" , async (req, res) =>{
//     let fakeUser = new User({
//       email: "student@gmail.com",
//       username: "delta-student"
//     });
//    let registeredUser = await User.register(fakeUser, "helloworld");
//    res.send(registeredUser);
// });

// using listings routes
app.use("/listings" , listingRouter);
//using reviews routes
app.use("/listings/:id/reviews" , reviewRouter);
app.use("/" , userRouter);



// getting root directory
app.get("/", (req, res) => {
  res.redirect("/listings");
});




app.all("*", (req,res,next)=>{
  next(new ExpressError( 404, "Page Not Found"));
});




app.use((err,req,res, next)=> {
  let {statusCode=500, message="something went wrong"} = err;
  // res.render("error.ejs" , {err});
  res.status(statusCode).render("error.ejs" , {message});
  // res.status(statusCode).send(message);

});

app.listen(8080, () => {
  console.log("server is listening at 8080");
});


//ATLASDB_URL=mongodb+srv://240140107071:TkGOevveuFLQlllA@cluster0.7whdwp5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
