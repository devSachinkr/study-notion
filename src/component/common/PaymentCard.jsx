import React from "react";
import Iconbutton from "./Iconbutton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, resetCart } from "../../slices/cartSlice";
import { FaShareAlt } from "react-icons/fa";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { ROLE } from "../../utils/constants";
const PaymentCard = ({ courseData, clickHandler,btnClasses="" }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const purchaseHandler = () => {
    navigate("/dashboard/enrolled-courses");
  };
  const handleAddToCart = (courseId) => {
    if (user && user.accountType === ROLE.INSTRUCTOR) {
      toast.error("Instructor Can't buy course");
      return;
    } else if (token) {
      dispatch(addToCart(courseId));
    } else {
      toast.error("Login first");
      navigate("/login");
    }
  };

  const handelShare = () => {
    copy(window.location.href);
    toast.success("Link copied");
  };

  return (
    <div >
        <div className="flex flex-col gap-y-3 ">
      <div>
        <img src={courseData.thumbnail} alt="" />
      </div>
      <span className="text-2xl">Rs. {courseData.price} ₹</span>

      <div>
        <Iconbutton
          btnText={`${
            user && courseData?.studentEnrolled.includes(user?._id)
              ? "Go to Courses"
              : "Buy now"
          }`}
          disable={true}
          customClasses={`text-richblack-800 font-bold p-1 px-2 rounded-md ${btnClasses}`}
          onclick={
            user && courseData.studentEnrolled.includes(user._id)
              ? purchaseHandler
              : clickHandler
          }
        />
        {!courseData?.studentEnrolled.includes(user?._id) && (
          <button
            className={`text-richblack-50 mt-3 bg-richblack-800 border-b-[1px] border-richblack-6000 font-bold p-1 px-2 rounded-md ${btnClasses}`}
            onClick={() => handleAddToCart(courseData)}
          >
            Add to Cart
          </button>
        )}
      </div>
      <p className="text-center">30-Day Money-Back Guarantee</p>
      </div>
      <div className="flex  flex-col gap-y-2">
      <p className="text-richblack-100 mt-2">This course includes:</p>
      <p className="text-caribbeangreen-300">8 hours on-demand video</p>
      <p className="text-caribbeangreen-300">Full Lifetime access</p>
      <p className="text-caribbeangreen-300">Access on Mobile and TV</p>
      </div>

      <button
        onClick={handelShare}
        className=" text-yellow-50 font-bold flex gap-x-1 items-center justify-center w-full mt-2"
      >
        Share
        <span>
          <FaShareAlt />
        </span>
      </button>
    </div>
  );
};

export default PaymentCard;
