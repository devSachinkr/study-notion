import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import Iconbutton from "../../Iconbutton";
import { useForm } from "react-hook-form";
import ReactStars from "react-stars";
import { setLoading } from "../../../../slices/authSlice";
import { craeteRatingAndReviews } from "../../../../services/operations/authApi";
import toast from "react-hot-toast";
const CourseReviewModal = ({ setReviewModal,courseId }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const submit = (e) => {
    craeteRatingAndReview();
  };
  useEffect(() => {
    setValue("review", "");
    setValue("rating", 0);
  }, []);
  
  const craeteRatingAndReview = async () => {
    const {review,rating}=getValues();
  
    const formData=new FormData();
    formData.append("token",token)
    formData.append("review",review)
    formData.append("rating",rating)
    formData.append("courseId",courseId)
    setLoading(true);
    try {
    await craeteRatingAndReviews(formData);
    setReviewModal(false)
      
    } catch (err) {
      console.log(err.message)

    }
    setLoading(false);

    }
  
 
  const ratingChange = (rating) => {
    setValue("rating", rating);
  };
  return (
    <div className="text-white w-[40vw] bg-richblack-800  mx-auto rounded-md">
      <div>
        <div className="flex justify-between bg-richblack-700 p-2 px-5 rounded-md border-b-[1px] border-b-richblack-100 items-center">
          <p>Add Review</p>
          <span onClick={() => setReviewModal(null)} className="cursor-pointer">
            <RxCross2 className="text-[1.2rem]" />
          </span>
        </div>
        <div className="bg-richblack-800">
          <div className="flex gap-x-3  pt-5 justify-center">
            <div className="flex gap-x-3 flex-col">
              <img
                src={user.image}
                alt=""
                width={50}
                height={50}
                className=" aspect-square rounded-full"
              />
            </div>
            <div>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>Posting Publicly</p>
            </div>
          </div>
          <form className="mx-auto w-[38vw]" onSubmit={handleSubmit(submit)}>
            <div className="flex justify-center">
              <ReactStars value={Number(getValues("rating"))}  count={5} size={50} onChange={ratingChange}  />
            </div>
            <div>
              <label>
                <p>
                  Add Your Experience <sup className=" text-pink-300">*</sup>
                </p>
                <textarea
                  name=""
                  id=""
                  cols="15"
                  rows="5"
                  placeholder="Share Details of your own experience for this course"
                  className="w-[38vw] bg-richblack-600 rounded-md p-3 outline-none"
                  {...register("review", { required: true })}
                ></textarea>
                {errors.review && (
                  <span>
                    Review Is required <sup className="text-pink-300">*</sup>
                  </span>
                )}
              </label>
            </div>
            <div className="flex gap-x-2 justify-end items-center mt-3 pr-5">
              <Iconbutton
                btnText={"Cancel"}
                onclick={() => setReviewModal(null)}
                customClasses={
                  " p-1 px-2 bg-richblack-900 border-b-[1px] border-r-[1px] border-richblack-300 text-richblack-5 rounded-md"
                }
                type={"button"}
              />
              <Iconbutton
                btnText={"Submit"}
                disable={true}
                customClasses={
                  "p-1 px-2 text-richblack-900 font-bold rounded-md"
                }
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
