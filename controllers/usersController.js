const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//@desc Get All Users
//@route Get /api/users
//@access Public

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ user_id: req.auth.id });
  res.status(200).json({ status: true, message: users });
});

//@desc Get Single User
//@route Get /api/users/:id
//@access Public

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User with that ID is not found");
  }

  res.status(200).json({ status: true, message: user });
});

//@desc POST Create New Users
//@route POST /api/users
//@access Public

const createUser = asyncHandler(async (req, res) => {
  // get The Parametrs User passed
  const { fullName, phone, email, note } = req.body;

  if (!fullName || !phone || !email || !note) {
    res.status(400);
    throw new Error("All User Feilds are required");
  }

  const isEmailExists = await User.findOne({ email });
  if (isEmailExists) {
    res.status(400);
    throw new Error("The email address is already exists by another user");
  }

  const createdUser = await User.create({
    fullName,
    phone,
    email,
    note,
    user_id: req.auth.id,
  });
  res.status(201).json({ status: true, message: createdUser });
});

//@desc PUTCH Update Users
//@route PUTCH /api/users/:id
//@access Public

const updateUser = asyncHandler(async (req, res) => {
  console.log("Requ", req.params.id);
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User with that ID is not found");
  }
  console.log(user.user_id.toString(), req.auth.id);
  if (user.user_id.toString() !== req.auth.id) {
    console.log("User with that ID already exists");
    res.status(403);
    throw new Error("User does not have permession to updated other users");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ status: true, message: updatedUser });
});

//@desc DELETE   Users
//@route DELETE /api/users/:id
//@access Public

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User with that ID is not found");
  }

  if (user.user_id != req.auth.id) {
    console.log("User with that ID already exists");
    res.status(403);
    throw new Error("User does not have permession to updated other users");
  }

  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ status: true, message: deletedUser });
});

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
