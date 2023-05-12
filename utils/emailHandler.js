const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async (data) => {
  const { registrationLink, emailType, sender, receiver, documentName } = data;
  try {
    // create email and send email
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: `${process.env.ETHEREAL_USERNAME}`, //  ethereal user
        pass: `${process.env.ETHEREAL_PASSWORD}`, //  ethereal password
      },
    });
    if (emailType === "signUpInvitation") {
      await transporter.sendMail({
        from: sender.email, // sender address
        to: `${receiver.email}`, // list of receivers
        subject: "Invitation to register with Company XXX",
        html: `<p>Dear ${receiver.name},</p>
                        <p>We are delighted to invite you to join Company XXX. As one of our newest members, you'll have access to a wide range of resources and opportunities to advance your career.</p>
                        <p>To complete your registration, please follow the link below:</p>
                        <a href="${registrationLink}">Registration Link</a>
                        <p>This link is valid for the next 3 hours, so please complete your registration as soon as possible.</p>
                        <p>If you have any questions or concerns, please don't hesitate to reach out to our support team at [Email Address].</p>
                        <p>We look forward to welcoming you to the Company XXX community!</p>
                        <br>
                        <p>Best regards,</p>
                        <p>${"HR Department"}</p>
                        <p>Company XXX</p>`,
      });
    } else if (emailType === "sendDocumentNotification") {
      await transporter.sendMail({
        from: sender.email,
        to: `${receiver.email}`,
        subject: "Notification: Document Submission Required",
        html: `<p>Dear ${receiver.firstName},</p>
                    <p>We hope this email finds you well. This is a friendly reminder that we require you to submit the following document:</p>
                    <ul>
                        <li>${documentName}</li>
                    </ul>
                    <p>Please note that failure to submit the document by the deadline may result in consequences. We highly encourage you to submit the document as soon as possible.</p>
                    <p>If you have any questions or concerns regarding the document submission, please do not hesitate to reach out to us.</p>
                    <p>Thank you for your cooperation.</p>
                    <p>Sincerely,</p>
                    <p>${"HR Department"}</p>`,
      });
    }

    return "sent";
  } catch (err) {
    console.log(err);
    return err;
  }
};
