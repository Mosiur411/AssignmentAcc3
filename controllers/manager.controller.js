const jobsService = require("../services/manager.service");

exports.getAllJobs = async (req, res, next) => {
  try {
    const result = await jobsService.getAllJobs();

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching jobs as a whole",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSpecificJob = async (req, res, next) => {
  try {
    const result = await jobsService.getSpecificJob(req.params.id);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching jobs as a whole",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
