const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "resumes/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /pdf/;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a formate of pdf"));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

module.exports = upload;
