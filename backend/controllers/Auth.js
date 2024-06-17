const User = require("../models/User");
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Form=require("../models/Form")
require("dotenv").config();

// send Otp

exports.sendOtp = async (req, res) => {
  try {
    // get email
    const { email } = req.body;
    // validation for already sign up
    const checkMail = await User.findOne({ email });
    if (checkMail) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }
    // generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check unique otp

    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const payload = { email, otp };
    // entry in db for otp
    const otpbody = await OTP.create(payload);
    return res.status(200).json({
      success: true,
      message: "Otp Sent SuccessFully",
      otp,
    });
  } catch (err) {
    console.error("Failed To Send OTP ", err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// sign up

exports.signUp = async (req, res) => {
  try {
    // Fetch Data From Body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber, 
      otp,
    } = req.body;
    // vaildation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    // matching password and confirm password

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password doesn't  match",
      });
    }

    // Check New User
    const existUser = await User.findOne({ email });
    // validation
    if (existUser) {
      return res.status(401).json({
        success: false,
        message: "Already registered",
      });
    }
    // find most recent otp
    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Invalid",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP Invalid",
      });
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // entry in db of user
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
  
    const user = await User.create({
      firstName,
      lastName, 
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    return res.status(200).json({
      success: true,
      message: "Registration SuccessFull",
      user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: " failed . user can't registered" + err,
    });
  }
};
// login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Email and Password are required",
      });
    }
    // check valid user
    const validUser = await User.findOne({ email }).populate("additionalDetails").populate({
      path:"courses",
      populate:{
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      }
    }).exec();
    // validation
    if (!validUser) {
      return res.status(403).json({
        success: false,
        message: "Sign Up First",
      });
    }
    // Check Password & Generate JWT Token & Generate Cookies
    if (await bcrypt.compare(password, validUser.password)) {
      const payload = {
        email: validUser.email,
        id: validUser._id,
        role: validUser.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIREIN,
      });
      validUser.token = token;
      validUser.password = undefined;

      // generate cookie
      const options = {
        expiresIn: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res.cookie("token", token, options).status(200).json({
        success: true,
        validUser,
        token,
        message: "Login successFully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    console.error("failed to login", err);
    return res.status(500).json({
      success: false,
      message: "Login failed" + err.message,
    });
  }
};


// change password

exports.changePassword = async (req, res) => {
  try {
    // fetch user data
    const {currentPassword,changePassword}=req.body;
    const userId=req.user.id;
 
    // get old pass & make newpass & confirm pass
    const user=await User.findOne({_id:userId})
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User Not Found"
      })
    }

    const checkPass= await bcrypt.compare(currentPassword,user.password)
    // validation
    if(!checkPass){
      return res.status(401).json({
        success:false,
        message:"Password Incorrect"
      })
    }
    //  update pass in db
    const hashedPassword = await bcrypt.hash(changePassword, 10);
       const setPassword=await User.findByIdAndUpdate({_id:userId},{password:hashedPassword},{new:true})
    
    // send success email
    // res send
    return res.status(200).json({
      success:false,
      message:"Password Change Successfully",
      setPassword
    })
  } catch (err) {
    console.error("failed to login", err);
    return res.status(500).json({
      success: false,
      message: "Failed  to change password" + " " + err.message,
    });
  }
};


// feed back / from

exports.form=async(req,res)=>{
   try{
     const {firstName,lastName,phoneNumber,message,email,countryCode}=req.body;
     if(!firstName||!lastName||!message||!email||!phoneNumber||!countryCode){
       return res.status(404).json({
         success:false,
         message:"All fields are required"
        })
      }
      const response=await Form.create({
        firstName,lastName,message,phoneNumber,email,countryCode
      })
      return res.status(200).json({
        success:true,
        response,
        message:"Form submited Successfully"
      })
   }catch(err){
    return res.status(500).json({
      success:false,
      message:" Faild to submit form"+err.message,
    })
   }
}