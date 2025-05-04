const router = require("express").Router();
const userController = require("../controllers/newUserController");

// Authentication middleware
const {
  requireAuth,
  checkCurrentUser,
} = require("../middlewares/authMiddleware");

//insert a mechanism/middleware for validation
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { createSchema, updateSchema } = require("../validation/validate");

// console.log();
//An Error Handler for MyRoutes
const ErrorHandler = (err, req, res, next) => {
  if (err) {
    return res.json({
      status: "Error",
      message: err.error.details.map((obj) => obj.message).join(", "),
    });
  } else next();
};

router
  .get("/", userController.getUsers)
  .get("/:id", userController.getUserById)
  // .post(
  //   "/",
  //   validator.body(createSchema, { passError: true }),
  //   ErrorHandler,
  //   userController.createNewUser
  // )
  .patch(
    "/update/:id",
    validator.body(updateSchema, { passError: false }),
    ErrorHandler,
    userController.updateUser
  )
  .put("/update/:id", userController.updateUser)
  .delete("/delete/:id", userController.deleteUserById);

module.exports = router;

// console.log(module.exports);
