const NewUsers = require("../models/newUsers");
const NewTransactions = require("../models/newUserTransactions");

// console.log(users);
exports.getTransactions = async (req, res) => {
  try {
    // console.log("In here...");
    const allTransactions = await NewTransactions.find({}).populate("owner");
    // console.log(allTransactions);
    console.log("We are here now fetching all transactions...");
    res.json({
      status: "Success",
      transactionsCount: allTransactions.length,
      allTransactions,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      status: "Error-nn",
      error: err.message,
    });
  }
};

exports.getOneTransaction = async (req, res) => {
  try {
    const user = req.user; //this user object is passed on from the auth middleware
    const allApplicableTransactions = await NewTransactions.find({
      owner: user._id,
    });
    // console.log(allApplicableTransactions);
    console.log("We are here now fetching all transactions for one user...");
    if (!allApplicableTransactions) {
      return res.stauts(400).json({
        status: "Failed",
        message: "No such transaction for user found!",
      });
    } else {
      res.json({
        status: "Success",
        numberOfTransactions: allApplicableTransactions.length,
        allApplicableTransactions,
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      status: "Error-nn",
      error: err.message,
    });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    //identify the user performing the transaction
    let user = req.user;
    // console.log("Current User:\n", user);

    //get other details from the body
    const { title, amount } = req.body;

    //create transaction
    let new_transaction = await NewTransactions.create({
      title,
      amount,
      owner: user._id,
    });
    // Put the transaction details in user data
    user = await NewUsers.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          transactions: {
            transactionsCount: user.transactions.transactionsCount + 1,
            transactionsHistory:
              user.transactions.transactionsHistory.concat(new_transaction),
          },
        },
      },
      { new: true }
    );
    // //Tests to see the changes
    // await console.log(user.transactions.transactionsCount);
    // await console.log(user.transactions.transactionsHistory);
    // await console.log(user);
    //
    new_transaction = await NewTransactions.findOne({
      _id: new_transaction._id,
    }).populate("owner");

    res.status(201).json({
      status: "Transaction created successfully",
      new_transaction,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

exports.deleteTransactions = async (req, res) => {
  try {
    await NewTransactions.deleteMany({});
    res.status(200).json({
      status: "Transactions deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};
