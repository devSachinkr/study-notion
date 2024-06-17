import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../component/common/Iconbutton";
import RequirementField from "../../../component/common/core/dashboard/course/RequirementField";
import { createNewCourse, showAllCategorie, updateCourseDeatils, updateCourseThumbnail } from "../../../services/operations/authApi";
import { setCourse, setEditCourse, setStep } from "../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../utils/constants";
const CourseForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const getCategories = async () => {
    setLoading(true);
    const categories = await showAllCategorie();

    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCategories();

    if (editCourse) {
      console.log("thumbnail : ",course.whatYouWillLearn)
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("whatYouWillLearn", course.whatYouWillLearn);
      setValue("price", course.price);
      setValue("thumbnailImage", course.thumbnail);
      setValue("tag", course.tag);
      setValue("instruction", course.instruction);
      setValue("category", course.category);
    }
  }, []);
const isFormUpdated=()=>{
  const currentValues=getValues();
  if(
    currentValues.courseName !== course.courseName||
    currentValues.courseDescription !== course.courseDescription||
    currentValues.categories !== course.categories||
    currentValues.instruction.toString() !== course.instruction.toString()||
    currentValues.whatYouWillLearn !== course.whatYouWillLearn||
    currentValues.price !== course.price||
    // currentValues.tag !== course.tag||
    currentValues.thumbnailImage!==course.thumbnail[0]
    )
  return true;
  else  return false;
};
  const  onSubmit =async  (data) => {
   
     if(editCourse){
     
     if(isFormUpdated()){
      const currentValue=getValues();
      const formData= new FormData();
      formData.append("courseId",course._id);
      formData.append("token",token);
      formData.append("categoryId",course.category?._id)
      if(currentValue.courseName !== course.courseName){
        formData.append("courseName",data.courseName);
      }
      if(currentValue.courseDescription !== course.courseDescription){
        formData.append("courseDescription",data.courseDescription);
      }
      if(currentValue.whatYouWillLearn !== course.whatYouWillLearn){
        formData.append("whatYouWillLearn",data.whatYouWillLearn);
      }
      if(currentValue.price !== course.price){
        formData.append("price",data.price);
      }
      if(currentValue.thumbnailImage!== course.thumbnail){
        console.log(data?.thumbnailImage[0])
        formData.append("thumbnailImage",data.thumbnailImage[0])
        console.log("token : ",token)
       const updateThumbnail=async()=>{
          const result=await updateCourseThumbnail(formData);
          console.log("thumbnail : ",result)
       }
       updateThumbnail();
      }
      if(currentValue.tag !== course.tag){
        formData.append("tag",data.tag);
      }
      if(currentValue.instruction.toString()!== course.instruction.toString()){
        formData.append("instruction", JSON.stringify(data.instruction));
      }
      if(currentValue.category !== course.category){
        formData.append("category",data.category);
      }
      setLoading(true);
     
        const result=await updateCourseDeatils(formData)
        console.log(result)
        if(result){
       setStep(2)
       dispatch(setCourse(result?.courseDetails))
       toast.success("Course updated successfully")
       dispatch(setEditCourse(false))
        }

  
      setLoading(false)
     }else{
      toast.error("No changes made to the form")
     }
     return;

  }  
  const currentValue=getValues();
  // currentValue.thumbnailImage=currentValue.thumbnailImage[0]
  // console.log(currentValue)
       const formData=new FormData();
      formData.append("courseName",data.courseName)
      formData.append("courseDescription",data.courseDescription)
      formData.append("whatYouWillLearn",data.whatYouWillLearn)
      formData.append("price",data.price)
      formData.append("thumbnailImage",data.thumbnailImage[0])
      // formData.append("tag",data.tag)
      formData.append("instruction", JSON.stringify(data.instruction))
      formData.append("category",data.category)
      formData.append("status",COURSE_STATUS.DRAFT)
      formData.append("token",token)
      setLoading(true);
      const result =await createNewCourse(formData);
      if(result){
        dispatch(setStep(2))
        dispatch(setCourse(result?.data))
      }else{
        toast.error("Failed to Create Course")
      }
      setLoading(false);
      };
  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="w-[80vw] flex justify-center items-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-md border-[1px] border-richblack-800 p-6 space-y-8 w-[60vw]"
      >
      <input type="file"  {...register("thumbnailImage",{required:true})} />
        {/*  Name  */}
        <div>
          <label>
            <p>
              Course Title <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              id="courseName"
              placeholder="Enter Course Title"
              {...register("courseName", { required: true })}
              className="  bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600 "
            />
            {errors.courseName && <span> Course Title is required</span>}
          </label>
        </div>
        {/* Description */}
        <div>
          <label>
            <p>
              Course Description <sup className="text-pink-200">*</sup>
            </p>
            <textarea
              name="courseDescription"
              id="courseDescription"
              cols="15"
              rows="5"
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
              {...register("courseDescription", { required: true })}
              placeholder="Enter Course Description"
            ></textarea>
          </label>
          {errors.courseDescription && (
            <span>Course Description is required</span>
          )}
        </div>
        {/* Price */}
        <div className="relative">
          <label>
            <p>
              Price <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              id="price"
              placeholder="Enter price"
              {...register("price", {
                required: true,
                // valueAsNumber:true
              })}
              className="  bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600 pl-[45px]"
            />
            <HiOutlineCurrencyRupee className=" absolute top-[50%] left-3 text-[1.4rem] text-richblack-300" />
            {errors.price && <span> Price is required</span>}
          </label>
        </div>
        {/* Category */}
        <div>
          <label>
            Course Category <sup className=" text-pink-200">*</sup>
            <select
              name=""
              id="category"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
              {...register("category", { required: true })}
            >
               <option value="" disabled> Choose a Category</option>
              {courseCategories.map((item) => (
                <option  id={item?.id} key={item?.id} value={item?._id}>
                  {item?.name}
                </option>
              ))}
              
            </select>
          </label>
          {errors.category && <span> Category is required </span>}
        </div>
        {/* Tags */}
        <div>
          {/* <Tags
        label="Tags"
        name="tag"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
       /> */}
        </div>
        {/* thumbnailImage */}
        <div>
          {/* <Upload
          name="thumbnailImage"
          label="Course thumbnailImage"
          register={register}
          setValue={setValue}
          getValues={getValues}
        /> */}
        </div>
        {/* Benefit */}
        <div>
          <div>
            <label>
              <p>
                {" "}
                Benefits of Course <sup className="text-pink-200">*</sup>
              </p>
              <textarea
                name="whatYouWillLearn"
                id="whatYouWillLearn"
                cols="15"
                rows="5"
                className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                {...register("whatYouWillLearn", { required: true })}
                placeholder="Enter Benefits of Course "
              ></textarea>
            </label>
            {errors.whatYouWillLearn && (
              <span>Course Benefits is required</span>
            )}
          </div>
        </div>
        {/* Istruction */}
        <div>
          <RequirementField
            name="instruction"
            label="Requirements / Instruction"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
        <div>
          {editCourse && (
            <div>
            <button
              type="button"
              className="p-2 text-richblack-5 bg-richblack-700 font-bold"
              onClick={()=>dispatch(setStep(2))}
            >
              Continue Without Saving
            </button>
            </div>
          )}
             <IconButton
               btnText={!editCourse ? "Next":"Save Changes"}
               customClasses={"text-richblack-800 font-bold p-2"}
               disable={true}

             />
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
