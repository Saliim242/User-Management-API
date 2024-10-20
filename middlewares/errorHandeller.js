const { constants } = require("../utils/constants");

const errorHandaller = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        status: false,
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHIRIZED:
      res.json({
        status: false,
        title: "Unautharized Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        status: false,
        title: "Forbidden Error",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        status: false,
        title: "Not Found Error",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.SERVER_ERROR:
      res.json({
        status: false,
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });

    default:
      console.log("All Thinks Good");
  }
};

module.exports = errorHandaller;
