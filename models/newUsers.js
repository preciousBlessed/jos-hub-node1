const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: "myName",
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "The email you entered is invalid"],
  },
  age: {
    type: Number,
    validate: [
      (a) => {
        if (a <= 14) return fasle;
      },
      "Please enter a valid age",
    ],
    default: 15,
  },
  password: {
    type: String,
    required: [true, "a valid password is required!"],
    minlength: [4, "Minimum password length is 4 characters"],
    maxlength: [4, "Maximum password length is 4 characters"],
  },
  transactions: {
    transactionsCount: { type: Number, default: 0 },
    transactionsHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
});

//Mongoose Hooks

userSchema.post("save", function (doc, next) {
  console.log("A new user has been created and saved:\n", doc);
  next();
});

userSchema.pre("save", async function (next) {
  console.log(this, " >>> New user is about to be saved");
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Static methods
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }).populate(
    "transactions.transactionsHistory"
  );
  //compare hashed password
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      console.log("user logged in successfully");
      return user;
    } else {
      throw Error("Incorrect Password");
    }
  }
  throw Error("This email is not registerd!");
};

module.exports = mongoose.model("AuthUser", userSchema);
