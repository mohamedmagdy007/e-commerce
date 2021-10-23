const { isAuth } = require("./Token");
const multer = require("multer");
const express = require("express");
const uploadRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

uploadRouter.post('/', isAuth, upload, (req, res) => {
  res.send(`/${req.file.filename}`);
});
module.exports = uploadRouter;