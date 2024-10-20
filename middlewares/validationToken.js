const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateAuthUser = asyncHandler(async (req, res, next) => {
  if (req.headers.Authorization || req.headers.authorization == undefined) {
    res.status(403);
    throw new Error("No Token Provided By The User");
  }
  let token;

  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    // If no token is provided, return an error

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized to access");
      }

      req.auth = decode.auth;

      next();
    });

    if (!token) {
      res.status(403);
      throw new Error("User is not Authorized or token messing in the request");
    }
  }
});

module.exports = validateAuthUser;
