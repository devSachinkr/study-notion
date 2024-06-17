const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth

exports.auth = async (req, res, next) => {
  try {
    const token =
    req.cookies.token ||
    req.body.token||
    req.header("Authorisation").replace("Bearer ", "");
    
    // validation
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    // vertify the token

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decode;
    } catch (err) {
      console.log(err.message);
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token" + err
    });
  }
};

// is Student

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students ",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "This role only for Students",
    });
  }
};

/**
 * Is Admin
 */
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "This role only for Admin",
    });
  }
};
/**
 * Is Instructor
 */
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.role !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor ",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "This role only for Instructor",
    });
  }
};
