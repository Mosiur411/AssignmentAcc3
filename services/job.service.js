/* external import */
const JOB = require("../schemas/job.schema");

exports.insertNewJob = async (data) => {
  const result = await JOB.create(data);
  return result;
};

exports.displayAllJobs = async () => {
  const result = await JOB.find({});
  return result;
};

exports.displaySpecificJob = async (id) => {
  const result = await JOB.findById(id);
  return result;
};

exports.modifyExistingJobCredentials = async (id, data) => {
  const result = await JOB.updateOne(
    { _id: id },
    { $set: data },
    {
      runValidators: true,
    }
  );
  return result;
};

exports.applyOnSpecificJobPost = async (id) => {
  const job = await JOB.findById(id);
  const expired = new Date() > new Date(job.deadline);
  if (expired) {
    return {
      acknowledgement: false,
      message: "Deadline over",
    };
  }

  return {
    acknowledgement: true,
    message: "Your application under review, TYSM",
  };
};
