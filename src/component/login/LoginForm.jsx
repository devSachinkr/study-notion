import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../../services/operations/authApi"
const LoginForm = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("Student");
  const {email,password}=formData;
  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(email,password,navigate))
  };
  return (
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

      <div className="flex flex-col relative">
        <label
          className=" text-richblack-5 w-full text-[0.875rem] leading-[1.99rem]"
          htmlFor="email"
        >
          Email Address <sup className=" text-pink-200">*</sup>
        </label>

        <input
          className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
          id="email"
          type="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email Addresss"
          name="email"
          required
        />
        <label
          className=" text-richblack-5 w-full text-[0.875rem] leading-[1.99rem]"
          htmlFor="password"
        >
          Password<sup className="text-pink-200 pl-1">*</sup>
        </label>
        <input
          required
          className=" relative bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
          id="password"
          onChange={changeHandler}
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={formData.password}
          name="password"
        />
        <span
          className="text-richblack-5 absolute right-4 bottom-[122px] text-[1.3rem] "
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
        <Link to="/forgot-password">
          <p className="text-blue-100 text-right leading-[2.5rem]">
            Forget Password ?
          </p>
        </Link>
        <button type="submit" className=" bg-yellow-100 h-[35px] mt-8 rounded-md font-bold">
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
