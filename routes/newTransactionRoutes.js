const router = require("express").Router();
const transactionController = require("../controllers/newTransactionController");
//middle ware for authentication
const authMiddleware = require("../middlewares/authMiddleware");

router
  .get(
    "/all",
    authMiddleware.requireAuth,
    transactionController.getTransactions
  )
  .get(
    "/:userID",
    authMiddleware.checkCurrentUser,
    transactionController.getOneTransaction
  )
  .post(
    "/myTransactions",
    authMiddleware.checkCurrentUser,
    transactionController.createTransaction
  )
  //   .patch(
  //     "/:id",
  //     validator.body(updateSchema, { passError: false }),
  //     ErrorHandler,
  //     transactionController.updateUser
  //   )
  //   .put("/:id", transactionController.updateUser)
  .delete(
    "/deleteAll",
    authMiddleware.requireAuth,
    transactionController.deleteTransactions
  );

module.exports = router;

// router
//   .get("/all", transactionController.getTransactions)
//   .get(
//     "/:userID",
//     authMiddleware.authenticateUser,
//     transactionController.getOneTransaction
//   )
//   .post(
//     "/:userID/myTransactions",
//     authMiddleware.authenticateUser,
//     transactionController.createTransaction
//   )
//   //   .patch(
//   //     "/:id",
//   //     validator.body(updateSchema, { passError: false }),
//   //     ErrorHandler,
//   //     transactionController.updateUser
//   //   )
//   //   .put("/:id", transactionController.updateUser)
//   .delete("/deleteAll", transactionController.deleteTransactions);

// module.exports = router;
