const express = require("express");
const router = express.Router();

const {
  login,
  signUp,
  sendOtp,
  changePassword,
  form,
} = require("../controllers/Auth");
// const {
//   resetPasswordToken,
//   resetPassword,
// } = require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth");

// routes for login signup and auth

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOtp);
router.post("/changepassword", auth, changePassword);
router.post("/form-submit",form)

// reset password route
// router.post("/resetPasswordToken", auth, resetPasswordToken);
module.exports = router;
