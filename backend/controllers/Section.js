const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    //  data Fetch
    const { name, courseId } = req.body;

    // validation
    if (!name || !courseId) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    // section create
    const newSection = await Section.create({ name });
    // push new section to course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      {
        new: true,
      }
    ).populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    }).exec();

    return res.status(200).json({
      success: true,
      updatedCourse,
      message: "New Section Created SuccessFully",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create New Section ",
      error: err.message,
    });
  }
};

/*
 * update  Section
 */

exports.updateSection = async (req, res) => {
  try {
    //   data fetch
    const { name, sectionId ,courseId} = req.body;
    // validation
    if (!name || !sectionId) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    // update data
      await Section.findByIdAndUpdate(
      sectionId,
      {
        name,
      },
      { new: true }
    );
    const updatedSection=await Course.findById({_id:courseId}).populate(
     {
      path:"courseContent",
      populate:{
         path:"subSection"
      }
     }
    ).exec()
    return res.status(200).json({
      success: true,
      data:updatedSection,
      message: "Section Updated SuccessFully",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create New Section ",
      error: err.message,
    });
  }
};

/**
 * Delete Section
 */


exports.deleteSection = async (req, res) => {
  try {
    //     get id
    const { sectionId,courseId } = req.body;
   
    // delete id
    await Course.findByIdAndUpdate({_id:courseId},{
      $pull:{
        courseContent:sectionId
      }
    },{new:true})
     await Section.findByIdAndDelete(sectionId);
    const updatedCourse=await Course.findById({_id:courseId}).populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    }).exec();
    return res.status(200).json({
      success: true,
      data:updatedCourse,
      message: "Section Deleted SuccessFully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete  Section ",
      error: err.message,
    });
  }
};
