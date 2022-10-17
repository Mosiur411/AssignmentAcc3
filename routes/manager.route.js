const express = require("express");
const jobsController = require("../controllers/manager.controller");
const { authorization } = require("../middleware/authorization.middleware");
const { verifyToken } = require("../middleware/verify.middleware");

const router = express.Router();

router.get(
  "/jobs",
  verifyToken,
  authorization("hiring-manager", "admin"),
  jobsController.getAllJobs
);
router.get("/jobs/:id", jobsController.getSpecificJob);

module.exports = router;
