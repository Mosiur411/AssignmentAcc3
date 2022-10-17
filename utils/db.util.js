/* external imports */
const mongoose = require("mongoose");
const colors = require("colors");

/* custom colors setup */
colors.setTheme({
  success: "green",
  error: "red",
});

function dbConnection() {
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
}

module.exports = dbConnection;
