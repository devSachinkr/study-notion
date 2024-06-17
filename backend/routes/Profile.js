// import  requires  modules

const express = require("express");
const router = express.Router();

const { auth,isInstructor } = require("../middlewares/auth");

const {
  updateProfile,
  deleteAccount,
  getUserDetails,
  getEnrolledCourses,
  updateDisplayPic,
  instructorDashboard
} = require("../controllers/Profile");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password",resetPassword);
router.post("/instructor-dashboard",auth,isInstructor,instructorDashboard);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPic);

module.exports = router;
