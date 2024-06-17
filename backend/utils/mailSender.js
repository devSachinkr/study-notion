const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    // making Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // Sending Mail
    let info = transporter.sendMail({
      from: ` Study Noation  -Sachin  ${process.env.MAIL_USER}`,
      to: `${email}`,
      subject: `${title}`,
      html: ` OTP :  ${body}`,
    });
    console.log("email", info);
    return info;
  } catch (err) {
    console.log(err.message);
    console.error(err);
    console.log("Failed To Send Mail");
  }
};

module.exports = mailSender;
