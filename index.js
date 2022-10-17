/**
 * Title: Job Portal Assignment
 * Description: Create a job portal with respect the following link: https://docs.google.com/document/d/1203fnsSyBuOhnFiqhGxLWRXTy6u3nRdMzOaVAr48QA0/edit
 * Author: Hasibul Islam
 * Date: 12/10/2022
 */

/* external imports */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

/* internal imports */
const errorHandler = require("./middleware/error.middleware");
const dbConnection = require("./utils/db.util");

/* custom colors setup */
colors.setTheme({
  success: "green",
  error: "red",
});

/* router level imports */
const jobRoute = require("./routes/job.route");
const userRoute = require("./routes/user.route");
const managerRoute = require("./routes/manager.route");

/* application level connections */
const app = express();
const port = process.env.PORT || 8080;

/* middleware connections */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* router level connections */
app.use("/jobs", jobRoute);
app.use("/user", userRoute);
app.use("/manager", managerRoute);

/* global error handler */
app.use(errorHandler);

/* database connection */
// dbConnection();
mongoose
  .connect(process.env.DB_URI, {
    dbName: "job-portal-assignment",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Success: MongoDB connected with Mongoose".green.bold.italic);
  })
  .catch((error) => console.log(`Error: ${error.name}`.error.bold));

/* enable backend connection */
app.get("/", async (req, res) => {
  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "The request is OK",
  });
});

/* enable server */
app.listen(port, () => {
  console.log(
    colors.green.italic.bold(`Success: Job portal connected on port ${port}`)
  );
});
