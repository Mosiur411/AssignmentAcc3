const JOB = require("../schemas/job.schema");

exports.getAllJobs = async () => {
  return await JOB.find({
    createdBy: "hiring-manager",
  });
};

exports.getSpecificJob = async (id) => {
  return await JOB.findById(id);
};
