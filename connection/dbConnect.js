const mongoose = require("mongoose");
const uri = process.env.MONGODB_URL;

const mongooseConnection = function () {
  mongoose
    .connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // // useFindAndModify: false,
      //   useCreateIndex: false,
      // family: 4,
    })
    .then(() => {
      console.log("We Successfully Connected You to MongoDB");
    })
    .catch((err) => {
      console.log("Can't connect to database\n", err);
    });
};

module.exports = mongooseConnection;
