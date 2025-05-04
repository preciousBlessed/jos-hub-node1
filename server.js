const express = require("express");
const app = express();
const authRouter = require("./routes/authRoutes"); //for authentication pages, signup and login
const arrayUsers = require("./routes/router"); //for users in array-database
const newUserRouter = require("./routes/newUserRoute"); //for users in mongoDB-database
const transactionRouter = require("./routes/newTransactionRoutes"); // for transactions in database
const dotenv = require("dotenv");
dotenv.config();

// Import auth
// Authentication middleware
const {
  requireAuth,
  checkCurrentUser,
} = require("./middlewares/authMiddleware");
const authMiddleware = require("./middlewares/authMiddleware"); //this is the old one I used.
const logger = require("./middlewares/logger");

//database connection
const dbConnection = require("./connection/dbConnect");
// dbConnection(); //called when connection is about to be established

//Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/new-users", authRouter);
app.use("/api/users", arrayUsers);
app.use("/api/new-users", newUserRouter); //added a new route for new users.
app.use("/api/new-users/user-transactions", transactionRouter); //for transactions
// app.use(logger);

//Routes
//Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  dbConnection(); //called when connection is about to be established
  console.log(`Server listening on port ${port}`);
});
