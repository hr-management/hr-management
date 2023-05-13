// controllers/fileUploadController.js
const { ObjectId } = require("mongodb");
const userModel = require("../models/User");

const uploadFile = async (req, res) => {
  try {
    const user = req.tokenUser;
    const documentType = req.body.documentType;
    const fileId = req.body.fileId;
    if (!documentType) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide documentType: workAuthDoc, driverLicensePhoto, profilePhoto",
      });
    }
    let updatedUser;
    if (documentType === "workAuthDoc") {
      if (!fileId) {
        return res.status(400).json({
          success: false,
          message: "Please provide file Id to update the file",
        });
      }
      if (user.workAuthDoc.length > 0) {
        updatedUser = await userModel.findOneAndUpdate(
          { _id: user._id, "workAuthDoc._id": new ObjectId(fileId) },
          {
            $set: {
              "workAuthDoc.$.status": "submitted",
              "workAuthDoc.$.file": req.file.location,
            },
          },
          { new: true } // Return the updated document instead of the original
        );
      } else {
        return res.status(400).json({
          success: false,
          message: "Can't update document",
        });
      }
    } else if (documentType === "driverLicensePhoto") {
      updatedUser = await userModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { "driverLicense.photo": req.file.location } },
        { new: true }
      );
    } else if (documentType === "profilePhoto") {
      updatedUser = await userModel.findOneAndUpdate(
        { _id: user._id },
        { profilePhoto: req.file.location },
        { new: true }
      );
    }
    return res.status(200).json({
      message: "File uploaded successfully",
      url: req.file.location,
      documentType,
      id: user._id,
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
};

module.exports = {
  uploadFile,
};
