const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender.js");
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 10* 60,
  },
});

// Sending Mail

const sendVerificationEmail = async (email, otp) => {
  try {
       await mailSender(email, "Verification Code ", otp);
  } catch (err) {
    console.error(
      "Error Occoured While  Sending OTP Through Mail",
      err.message
    );
  }
};

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
