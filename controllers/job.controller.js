const jobService = require("../services/job.service");

exports.insertNewJob = async (req, res, next) => {
  try {
    const result = await jobService.insertNewJob(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "New JOB created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.displayAllJobs = async (req, res, next) => {
  try {
    const result = await jobService.displayAllJobs();

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching all jobs",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.displaySpecificJob = async (req, res, next) => {
  try {
    const result = await jobService.displaySpecificJob(req.params.id);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching the specific job",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.modifyExistingJobCredentials = async (req, res, next) => {
  try {
    const result = await jobService.modifyExistingJobCredentials(
      req.params.id,
      req.body
    );

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Existing product modified",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.applyOnSpecificJobPost = async (req, res, next) => {
  try {
    const result = await jobService.applyOnSpecificJobPost(req.params.id);

    if (result.acknowledgement) {
      next();
      res.json({
        data: result,
      });
    }

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
