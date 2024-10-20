const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
    },
    fullName: {
      type: String,
      required: [true, "Please Enter User Full Name"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Please Enter User Phone "],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter User Email"],
      trim: true,
      unique: true,
      lawercase: true,
    },
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
