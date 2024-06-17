const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// create rating
exports.createRating = async (req, res) => {
  try {
    // get user id 
    const userId = req.user.id;
    //  fetch user data
    const { rating, review, courseId } = req.body;
     
    // check if urer enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "You are not enrolled in the course",
      });
    }
    // one time rating
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course:courseId,
    });
    // create rating & review
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "already reviewed",
      });
    }
    // update course with this rating & review
    const ratingAndReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });
    // update course with rating
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingAndReview._id,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
     data: ratingAndReview,
      message: "Rating And Review Created SuccessFully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get average rating
exports.getAverageRating = async (req, res) => {
  try {
    // get course id
    const courseId = req.body.courseId;
    // claculate average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    // return rating
    if (result.length > 0) {
      return res
        .status(200)
        .json({ success: true, averageRating: result[0].averageRating });
    }
    return res.status(200).json({
      success: true,
      message: "avg rating is 0 rating given til now",
      averageRating: 0,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// get all rating
exports.getAllRatingAndReviews = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "All review fetched successfully",
      allReviews,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
