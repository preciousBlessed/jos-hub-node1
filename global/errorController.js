// Handle Errors
const handleErrors = (err) => {
  console.log(err.message, err.code); //err.code exists on unique field in user,
  const error = { email: "", password: "" };

  // Duplicate error
  if (err.code === 11000) {
    error.email = "That email is already in use";
    return error;
  }
  //Incorrect email
  if (err.message == "This email is not registerd!") {
    error.email = "This email is not registered";
  }
  //Incorrect password
  if (err.message == "Incorrect Password") {
    error.password = "Warning!!! This password is incorrect";
  }

  if (err.message.includes("AuthUser validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties);
      error[properties.path] = properties.message;
    });
  }
  return error;
};

module.exports = handleErrors;
