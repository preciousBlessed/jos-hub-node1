const users = require("../models/users");
// console.log(users);
exports.getUsers = async (req, res) => {
  try {
    res.json({
      status: "Success",
      userCount: users.length,
      users,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      status: "Error",
      error: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  // Find the user by his Id
  try {
    let userId = req.params.id;
    console.log(userId);
    // let desiredUserIndex = null;
    // Change to map function

    // for (let i = 0; i < users.length; i++) {
    //   if (users[i].id == userId) {
    //     desiredUserIndex = i;
    //   }
    // }
    // let desiredUser = users[desiredUserIndex];

    //using filter function
    desiredUser = await users.filter((user) => user.id === Number(userId))[0];
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

exports.createNewUser = async (req, res) => {
  try {
    //get the user details from the request body, for this, body-parser was enabled!
    const { id, name, age } = req.body;

    //try to find user with id using filter function
    let extantUser = await users.filter((user) => user.id === Number(id))[0];
    if (extantUser) {
      return res.status(400).json({
        status: "Error",
        error: `User with id ${id} already exists, please create a new user with a unique id!`,
      });
    }
    // move on to create a new user if existant user was not found!
    const newUser = {
      id,
      name,
      age,
    };
    // console.log(newUser);
    await users.push(newUser);
    console.log(users);

    res.status(200).json({
      status: "User created successfully",
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // To update, we get the user index from the database or the user object by filter method
    let userId = req.params.id;
    //try to find user with id using filter function
    let extantUser = await users.filter(
      (user) => user.id === Number(userId)
    )[0];

    if (!extantUser) {
      return res.status(400).json({
        status: "Error",
        error: `User with id ${userId} does not exist, please check the id!`,
      });
    }

    let desiredUser = await users.filter(
      (user) => user.id === Number(userId)
    )[0];

    console.log(userId);
    // let desiredUserIndex = null;
    // for (let i = 0; i < users.length; i++) {
    //   if (users[i].id == userId) {
    //     desiredUserIndex = i;
    //   }
    // }
    //Get formerUser Data:
    let formerData = {
      id: desiredUser.id,
      name: desiredUser.name,
      age: desiredUser.age,
    };
    // formerData = desiredUser; //this does not work, why?
    console.log(formerData);

    // //update existing data with information from body
    // users[desiredUserIndex].name = req.body.name || formerData.name;
    // users[desiredUserIndex].age = req.body.age ?? formerData.age;

    desiredUser.name = req.body.name || formerData.name;
    desiredUser.age = req.body.age ?? formerData.age;

    //represent the new user
    // const updatedUser = users[desiredUserIndex];
    const updatedUser = desiredUser;

    res.json({
      satus: `User with id ${userId} has been updated successfully`,
      updatedUser,
      formerData: formerData,
    });
    console.log(users);
  } catch (err) {
    res.status(500).json({
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
    let initialUsersLength = users.length;

    // To delete, we get the user index from the database
    let desiredUserIndex = null;
    for (let i = 0; i < users.length; i++) {
      if ((await users[i].id) == userId) {
        desiredUserIndex = i;
      }
    }
    //remove the user from database(currently an array)
    if (desiredUserIndex) {
      users.splice(desiredUserIndex, 1);
    } else {
      res.json({
        status: "Failed",
        message: `User with id ${userId} not found`,
      });
      return;
    }
    console.log(users);
    res.json({
      status: `User with id ${userId} has been deleted successfully`,
      initialUsersCount: initialUsersLength,
      remainingUsersCount: users.length,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      error: err.message,
    });
  }
};

// module.exports = users;
