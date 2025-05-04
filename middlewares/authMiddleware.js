require("dotenv").config();
const User = require("../models/newUsers");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
  try {
    // ... other code comes before this...
    const user = await User.findOne({ _id: req.params.userID });
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "Failed to retrieve user",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      error: err.message,
    });
  }
};

const requireAuth = function (req, res, next) {
  // First thing is to grab the token from the cookies
  // console.log(req.headers.cookie.split("=")[1]);
  // const token = req.cookies.JWT_newLogin;
  // const token = req.headers.cookie.JWT_newLogin;
  // const token = req.headers.cookie.split("=")[1];
  const token_equation = req.headers.cookie;
  let token = null;
  if (token_equation) {
    // console.log("The token is: ", token_equation);
    token_array = token_equation.split(";");
    for (item of token_array) {
      if (item.includes("JWT_newLogin")) {
        token = item.split("=")[1];
      }
      // console.log(item);
      break;
    }
    console.log("The token is: ", token);
  } else {
    token = null;
  }

  // console.log(req.cookies.JWTS);

  // Next is to check if the jwt exists and is verified
  if (token) {
    // First verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // res.redirect("/login");
        console.log(
          "An error occured, token is wrong or expired, go and signup"
        );
        res.send("<h1>Back to login Page</h1>");
      } else {
        console.log(decodedToken, "\n", token);
        next();
      }
    });
  } else {
    console.log("You do not have an account yet, please signup");
    // res.redirect("/login");
    res.send("<h1>Back to Signup Page</h1>");
  }
};

// Checking Current User
const checkCurrentUser = function (req, res, next) {
  // First thing is to grab the token from the cookies
  // const token = req.cookies.JWT_newLogin;
  const token_equation = req.headers.cookie;
  let token = null;
  if (token_equation) {
    // console.log("The token is: ", token_equation);
    token_array = token_equation.split(";");
    for (item of token_array) {
      if (item.includes("JWT_newLogin")) {
        token = item.split("=")[1];
      }
      // console.log(item);
      break;
    }
    console.log("The token for checkUser auth is: ", token);
  } else {
    token = null;
  }

  // Next is to check if the token exists
  if (token) {
    // First verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log("Here before Error: ", err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken, "\n", token);
        console.log("The checked user is now authenticated");

        // Find the user with the id in the payload "decodedToken"
        console.log("user._id", decodedToken.id);
        let user = await User.findById(decodedToken.id);
        console.log("user", user);
        // From hereon, we can either do req.user = user or pass the user into the views for rendering.
        req.user = user;
        res.locals.user = user; //this passes the user into the views so we can access properties of the user like the email and we can output it maybe in the header.
        next();
      }
    });
  } else {
    res.locals.user = null;
    // next();
    console.log("You do not have an account yet, please signup");
    res.send("Please signin or signup");
  }
};

module.exports = { requireAuth, checkCurrentUser };
