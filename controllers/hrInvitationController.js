const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const RegistrationHistoryModel = require("../models/registrationHistory");

// generate token and send email
exports.invitation = async (req, res) => {
  const hr = "hr1"; // should get it from token
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(401).json({ message: "Please provide email and name." });
  }
  const salt = process.env.JWT_SALT;
  const token = jwt.sign(
    {
      email,
      name,
    },
    salt,
    {
      expiresIn: 60 * 60 * 3,
    }
  );
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: `${process.env.ETHEREAL_USERNAME}`, //  ethereal user
      pass: `${process.env.ETHEREAL_PASSWORD}`, //  ethereal password
    },
  });
  const registrationLink = `${req.protocol}://${req.headers.host}/signup?token=${token}`;
  try {
    await transporter.sendMail({
      from: "hr@example.email", // sender address
      to: `${email}`, // list of receivers
      subject: "Invitation to register with Company XXX",
      html: `<p>Dear ${name},</p>
    <p>We are delighted to invite you to join Company XXX. As one of our newest members, you'll have access to a wide range of resources and opportunities to advance your career.</p>
    <p>To complete your registration, please follow the link below:</p>
    <a href="${registrationLink}">Registration Link</a>
    <p>This link is valid for the next 3 hours, so please complete your registration as soon as possible.</p>
    <p>If you have any questions or concerns, please don't hesitate to reach out to our support team at [Email Address].</p>
    <p>We look forward to welcoming you to the Company XXX community!</p>
    <br>
    <p>Best regards,</p>
    <p>${hr}</p>
    <p>Company XXX</p>`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "can't send email", err });
  }
  try {
    await RegistrationHistoryModel.create({
      email,
      name,
      registrationLink,
      status: "sent",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "can't create registration history", err });
  }

  return res.status(200).json({ message: "invited" });
};

exports.getInvitationHistory = async (req, res) => {
  const history = await RegistrationHistoryModel.find();
  return res.status(200).json({ message: "success", history });
};

exports.getInfoForNewApplicaiton = async (req, res) => {
  const email = req.tokenUser.email;
  return res.status(200).json({ message: "success", user: email });
};
