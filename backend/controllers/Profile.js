const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course=require("../models/Course")
require("dotenv").config();

exports.updateProfile = async (req, res) => {
  try {
    // data fetch
    const {
      gender = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
    } = req.body;
    const id = req.user.id;
    // validation
    if (!gender || !contactNumber || !id) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    // find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    // update Profile
    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    // const check = await Profile.findByIdAndUpdate(
    //   { _id: profileId },
    //   profileDetails,
    //   { new: true }
    // )
  await profileDetails.save();
    return res.status(200).json({
      success: true,
      message: "Profile Updated successFully",
      data:userDetails,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: `Failed  to update profile ${err.message}`,
    });
  }
};

// Delete account

exports.deleteAccount = async (req, res) => {
  try {
    // get id
    const id = req.user.id;
    // validation
    const checkId = await User.findById(id);
    if (!checkId) {
      return res.status(404).json({
        success: false,
        message: "Failed to fetching id of user",
      });
    }
    // delete Profile
    await Profile.findByIdAndDelete({ _id: checkId.additionalDetails });
    // enrolled user
    // user delete
    await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Account deleted ",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete account  ",
    });
  }
};
// Get User Details

exports.getUserDetails = async (req, res) => {
  try {
    //  fetching id
    const id = req.user.id;
    //  validation
    const checkId = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    if (!checkId) {
      return res.status(404).json({
        success: false,
        message: "Failed to fetching id of user",
      });
    }
    return res.status(200).json({
      success: true,
      checkId,
      message: "User Data fetched successFully",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get User Details ",
      message: err.message,
    });
  }
};
// Enrolled courses
exports.getEnrolledCourses=async(req,res)=>{
  try{
    const userId=req.user.id;
    const userDetails=await User.findOne({_id:userId}).populate({
      path:"courses",
      populate:{
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      }
    }).exec()
    if(!userDetails){
      return res.status(400).json({
        success:false,
        message:"user not found"
      })
    }
    return res.status(200).json({
      success:true,
      data:userDetails.courses,
      message:"course get successfully"
    })
  }catch(err){
 return res.status(500).json({
  success:false,
  message:'server side issue',
  error:err.message
 })
  }
}
//  update dp picture
exports.updateDisplayPic=async(req,res)=>{
  try{
    const pic=req.files.dp;
    const userId=req.user.id;
    const image=await uploadImageToCloudinary(pic,process.env.FOLDER_NAME,"image");
    const updatedProfile=await User.findByIdAndUpdate({_id:userId},{image:image.secure_url},{new:true})
    return res.status(200).json({
      success:true,
      updatedProfile,
      message:'image updated successfully'
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
  })
}
}
// get user information for instructor Dashboard

exports.instructorDashboard=async(req,res)=>{
  try{
    const instructorId=req.user.id;
    if(!instructorId){
      return res.status(400).json({
        success:false,
        message:"Login First"
    })
  }
  const courseDetails=await Course.find({instructor:instructorId});
     
  if (!courseDetails){
    return res.status(404).json({
      success:false,
      message:"Course not found"
  })
  }
      const courseData=courseDetails?.map((course)=>{
        const totalStudentEnrolled=course.studentEnrolled.length;
        let totalAmount=totalStudentEnrolled*course.price;
        const courseDataWithStats={
          _id:course._id,
          courseName:course.courseName,
          courseDescription:course.courseDescription,
          totalAmount,
          totalStudentEnrolled,
        }
        return courseDataWithStats;
      })
      res.status(200).json({
        success:true,
        courses:courseData
      })
  }catch(err){
    return res.status(500).json({
      success:false,
      error:err.message,
      message:"Inernal srever error"
  })
  }
}