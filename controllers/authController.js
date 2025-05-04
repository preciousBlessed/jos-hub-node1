const User = require("../models/newUsers");
require("dotenv").config();

//  Outside functions
const createToken = require("../global/jwtCreate");
const handleErrors = require("../global/errorController");

// Inside functions
exports.signupGet = (req, res) => {
  // res.render("signup");
  res.send("signup");
};

exports.loginGet = (req, res) => {
  // res.render("login");
  res.send("login");
};

exports.signupPost = async (req, res) => {
  console.log("Here in signupController now...");
  // This is the function that creates a new user
  const { email, password } = req.body;
  try {
    // STEP 1: create a new user
    const user = await User.create({ email, password });
    // STEP 2: create token
    const token = createToken(user._id);
    // STEP 3: attach token to response-cookie object
    res.cookie("JWT_newSignup", token, {
      maxAge: Number(process.env.JWT_EXPIRATION) * 1000,
      httpOnly: true,
    });
    res.json({
      // user: user._id,
      user,
    });
  } catch (err) {
    console.log("The error is: ", err);
    const errors = handleErrors(err);
    res.status(500).json(errors);
  }
};

exports.loginPost = async (req, res) => {
  // STEP 1: Get email and password from req.body
  const { email, password } = req.body;
  try {
    // STEP 2: Find the user using the static user method called "login"
    const user = await User.login(email, password);
    // STEP 3: Create Token for login session
    const token = createToken(user._id);
    // STEP 4: attach the token to the request-cookies object
    res.cookie("JWT_newLogin", token, {
      maxAge: Number(process.env.JWT_EXPIRATION) * 1000,
      httpOnly: true,
    });
    res.json({
      // user: user._id,
      user,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(500).json(errors);
  }
};

exports.logoutGet = (req, res) => {
  // STEP 1:
  // This is just about replacing the token with an empty string which is analogous to deleting the token from the frontend
  // Then givng a very short expiry time.
  const token = "";
  res.cookie("JWT_newLogin", token, {
    maxAge: 1, //in miliseconds
    httpOnly: true,
  });
  // STEP 2:
  // Reqirect them to the homepage
  // res.redirect("/");
  res.send("<h1>Home Page</h1>");
};
