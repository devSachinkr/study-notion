const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
require("dotenv").config();

exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      tag,
      instruction,
      status
  
    } = req.body;

    const thumbnail = req.files.thumbnailImage;
    // validation

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail ||
      !instruction
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findOne({ _id: userId }).populate("additionalDetails")
   .populate({
   
      path:"courses",
      populate:{
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      }
   })
    //  validation

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }
    // validation on tag

    const CategoryDetails = await Category.findOne({ _id: category })
      .populate(
        {
          path:"course",
          populate:{
            path:"courseContent",
            populate:{
              path:"subSection"
            }
          }
        }
      )
      .exec();
    if (!CategoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }
    // upload image to cloudinary

    const thumbnailUrl = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
      "image"
    );

    // create an entry for new course
    const newCourse = await Course.create({
      courseName,
      thumbnail: thumbnailUrl.secure_url,
      courseDescription,
      price,
      tag,
      category: CategoryDetails,
      whatYouWillLearn,
      instructor: instructorDetails,
      instruction,
      status
    });
   const courseDetails=await Course.findOne({_id:newCourse._id}).populate("courseContent")
    // add the new course to the user schema of instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
      );
     
      await Category.findByIdAndUpdate({_id:category},
    {
      $push:{
        course:newCourse._id
      }
    },
    {new:true}
    )

    //  update tag schema

    // response
    return res.status(200).json({
      success: true,
      message: "Course Created SuccessFully",
      data: newCourse,
    });
  } catch (err) {
    console.error("dfdf",err);
    return res.status(500).json({
      success: false,
      message: "Failed To create course",
    });
  }
};

exports.updateCourseDetails = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      instruction,
      courseId,
      categoryId,
      status
    } = req.body;

    // check for instructor
    if (!courseId) {
      return res.status(404).json({
        success: false,
        messgae: "course Not Found",
      });
    }
    const courseDetails = await Course.findOne({ _id: courseId });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }
    const userId = req.user.id;
    const instructorDetails = await User.findOne({ _id: userId });
    //  validation

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }
    // validation on tag

    const CategoryDetails = await Category.findOne({ _id: categoryId });
    if (!CategoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }
    courseDetails.courseName = courseName;
    courseDetails.courseDescription = courseDescription;
    courseDetails.whatYouWillLearn = whatYouWillLearn;
    courseDetails.price = price;
    courseDetails.tag = tag;
    courseDetails.instruction = instruction;
    courseDetails.category = categoryId;
    courseDetails.status=status;
    const updateCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      courseDetails,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      updateCourse,
      message: "Course Updated successfully",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Failed To create course",
    });
  }
};

exports.updateCourseThumbnail = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(200).json({
        success: false,
        message: "Course ID is required",
      });
    }
    const thumbnail = req.files.thumbnailImage;
    const courseDetails = await Course.findOne({ _id: courseId });
    if (!courseDetails) {
      return res.status(200).json({
        success: false,
        message: "Course Not Found",
      });
    }
    const updatedThumbnailUrl = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
      "image"
    );
    courseDetails.thumbnail=updatedThumbnailUrl.secure_url;
    const updatedImage=  await courseDetails.save()
    return res.status(200).json({
      success: true,
      updatedImage,
      message: "Image Updated successfully",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Failed To Update Thumbnail"+" "+err.message,
    });
  }
};
// Get All Courses (Only Published) -> Handler

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {status:"Published"},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      allCourses,
      message: "Data For All Courses Fetch SuccessFully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Cannot Fetch Course Data",
    });
  }
};
// Get All Courses ( All ) -> Handler

exports.getAllInstructorCourses=async(req,res)=>{
  try {
    const allCourses = await Course.find(
      {instructor:req.user.id},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      allCourses,
      message: "Data For All Courses Fetch SuccessFully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Cannot Fetch Course Data",
    });
  }
}
// Get Course  Details

exports.getCourseDetails = async (req, res) => {
  try {
    // get id
    const { courseId } = req.body;
    const userId=req.user.id
    // find course details
    const courseDetails = await Course.findById({ _id: courseId })
   
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        }
      }).populate({
        path:"instructor",
        populate:{
          path:"courses",
          populate:{
            path:"courseContent",
            populate:{
            path:"subSection"
            },
          },
         
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
   let courseProgressCount=await CourseProgress.findOne({
    courseID:courseId,
    usrId:userId,
   })
    //  validation
    if (!courseDetails) {
      return res.status(400).json({
        success: true,
        message: `Course  not Found ${courseId}`,
      });
    }
    return res.status(200).json({
      success: true,
      courseDetails,
      completedVideos:courseProgressCount?.completedVideo?courseProgressCount?.completedVideo:[],
      message: "Course  details fetch successFully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteCourse=async(req,res)=>{
  try{
   const {courseId}=req.body;
   const checkCourseInDb=await Course.findById(courseId)
   if(!checkCourseInDb){
    return res.status(404).json({
      success:false,
      message:"Course Not Found"
    })
   }
   const instructorId=req.user.id;
   if(!instructorId){
    return res.status(404).json({
      success:false,
      message:"Instructor Not Found"
    })
   }
   await User.findByIdAndUpdate({_id:instructorId},{
    $pull:{
      courses:courseId
    }
   },{new:true})
   await Course.findByIdAndDelete(courseId);
   const updatedUser= await User.findById(instructorId).populate({
    path:"courses",
    populate:{
      path:'courseContent',
      populate:{
        path:"subSection"
      }
    }
   })

   return res.status(200).json({
    success:true,
    data:updatedUser,
    message:"Course Deleted Successfully"
   })
  }catch(err){
    console.log(err.message)
    return res.status(200).json({
      success:false,
      message:"Failed to  Delete Course"
     })
  }
}

exports.getInstructorCourse=async(req,res)=>{
  try{
     const instructorId=req.user.id;
     if(!instructorId){
      return res.status(404).json({
        success:false,
        message:"Instructor not found"
      })
     }
      const  instructorCourses=await Course.find({instructor:instructorId}).sort({createdAt:-1}).populate(
        {
          path:"courseContent",
          populate:{
            path:'subSection'
          }
        },

      ).populate("instructor").populate("category")
      return res.status(200).json({
        success:true,
        data:instructorCourses,
        message:"Course  Get Successfully"
      })
  }catch(err){
    return res.status(500).json({
      success:false,
      error:err.message,
      message:"failed to get course"
    })
  }
}
exports.getCourseDetail=async(req,res)=>{
  try{
    const { courseId } = req.body;
    if(!courseId){
      return res.status(404).json({
        success:false,
        message:"Course not found"
      })
    }
    const courseDetails = await Course.findById({ _id: courseId })
   
    .populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      }
    }).populate({
      path:"instructor",
      populate:{
        path:"courses",
        populate:{
          path:"courseContent",
          populate:{
          path:"subSection"
          },
        },
       
      },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    .exec();
    if (!courseDetails) {
      return res.status(400).json({
        success: true,
        message: `Course  not Found ${courseId}`,
      });
    }
    return res.status(200).json({
      success: true,
      courseDetails,
      message: "Course  details fetch successFully",
    });
  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}