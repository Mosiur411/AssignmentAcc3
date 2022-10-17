exports.authorization = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(403).json({
        acknowledgement: false,
        message: "Forbidden",
        description:
          "The request was a legal request, but the server is refusing to respond to it",
      });
    }

    next();
  };
};
