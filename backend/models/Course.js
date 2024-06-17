const mongoose = require("mongoose");
const course = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  whatYouWillLearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require:true
  },
  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  tag: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
  instruction: {
    type: [String],
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

module.exports = mongoose.model("Course", course);
