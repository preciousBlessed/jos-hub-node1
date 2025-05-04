const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
      description: "Any",
    },
    owner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "AuthUser",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
