const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto=require("crypto");
const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  if (courses.length === 0) {
    return res.json({
      success: false,
      message: "Failed to get courses",
    });
  }
  let totalAmount = 0;
  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Failed to find courses",
        });
      }
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "You already purchased this course",
        });
      }
      totalAmount += course.price;
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: true,
        message: err.message,
      });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };
  try {
    const paymentResopnse = await instance.orders.create(options);
    

    return res.status(200).json({
      success: true,
      data:paymentResopnse,
      message: "ha ho hi gaya hai ",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Couldn't initiate the order",
    });
  }
};

exports.verifySignature = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({
      success: false,
      message: "Payment Failed",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
    if (expectedSignature === razorpay_signature) {
      await enrolledStudent(courses, userId, res);
      return res.status(200).json({
        success: true,
        message: "Payment Successfull",
      });
    }
  return res.status(500).json({
    success: false,
    message: "Payment failed",
  });
};
const enrolledStudent = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(404).json({
      success: false,
      message: "please provide the data of user and course",
    });
  }
  for (const courseId of courses) {


    try{
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: {
            studentEnrolled: userId,
          },
        },
        {
          new: true,
        }
      );
      if(!enrolledCourse){
        return res.status(404).json({
          success:false,
          message:"course not found"
        })
      }
      const courseProgress=CourseProgress.create({
        courseID:courseId,
        userId:userId,
        completedVideo:[],
      })
      const enrolledStudents=await User.findByIdAndUpdate({_id:userId},{
        $push:{
          courses:courseId,
          courseProgress:courseProgress._id
        }
      },{new:true})
        const emailResponse = await mailSender(
           enrolledStudents.email,
           `successfully Enrolled into ${enrolledCourse.courseName}`
          
        )
    }catch(err){
        return res.status(500).json({
          success:false,
          message:"Payment Failed Internal server error"
        })
    }
  }
};

exports.sendPaymentSuccessEmail=async(req,res)=>{
         const {orderId,paymentId,amount}=req.body;
         const userId=req.user.id;
         if(!orderId||!paymentId||!amount||!userId){
              return res.status(400).json({
                success:false,
                message:"please provide all the details"
              })
         }
      try{
        const enrolledStudent=await User.findById(userId);
        await mailSender(
          enrolledStudent.email,
          `Payment Recived`,
          amount/100,orderId,paymentId
        )
        
      }catch(err){
        console.log(err.message)
        return res.status(500).json({
          success:false,
          message:"Internal Server Error "
        })
      }

}
// // capture the payment
// exports.capturePayment = async (req, res) => {
//   // get course id & user id
//   const { course_id } = req.body;
//   const userId = req.user.id;
//   // validation
//   // valid course id
//   if (!course_id) {
//     return res.status(404).json({
//       success: false,
//       message: "course not found ",
//     });
//   }
//   // valid course detail
//   let course;
//   try {
//     course = await Course.findById(course_id);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "course not found ",
//       });
//     }
//     // if user already pay
//     const uid = new mongoose.Types.ObjectId(userId);
//     if (course.studentEnrolled.includes(uid)) {
//       return res.status(200).json({
//         success: false,
//         message: "user already enrolled",
//       });
//     }
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
//   // create order

//   const amount = course.price;
//   const currency = "INR";
//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       course_id: course_id,
//       userId,
//     },
//   };
//   try {
//     // initiate the payment
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);
//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({
//       success: false,
//       message: "Payment failed",
//     });
//   }
//   // return res
// };
// exports.verifySignature = async (req, res) => {
//   const webhookSecret = "123456789";
//   const signature = req.headers["x-razorpay-signature"];
//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");
//   if (signature === digest) {
//     console.log("Payment is authorize");
//     const { courseId, userId } = req.body.payload.payment.entity.notes;

//     try {
//       //  fullfill action
//       const enrolledCourse = await Course.findOne(
//         { _id: courseId },
//         { $push: { studentEnrolled: userId } },
//         { new: true }
//       );
//       if (!enrolledCourse) {
//         return res.status(500).json({
//           success: false,
//           message: "course not found",
//         });
//       }
//       console.log(enrolledCourse);
//       const enrolledStudent = await User.findOneAndUpdate(
//         { _id: userId },
//         { $push: { course: courseId } },
//         { new: true }
//       );
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         "conguralations"
//       );
//       return res.status(200).json({
//         success: true,
//         message: "signature verified",
//       });
//     } catch (err) {
//       console.log(err.message);
//       return res.status(200).json({
//         success: true,
//         message: "signature verified failed",
//       });
//     }
//   } else {
//     return res.status(400).json({
//       success: false,
//       message: "failed",
//     });
//   }
// };
