// import  requires  modules

const express = require("express");
const router = express.Router();

// import controller of course
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  updateCourseDetails,
  updateCourseThumbnail,
  deleteCourse,
  getInstructorCourse,
  getCourseDetail,
  getAllInstructorCourses
} = require("../controllers/Course");

// import controller of category

const {
  createCategory,
  showAllCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// import controller of section

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

//  import controller of sub-section
const {
  createSubSection,
  deleteSubSection,
  updateSubSection,
} = require("../controllers/SubSection");
// some more controllers are pending...

// rating controllers
const {
  createRating,
  getAverageRating,
  getAllRatingAndReviews,
} = require("../controllers/RatingAndReview");

//  course progress controllers
const { updateCourseProgress} = require("../controllers/CourseProgress");

// importing middlewares
const {
  auth,
  isStudent,
  isAdmin,
  isInstructor,
} = require("../middlewares/auth");

//  course  routes

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/updateCourse",auth,isInstructor,updateCourseDetails)
router.post("/updateThumbnail",auth,isInstructor,updateCourseThumbnail)
router.delete("/deleteCourse",auth,isInstructor,deleteCourse)
router.get("/instructor-courses",auth,isInstructor,getAllInstructorCourses)
router.post("/addSection", auth, isInstructor, createSection);
router.post("/instructorCourse",auth,isInstructor,getInstructorCourse)
router.post("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection/", auth, isInstructor, deleteSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.delete("/delete-sub-section", auth, isInstructor, deleteSubSection);
router.put("/update-sub-section", auth, isInstructor, updateSubSection);
// get all register courses
router.get("/getAllCourses", getAllCourses);
// get details of a spesific user
router.post("/getCourseDetails",auth, getCourseDetails);
router.post("/getCourseDetail", getCourseDetail);

// category routes
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);

// rating and reviews routes
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingAndReviews);

// course progress controllers
router.post("/update-course-progress", auth , updateCourseProgress);

module.exports = router;
