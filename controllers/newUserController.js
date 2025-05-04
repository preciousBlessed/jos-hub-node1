const NewUsers = require("../models/newUsers");
const Transactions = require("../models/newUserTransactions");

exports.getUsers = async (req, res) => {
  try {
    const newUsers = await NewUsers.find({});

    console.log(newUsers);
    console.log("We are here now");
    res.status(200).json({
      success: true,
      userCount: newUsers.length,
      newUsers,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  // Find the user by his Id
  try {
    let userId = req.params.id;
    console.log("Find user with _id: ", userId);

    desiredUser = await NewUsers.findById(userId).populate(
      "transactions.transactionsHistory"
    );
    console.log(desiredUser);

    if (!desiredUser) {
      return res.status(404).json({
        status: "Error",
        error: "User not found",
      });
    }

    res.status(200).json({
      status: "User found",
      desiredUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      error: err.message,
    });
  }
};

// exports.createNewUser = async (req, res) => {
//   try {
//     //get the user details from the request body, for this, body-parser and express.json() was enabled!
//     const newUserData = new NewUsers({ ...req.body });
//     const insertedUser = await newUserData.save();
//     console.log(insertedUser);

//     // //try to find user with id using filter function
//     // let extantUser = await newUsers.create();
//     // if (extantUser) {
//     //   return res.status(400).json({
//     //     status: "Error",
//     //     error: `User with id ${id} already exists, please create a new user with a unique id!`,
//     //   });
//     // }

//     res.status(201).json({
//       status: "User created successfully",
//       insertedUser,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "Error",
//       error: err.message,
//     });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    // To update, we get the user index from the database or the user object by filter method
    let userId = req.params.id;
    //try to find user with id using filter function
    let extantUser = await NewUsers.findById(userId);

    if (!extantUser) {
      return res.json({
        status: "Error",
        error: `User with id ${userId} does not exist, please check the id!`,
      });
    }

    let desiredUser = extantUser;

    console.log("About to update the user with _id: ", userId);

    const formerUser = desiredUser;
    // const formerData = desiredUser; //this does not work, why?
    console.log(`The former user details: \n${formerUser}`);

    // //update existing data with information from body
    // users[desiredUserIndex].name = req.body.name || formerData.name;
    // users[desiredUserIndex].age = req.body.age ?? formerData.age;

    let desiredUserName = req.body.name || formerUser.name;
    let desiredUserEmail = req.body.email || formerUser.email;
    let desiredUserAge = req.body.age ?? formerUser.age;
    let desiredUserPassword = req.body.password || formerUser.password;
    let desiredTransactionCount = req.body.transactions.transactionsCount; //||
    //formerUser.transactions.transactionsCount;
    let desiredTransactionsHistory =
      req.body.transactions.desiredTransactionsHistory; //||
    //formerUser.transactions.transactionsHistory;

    //represent the new user
    // const updatedUser = users[desiredUserIndex];
    console.log("THIS: ", desiredTransactionCount, desiredTransactionsHistory);
    const updatedUser = await NewUsers.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: desiredUserName,
          email: desiredUserEmail,
          password: desiredUserPassword,
          age: desiredUserAge,
        },
      },
      { new: true }
    );

    res.status(201).json({
      satus: `User with id ${userId} has been updated successfully`,
      updatedUser,
      formerUser: formerUser,
    });
    // console.log(users);
    console.log(`Updated user: \n${updatedUser}`);
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      error: err.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    let userId = req.params.id;
    console.log(userId);

    //store initial length of users
    // first get all users
    let allUsers = await NewUsers.find({});
    let initialUsersLength = allUsers.length;

    //check if user exists:
    let extantUser = await NewUsers.findById(userId);
    if (!extantUser) {
      res.status(404).json({
        status: "Failed",
        message: `User with id ${userId} not found`,
      });
      console.log("User deleted already!");
      return;
    }
    await NewUsers.findByIdAndDelete(userId);
    console.log(`This user: \n ${extantUser}\nhas been deleted!`);

    //get final count after deletion;
    let remainigUsers = await NewUsers.find({});
    let finalLength = remainigUsers.length;

    res.json({
      status: `User with id ${userId} has been deleted successfully`,
      initialUsersCount: initialUsersLength,
      remainingUsersCount: finalLength,
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({
      status: "Error",
      error: err.message,
    });
  }
};
