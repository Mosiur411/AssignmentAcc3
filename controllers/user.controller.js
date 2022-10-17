/* external import */
const nodemailer = require("nodemailer");

/* internal import */
const User = require("../schemas/user.schema");
const userService = require("../services/user.service");

exports.registerAnUser = async (req, res, next) => {
  try {
    const result = await userService.registerAnUserService(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "New user created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginAnUser = async (req, res, next) => {
  try {
    const result = await userService.loginAnUser(req.body);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully logged in",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await userService.getMe(req?.user?.email);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully find out existing user",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description:
        "A generic error message, given when no more specific message is suitable",
    });
  }
};
