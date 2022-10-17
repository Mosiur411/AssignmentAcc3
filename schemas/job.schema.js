/**
 * Title: Create an Job model schema
 * Description: Schema that directly validate Job credentials and potentials
 * Author: Hasibul Islam
 * Date: 12/10/2022
 */

/* external imports */
const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      required: [true, "Please provide a job title"],
      unique: [true, "Company name already exists"],
      maxLength: 50,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide a job title"],
      maxLength: [200, "Job title won't be more than 200 characters"],
    },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid company email"],
    },
    description: {
      type: String,
      required: [true, "Please provide a job description"],
      trim: true,
      maxLength: [1500, "Job description won't be 1500 characters"],
    },
    location: {
      type: String,
      required: [true, "Please provide a company location"],
      trim: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url of your company"],
    },
    tags: [String],

    createdBy: {
      type: String,
      enum: ["hiring-manager", "admin"],
      default: "hiring-manager"
    },

    deadline: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setDate(
          date.getDate() + Math.floor(Math.random() * (7 - 1 + 1) + 1)
        );
        return date;
      },
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

const JOB = new mongoose.model("JOB", jobSchema);
module.exports = JOB;
