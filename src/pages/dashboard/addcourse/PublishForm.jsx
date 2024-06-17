import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setCourse, setStep } from "../../../slices/courseSlice";
import { useForm } from "react-hook-form";
import Iconbutton from "../../../component/common/Iconbutton";
import { useState } from "react";
import { updateCourseDeatils } from "../../../services/operations/authApi";
import { COURSE_STATUS } from "../../../utils/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const PublishForm = () => {
    const dispatch=useDispatch();
    const {register,getValues,setValue,handleSubmit}=useForm();
    const {token}=useSelector((state)=>state.auth)
    const {course}=useSelector((state)=>state.course) 
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
      if(course?.status===COURSE_STATUS.PUBLISHED){
        setValue("public",true)
      }
    },[])
    if(loading){
        return(
            <div className="spinner"></div>
        )
    }
    const onSubmit=async()=>{
        if(course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true||(course?.status===COURSE_STATUS.DRAFT && getValues("public")===false)){
          goToCourses();
          return;
        }
        const formData=new FormData();
        formData.append("courseId",course._id)
        formData.append("categoryId",course.category)
        formData.append("token",token)
        const courseStatus=getValues("public")?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT
        formData.append("status",courseStatus)
        setLoading(true);
        const result=await updateCourseDeatils(formData);
        // Update State
        if(result){
             const updateCourseContent={...course,status:result?.updateCourse?.status}
           dispatch(setCourse(updateCourseContent))
           goToCourses()
        }
        toast.success("course  is public ")
        setLoading(false)
    } 
    const goToCourses=()=>{
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }
    return (
        <div className="w-[82vw] mx-auto mt-10  pb-5"> 

        <div className=" flex  flex-col w-[60vw]  justify-center items-center mt-5">
            <div className=" bg-richblack-800 w-[35vw] p-5 rounded-md">

            <div>Publish Course</div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                <div className="flex gap-x-2">
                <input type="checkbox"
                {...register("public")}
                id="public"
                
                 />
                    <label htmlFor="public" className="text-richblack-400"> make this course as public ?</label>
                </div>
                <label ></label>
                 
                 <div className="flex gap-x-2 mt-3 w-full justify-end">
                    <button className="p-1 px-2 font-bold text-richblack-5 bg-transparent rounded-md border-[1px] border-richblack-400" type="button" onClick={()=>dispatch(setStep(2))}>
                        Back
                    </button>
                    <Iconbutton
                    type={"submit"}
                     btnText={"Publish"}
                     disable={true}
                     customClasses={"p-1 px-2 font-bold text-richblack-800 rounded-md"}
                     di
                    />
                 </div>
            </form>
                </div>
            </div>
        </div>
    )
}
export default PublishForm;