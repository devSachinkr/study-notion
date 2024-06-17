import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { signup } from "../../services/operations/authApi";
import { sendOtp } from "../../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../slices/authSlice";
const SignupForm = () => {
    const {signupData}=useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accountType, setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [SecondShowPassword, setSecondShowPassword] = useState(false);
  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const { firstName, lastName, password, confirmPassword, email, } = formData;
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
       sendOtp(email,navigate)
    );
  dispatch(setSignupData({firstName,lastName,confirmPassword,email,password,accountType}))


  };
  return (
    <div>
      {/* tab */}
      <form onSubmit={submitHandler}>
        <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-maxContent w-[210px]">
          <button
            className={`${
              accountType === "Student"
                ? " bg-richblack-900 text-richblack-5 "
                : " bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => {
              setAccountType("Student");
            }}
          >
            Student
          </button>
          <button
            className={`${
              accountType === "Instructor"
                ? " bg-richblack-900 text-richblack-5 "
                : " bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => {
              setAccountType("Instructor");
            }}
          >
            Instructor
          </button>
        </div>

        <div className="flex gap-x-5 ">
          <label
            className=" text-richblack-5 w-full text-[0.875rem] leading-[1.99rem]"
            htmlFor="firstName"
          >
            First Name <sup className=" text-pink-200">*</sup>
            <input
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
              required
              id="firstName"
              type="text"
              onChange={changeHandler}
              name="firstName"
              value={formData.firstName}
              placeholder="Enter First Name"
            />
          </label>

          <label
            className=" text-richblack-5 w-full text-[0.875rem] leading-[1.99rem]"
            htmlFor="lastName"
          >
            Last Name <sup className=" text-pink-200">*</sup>
            <input
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
              required
              id="lastName"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
            />
          </label>
        </div>

        <div className="flex">
          <label
            className=" text-richblack-5 w-full text-[0.875rem] leading-[1.99rem]"
            htmlFor="email"
          >
            Email Address <sup className=" text-pink-200">*</sup>
            <input
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
              required
              id="email"
              onChange={changeHandler}
              placeholder="Enter Email Address"
              type="text"
              name="email"
              value={formData.email}
            />
          </label>
        </div>

        <div className="flex  gap-x-5 ">
          <label
            className=" text-richblack-5 w-full text-[0.875rem] leading-[1.99rem] relative"
            htmlFor="password"
          >
            Create Password <sup className=" text-pink-200">*</sup>
            <input
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
              required
              id="password"
              onChange={changeHandler}
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
            />
            <span
              className="text-richblack-5 absolute right-4 bottom-[18px] text-[1.3rem] "
              onClick={() => setShowPassword((perv) => !perv)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </label>

          <label
            className=" text-richblack-5 w-full text-[0.875rem] leading-[1.99rem] relative"
            htmlFor="confirmPassword"
          >
            Confirm Password <sup className=" text-pink-200">*</sup>
            <input
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
              required
              id="confirmPassword"
              onChange={changeHandler}
              placeholder="Enter Password"
              type={SecondShowPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
            />
            <span
              className="text-richblack-5 absolute right-4 bottom-[19px] text-[1.3rem] "
              onClick={() => setSecondShowPassword((perv) => !perv)}
            >
              {SecondShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </label>
        </div>

        <button className=" bg-yellow-100 h-[35px] mt-8 rounded-md w-full font-inter font-bold">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
