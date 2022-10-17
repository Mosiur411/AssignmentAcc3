/**
 * Title: Create an User model schema
 * Description: Schema that directly validate User credentials and potentials
 * Author: Hasibul Islam
 * Date: 12/10/2022
 */

/* external imports */
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is required"],
      validate: [validator.isEmail, "Provide a valid email address"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 5,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 2,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough.",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Retry, password won't match",
      },
    },
    role: {
      type: String,
      enum: ["admin", "hiring-manager", "candidate"],
      default: "candidate",
    },
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [50, "Name is too large, use nick-name"],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number",
      ],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* middleware to encrypt password */
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    this.confirmPassword = undefined;
  } catch (error) {
    next(error);
  }
});

userSchema.post("save", async function (next) {
  try {
    console.log(colors.bgMagenta.bold("Password encryption successful"));
  } catch (error) {
    next(error);
  }
});

const User = new mongoose.model("Users", userSchema);
module.exports = User;

/**
 * Password demo:
 * --------------
 * SadiA@01
 * HasiB@62
 * Admin123#
 */
