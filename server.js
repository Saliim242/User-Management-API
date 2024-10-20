const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routers/usersRouter");
const authRouter = require("./routers/authRouter");
const connectDB = require("./config/dbConfig");
const errorHandeller = require("./middlewares/errorHandeller");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(errorHandeller);

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
