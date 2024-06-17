import react from "react";
import { useForm } from "react-hook-form";
import Iconbutton from "../../../component/common/Iconbutton";
import { setStep } from "../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import { createSection } from "../../../services/operations/authApi";
import { setCourseSectionData } from "../../../slices/viewCourseSlice";
import {IoMdAddCircleOutline } from "react-icons/io";
import { updateSection } from "../../../services/operations/authApi";
import { setCourse } from "../../../slices/courseSlice";
import ViewSection from "../../../component/common/core/dashboard/addCourse/ViewSection";
import toast from "react-hot-toast";
const CourseBuilder = () => {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [editSection,setEditSection]=useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    formState: { errors },
  } = useForm();
  if (loading) {
    return <div className="spinner"></div>;
  }
  const onSubmit = async (data) => {
    if(editSection){
      setLoading(true)
      const res =await updateSection({
        name:data.name,
        sectionId:editSection,
        courseId:course._id,
        token
      })
      if(res){
        dispatch(setCourse(res?.data))
      }
      setEditSection(false)
     setLoading(false)
    }else{
        const formData = new FormData();
        formData.append("courseId", course._id);
        formData.append("name", data.name);
        formData.append("token", token);
        setLoading(true);
        const result = await createSection(formData);
        if (result) {
            dispatch(setCourse(result?.updatedCourse))
            setEditSection(false)
            setValue("name","")
            //   dispatch(setStep(3))
        }
        setLoading(false);
    }
   
  };
  const goBack = () => {
    dispatch(setStep(1));
  };
  const cancelEdit =()=>{
    setEditSection(false)
    setValue("name","")
  }
  const nexthandler=()=>{
    if(course.courseContent.length===0){
        toast.error("Add at least one section")
        return
    }
    if(course.courseContent.some((section)=>section.subSection.length===0)){
        toast.error("Add at least one Lecture")
        return
    }
    
    dispatch(setStep(3))
  }
  const handleChangeEditName=(sectionId,sectionName)=>{
    if(editSection === sectionId){
        cancelEdit()
    }
    setEditSection(sectionId);
    setValue("name",sectionName)
  }
  return (
    <div className="w-[65vw] flex justify-center items-center mt-10">
      <div className="w-[45vw]  bg-richblack-800 p-3   rounded-md">
        <div className="font-bold text-[1.4rem]">Course Builder</div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <p>
                Section Name <sup className=" text-pink-200">*</sup>
              </p>
              <input
                type="text"
                className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                placeholder="Enter Section Name"
                {...register("name", { required: true })}
              />
            </label>
            {errors.name && <span>Section Name is Required</span>}
            <div className="flex items-center gap-x-3">
            <div className="flex rounded-md border-[1px] border-yellow-50 w-fit items-center gap-x-2 p-1 px-2 mt-2"   >

              <button
                type="submit"
                className="text-yellow-50 font-bold  "
              >
                 {editSection?"Edit Section":"Create Section"}
              </button>
              <IoMdAddCircleOutline className="text-yellow-50 font-bold text-[1.3rem] cursor-pointer" />
            </div>
              {
                editSection?(
                    <div onClick={cancelEdit}>
                        <button type="button " className="text-richblack-200 text-lg">
                            cancel edit
                        </button>
                    </div>
                ):("")
              }
</div>
         
          </form>
        </div>
        <div>
      {
        course.courseContent.length>0 &&(
            <ViewSection handleChangeEditName={handleChangeEditName} setEditSection={setEditSection} IoMdAddCircleOutline={IoMdAddCircleOutline}/>
        )
      }
        </div>
        <div className="flex w-full justify-end gap-x-3 mt-3 " >
              <button
                type="button"
                onClick={goBack}
                className="p-1 px-2 border-[1px] border-richblach-300 bg-transparent font-bold rounded-md "
              >
                Back
              </button>
              <div
                className="flex bg-yellow-50 items-center relative  pr-2 rounded-md "
                onClick={nexthandler}
              >
                <Iconbutton
                  btnText={"Next"}
                  disable={true}
                  customClasses={"p-2 font-bold text-richblack-800 "}
               
                />
                <FaAngleRight className="text-[1.3rem] font-bold text-richblue-700 absolute left-[70%] cursor-pointer" />
              </div>
            </div> 
      </div>
     
    </div>
  );
};
export default CourseBuilder;
