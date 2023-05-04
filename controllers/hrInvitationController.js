const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const RegistrationHistoryModel = require("../models/registrationHistory");

// generate token and send email
exports.invitation = async (req, res) => {
  try {
      const hr = "hr1"; // should get it from token
      const { email, name } = req.body;
      if ( !name) {
          return res.status(400).json({ message: "Please provide name." });
      }
       //check if email is unique
       const existingEmailUser = await RegistrationHistoryModel.findOne({ email });
      if (existingEmailUser) {
              return res.status(400).json({
                     success: false,
                      message: 'Email address is already in use',
                      });
        }
      // create token - valid for 3 hours 
      const salt = process.env.JWT_SALT;
      const token = jwt.sign({email,name,},salt,{expiresIn: 60 * 60 * 3});
      // create email and send email
      let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                  user: `${process.env.ETHEREAL_USERNAME}`, //  ethereal user
                  pass: `${process.env.ETHEREAL_PASSWORD}`, //  ethereal password
                  },
        });
      const registrationLink = `${req.protocol}://${req.headers.host}/signup?token=${token}`;
  
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
            .json({ success: false,message: "Something went wrong", err });
}
};

exports.getInvitationHistory = async (req, res) => {
  try {
    const history = await RegistrationHistoryModel.find();
    return res.status(200).json({ success: true, history });
  } catch (err) {
    return res.status(500).json({ success: false,message: "Something went wrong", err });
  }
}
  


exports.getInfoForNewApplicaiton = async (req, res) => {
  try {
    const email = req.tokenUser.email;
    return res.status(200).json({ success: true, user: email });
 } catch (err) {
    return res.status(500).json({ success: false,message: "Something went wrong", err });
  }
  
};
