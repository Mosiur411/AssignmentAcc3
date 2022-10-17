/* external import */
const bcrypt = require("bcryptjs");

/* internal import */
const User = require("../schemas/user.schema");
const { generateToken } = require("../utils/token.util");

exports.registerAnUserService = async (data) => {
  const user = new User(data);
  const result = await user.save();
  return result;
};

exports.loginAnUser = async (data) => {
  const userInfo = await User.findOne({ email: data.email });
  const { password, ...user } = userInfo.toObject();
  const token = generateToken(user);

  if (user) {
    const isValidPassword = bcrypt.compareSync(data.password, password);
    if (isValidPassword) {
      return {
        user,
        token,
      };
    } else {
      return {
        error: "Password is wrong!",
      };
    }
  } else {
    return { error: "User not exists!" };
  }
};

exports.getMe = async (email) => {
  return await User.findOne({ email });
};
