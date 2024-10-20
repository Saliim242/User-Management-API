const mongoose = require("mongoose");

const authUserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please Enter FullName"],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, "Please Enter Bio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter Email Address"],
      trim: true,
      unique: true,
      lawercase: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      trim: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("AuthUser", authUserSchema);
