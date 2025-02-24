const express = require("express");
const router = express.Router();

const { capturePayment, verifySignature,sendPaymentSuccessEmail } = require("../controllers/Payments");
const {
  auth,
  isStudent,
} = require("../middlewares/auth");
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature",auth,isStudent, verifySignature);
router.post("/sendPaymentEmail",auth,isStudent, sendPaymentSuccessEmail);

module.exports = router;
