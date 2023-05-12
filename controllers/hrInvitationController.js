const jwt = require("jsonwebtoken");
require("dotenv").config();
const RegistrationHistoryModel = require("../models/registrationHistory");
const sendEmail = require("../utils/emailHandler");
// generate token and send email
exports.invitation = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Please provide name." });
    }
    //check if email is unique
    const existingEmailUser = await RegistrationHistoryModel.findOne({ email });
    if (existingEmailUser) {
      return res.status(400).json({
        success: false,
        message: "Email address is already in use",
      });
    }
    const hr = req.tokenUser;
    // create token - valid for 3 hours
    const salt = process.env.JWT_SALT;
    const token = jwt.sign({ email, name }, salt, { expiresIn: 60 * 60 * 3 });
    const registrationLink = `${req.protocol}://localhost:4200/signup?token=${token}`;
    await sendEmail({
      registrationLink,
      emailType: "signUpInvitation",
      sender: hr,
      receiver: { email, name },
    });

    //save to database for future checking

    await RegistrationHistoryModel.create({
      email,
      name,
      registrationLink,
      status: "sent",
    });
    return res.status(200).json({ success: true, message: "invited" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", err });
  }
};

exports.getInvitationHistory = async (req, res) => {
  try {
    const history = await RegistrationHistoryModel.find();
    return res.status(200).json({ success: true, history });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", err });
  }
};

exports.getInfoForNewApplicaiton = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SALT, (error, payload) => {
      if (error) {
        return res.status(403).json({ success: false, message: error.message });
      }
      const email = payload.email;
      return res.status(200).json({ success: true, user: email });
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", err });
  }
};

exports.sendDocumentNotification = async (req, res) => {
  try {
    const { documentName } = req.body;
    if (!documentName) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a document name" });
    }

    const hr = req.tokenUser;
    const employee = req.employee; // from findEmplyeeById middleware
    await sendEmail({
      emailType: "sendDocumentNotification",
      sender: hr,
      receiver: employee,
      documentName,
    });
    return res
      .status(200)
      .json({ success: true, message: "sent notification" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", err });
  }
};
