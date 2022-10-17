/* external imports */
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description:
          "The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
