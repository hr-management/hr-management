const { ObjectId } = require("mongodb");
const userModel = require("../models/User");

const uploadFile = async (req, res) => {
  try {
    const userId = req.tokenUser._id;
    const fileType = req.body.fileType;
    res.status(200).json({
      message: "File uploaded successfully",
      url: req.file.location,
      id: userId,
      fileType: fileType,
      user: req.tokenUser
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  uploadFile,
};
