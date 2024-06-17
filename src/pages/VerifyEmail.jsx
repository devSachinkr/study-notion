import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { sendOtp, signup } from "../services/operations/authApi";
import {PiClockCounterClockwiseFill} from "react-icons/pi"
function VerifyEmail() {
  // useEffect(()=>{
  //     if(!signupData){
  //         navigate("/signup")
  //     }
  // },[])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      password,
      confirmPassword,
      accountType,
      email,
    } = signupData;
    console.log(password, " ", confirmPassword);
    dispatch(
      signup(
        firstName,
        lastName,
        password,
        confirmPassword,
        accountType,
        otp,
        email,
        navigate
      )
    );
  };

  return (
    <div className="text-white flex flex-col items-center w-11/12 mx-auto  max-w-maxContent">
      {loading ? (
        <div className="flex w-[100vw] h-[80vh]">
          <div className="spinner mx-auto my-auto"></div>
        </div>
      ) : (
        <div className=" flex flex-col  h-[80vh] justify-center w-[350px]">
          <h1 className="text-2xl mb-3 font-bold">Verify email</h1>
          <p className="mb-5 text-richblack-200">A verification code has been sent to you. Enter the code below</p>
          <form className="mb-5" onSubmit={submitHandler}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className=" mx-2 h-[40px] text-center text-[1.2rem] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                  style={{width:45}}
                />
              )}
            />
            <button className="mt-5 w-full text-richblack-800 bg-yellow-50 h-[50px] rounded-lg font-bold" type="submit">Verify and register</button>
          </form>
          <div className="mt-3 flex items-center justify-between">
            <Link to={"/login"}>
              <div className="flex items-center gap-2">
                <HiOutlineArrowNarrowLeft />
                Back to login
              </div>
            </Link>
            <button
              onClick={() => {
                dispatch(sendOtp(signupData.email, navigate));
              }}
              className="text-blue-100 flex items-center gap-x-1"
            >
            <PiClockCounterClockwiseFill className="text-[1.2rem] rotate-10"/>
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
