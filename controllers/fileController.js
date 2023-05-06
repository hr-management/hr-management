// controllers/fileUploadController.js

const userModel = require("../models/User");

const uploadFile = async (req, res) => {
  try {
    const userId = req.tokenUser._id;
    const fileType = req.body.fileType;

    // 
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          workAuthDoc: {
            type: fileType,
            status: "submitted",
            file: req.file.location,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "File uploaded successfully",
      url: req.file.location,
      id: userId,
      fileType: fileType,
      user: updatedUser
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  uploadFile,
};
