const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// reset password  token



exports.resetPasswordToken = async (req, res) => {
  try {
    // fetch data from user
    const { email } = req.body;
    // Already Exist
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Your email is not registered" });
    }
    // generate Token
    const token = crypto.randomUUID();
    //  add token and expire time to user
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    // creating Link
    const url = `http://localhost:3000/update-password/${token}`;

    // send mail
    await mailSender(
      email,
      "Password Reset ",
      `Password Reset Link ${url}`
    );
    return res.status(200).json({
      success: true,
      message: "Reset Mail SuccessFully Send",
    });
  } catch (err) {
    console.error("Error While Sending Reset Mail", err);
    return res.status(500).json({
      success: false,
      message: "  Failed To Send Reset Mail " + err.message,
    });
  }
};




// reset  passsword
exports.resetPassword = async (req, res) => {
  try {
    // fetch data
    const { password, confirmPassword, token } = req.body;
    // validation
    if (password !== confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "Password Doesn't Match",
      });
    }
    // get user details from db using token
    const userDetails = await User.findOne({ token: token });
    // invalid token
    if (!userDetails) {
      return res.status(403).json({
        success: false,
        message: "Invalid Token",
      });
    }
    // token time check
    if (userDetails.recentPasswordExpires < Date.now()) {
      return res.status(403).json({
        success: false,
        message: " Token Expired",
      });
    }
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // update  password
    await User.findOneAndUpdate(
      { token: token },
      { password: hashPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password Change SuccessFully",
    });
  } catch (err) {
    console.error(
      "Something went wrong while changing the password ",
      err.message
    );
  }
};

