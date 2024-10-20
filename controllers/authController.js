const asyncHandler = require("express-async-handler");
const AuthUser = require("../models/authUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc POST registor user
//@route POST /api/auth/registor
//@access Public

const authUserRegistor = asyncHandler(async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  if (!fullName || !email || !password || !bio) {
    res.status(400);
    throw new Error("All Feilds Are Required");
  }

  const isEmailExists = await AuthUser.findOne({ email });

  if (isEmailExists) {
    res.status(400);
    throw new Error(
      "This Email address is already in use by another user or another account"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdAuthUser = await AuthUser.create({
    fullName,
    email,
    bio,
    password: hashedPassword,
  });

  if (createdAuthUser) {
    res.status(201).json({
      status: true,
      message: {
        _id: createdAuthUser._id,
        fullName: createdAuthUser.fullName,
        bio: createdAuthUser.bio,
        email: createdAuthUser.email,
      },
    });
  } else {
    res.status(500);
    throw new Error("User data is invalid");
  }
});

//@desc POST login user
//@route POST /api/auth/login
//@access Public
const authUserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required ");
  }

  const isUserFounded = await AuthUser.findOne({ email: email });

  if (
    isUserFounded &&
    (await bcrypt.compare(password, isUserFounded.password))
  ) {
    const accessToken = await jwt.sign(
      {
        auth: {
          id: isUserFounded._id,
          fullName: isUserFounded.fullName,
          bio: isUserFounded.bio,
          email: isUserFounded.email,
        },
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({ status: true, message: accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid Email or passowrd");
  }
});

//@desc GET Current  user Info
//@route GET /api/auth/me
//@access provate or protected

// const authUserMe = asyncHandler(async (req, res) => {
//   res.status(200).json({ status: true, message: req.user });
// });

const authUserMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: true,
    message: req.auth,
  });
});

module.exports = {
  authUserRegistor,
  authUserLogin,
  authUserMe,
};
