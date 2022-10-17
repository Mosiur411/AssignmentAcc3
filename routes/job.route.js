/* external import */
const express = require("express");

/* internal import */
const jobController = require("../controllers/job.controller");
const upload = require("../middleware/upload.middleware");

/* router level connection */
const router = express.Router();

router
  .route("/")
  .post(jobController.insertNewJob)
  .get(jobController.displayAllJobs);

router
  .route("/:id")
  .get(jobController.displaySpecificJob)
  .patch(jobController.modifyExistingJobCredentials);

router.post(
  "/:id/apply",
  jobController.applyOnSpecificJobPost,
  upload.single("resume")
);

module.exports = router;
