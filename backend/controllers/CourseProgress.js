const CourseProgress = require("../models/CourseProgress");
const SubSection=require("../models/SubSection")
const Course=require("../models/Course")
exports.updateCourseProgress=async(req,res)=>{
    try{
    const userId=req.user.id;
    const {courseId,subSectionId}=req.body;
   
    //  validation 
    if(!courseId||!subSectionId){
        return res.status(404).json({
            success:false,
            message:"Failed to fetch details "
        })
    }
    const checkValidSubSection=await SubSection.findOne({_id:subSectionId})
    if(!checkValidSubSection){
       return res.status(404).json({
            success:false,
            message:"SubSection not found"
        })
    }
//     check old entry 
        let courseProgress=await CourseProgress.findOne({
            courseID:courseId,
            userId,
        });
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress dose not exist"
            })
        }
    //  check for already exist subSection id
         if(courseProgress.completedVideo.includes(subSectionId)){
            return res.status(400).json({
                success:false,
                message:"already marked"
            })
         }

            courseProgress.completedVideo.push(subSectionId)
           const updatedData= await courseProgress.save();

            return res.status(200).json({
                success:true,
                message:"Your course Progress",
                data:updatedData
              })
    }catch(err){
        console.error("course progress error : ",err);
        return res.status(500).json({
          success: false,
          message: "Failed To track course progress",
        });
    }
}