import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { resetPassword } from "../services/operations/authApi";
import { Link, useLocation } from "react-router-dom";
import {HiOutlineArrowNarrowLeft} from "react-icons/hi"

const UpdatePassword = () => {
  const loaction = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (e) => {
    setFormData((perv) => ({
      ...perv,
      [e.target.name]: e.target.value,
    }));
  };
  const { password, confirmPassword } = formData;
  const submitHandler = (e) => {
    e.preventDefault();
    const token = loaction.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="w-11/12 mx-auto max-w-maxContent flex items-center text-white lg:h-[80vh]">
      {loading ? (
        <div className="w-[100vw] h-[80vh] flex">
        <div className="spinner mx-auto my-auto"></div>
        </div>
      ) : (
        <div className="flex flex-col  mx-auto my-auto w-[350px] gap-y-3">
          <h1 className="text-2xl gap-y-2">Create New Passwsord</h1>
          <p className="text-richblack-200">
            Almost done. Enter your new password and youre all set.
          </p>
          <form className="relative" onSubmit={submitHandler}>
            <label>
              <p className="text-[14px] text-richblack-200 my-1">
                New Password <sup className="text-pink-200 ">*</sup>
              </p>
              <input
                type={`${showPassword ? "text" : "password"}`}
                className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600 "
                name="password"
                value={formData.password}
                placeholder="Enter new Password"
                required
                onChange={changeHandler}
              />
              <span
                className=" cursor-pointer absolute right-[20px] top-[42px] text-[1.3rem]"
                onClick={() => setShowPassword((perv) => !perv)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </label>
            <label>
              <p className="text-[14px] text-richblack-200 my-1">
                Confirm new Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                type={`${showConfirmPassword ? "text" : "password"}`}
                className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Enter Confirm Password"
                required
                onChange={changeHandler}
              />
              <span
                className=" cursor-pointer absolute right-[20px] text-[1.3rem] bottom-[105px] "
                onClick={() => setShowConfirmPassword((perv) => !perv)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </label>

            <button className="w-full h-[50px] rounded-lg bg-yellow-50 text-richblack-900 font-bold mt-10" type="submit">Reset Password</button>
          </form>
          <div className="mt-4">
          <div className="flex items-center gap-2">
          <HiOutlineArrowNarrowLeft className="text-[20px]"/>
          <Link to={"/login"}>Back to login</Link>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
