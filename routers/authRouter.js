const express = require("express");
const {
  authUserRegistor,
  authUserLogin,
  authUserMe,
} = require("../controllers/authController");

const validateAuthUser = require("../middlewares/validationToken");

const router = express.Router();

router.post("/registor", authUserRegistor).post("/login", authUserLogin);
router.get("/me", validateAuthUser, authUserMe);

module.exports = router;
