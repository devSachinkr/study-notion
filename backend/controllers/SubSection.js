const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// create
exports.createSubSection = async (req, res) => {
  try {
    //   fetch data
    const { title, description, sectionId } = req.body;
    
    const video = req.files.video;
   
    // validation
    if (!title ||  !description || !sectionId) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    // upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME,
      "video"
    );
    // create Subsection
    console.log()
    const createSubSection = await SubSection.create({
      title: title,
      description: description,
      timeDuration:uploadDetails.duration,
      videoUrl: uploadDetails.secure_url,
    });
    // push subsection to section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },

      {
        $push: {
          subSection: createSubSection._id,
        },
    
      },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      createSubSection,
      updatedSection,
      message: "Sub-Section Created SuccessFully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create New SubSection ",
      error: err.message,
    });
  }
};

// update
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, title, description, timeDuration,id } = req.body;
    const subSection = await SubSection.findById(sectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Sub Section not found",
      });
    }
    if (title !== undefined) {
      subSection.title = title;
    }
    if (description !== undefined) {
      subSection.description = description;
    }
    if (timeDuration !== undefined) {
      subSection.timeDuration = timeDuration;
    }
    if(req.files && req.files.video !== undefined){
      const video=req.files.video;
      const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME,"video");
      subSection.videoUrl=uploadDetails.secure_url;
      subSection.timeDuration=`${uploadDetails.duration}`
    }
    await subSection.save();
    const updatedSection=await Section.findById(id).populate("subSection").exec();

    return res.status(200).json({
      success: true,
      data:updatedSection,
      message: "Sub Section Updated Successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: true,
      message: "Failed to delete Sub Section",
    });
  }
};
// delete
exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId,id} = req.body;
    if (!sectionId) {
      return res.staus(404).json({
        success: false,
        message: "Failed To delete sub section",
      });
    }
      await  Section.findByIdAndUpdate({_id:id},{
      $pull:{
        subSection:sectionId
      }
    },{new:true})
       await SubSection.findByIdAndDelete(sectionId)
    const updatedSection=await Section.findById(id).populate("subSection").exec();
    return res.status(200).json({
      success: true,
      data:updatedSection,
      message: "Sub Section delete successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Failed t Delete Sub Section",
    });
  }
};
