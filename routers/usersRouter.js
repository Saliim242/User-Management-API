const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const validateUser = require("../middlewares/validationToken");

const router = express.Router();
router.use(validateUser);
router.get("/", getAllUsers).post("/", createUser);
router
  .get("/:id", getSingleUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

module.exports = router;
