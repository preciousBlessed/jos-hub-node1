const router = require("express").Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

//An Error Handler for MyRoutes
const ErrorHandler = (err, req, res, next) => {
  if (err) {
    return res.json({
      status: "Error",
      message: err.error.details.map((obj) => obj.message).join(", "),
    });
  } else next();
};

// Require Validation
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { createSchema, updateSchema } = require("../validation/validate");

//Define routes and controllers
router.get("/signup", authController.signupGet);
router.post(
  "/signup",
  validator.body(createSchema, { passError: false }),
  ErrorHandler,
  authController.signupPost
);
router.get("/login", auth.requireAuth, authController.loginGet);
router.post("/login", authController.loginPost);
router.get("/logout", authController.logoutGet);

module.exports = router;
