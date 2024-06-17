import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { resetPasswordToken } from "../services/operations/authApi";
import {HiOutlineArrowNarrowLeft} from "react-icons/hi"
const ForgetPassword = () => {
    const dispatch=useDispatch();
    const loaction=useLocation();
  const [sendMail, setSendMail] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const sumitHandler=(e)=>{
       e.preventDefault();
      const token= loaction.pathname.split("/").at(-1);
    dispatch(resetPasswordToken(email,setSendMail))
  }
  return (
    <div className="w-11/12 mx-auto max-w-maxContent flex items-center justify-center lg:h-[80vh] ">
      {!loading ? (
        
          <div className="text-white flex flex-col lg:w-[480px] px-[50px]">
            <h1 className="text-2xl font-inter leading-10">{!sendMail ? "Reset Password" : "Check Mail"}</h1>
            <p className="text-[16px] text-richblack-200 pb-5">
              {!sendMail
                ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                : `We have sent the reset email to  ${email}`}
            </p>
            <form onSubmit={sumitHandler}>
              {!sendMail && (
                <label className="flex flex-col">
                  <p className=" leading-8">Email Address
                  <sup className=" px-1 text-pink-200">*</sup>
                  </p>
                  <input
                   className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600 "
                    required
                    type="email"
                    placeholder="Enter Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              )}

              <button className=" mt-8 w-full h-[50px] bg-yellow-50 rounded-lg text-richblack-800 font-bold" type="sumbit">
              {
                !sendMail ? "Reset Password" : "Resend Mail"
              }
                 </button>
            </form>
            <div className="mt-5">
                <Link to={"/login"}>
                <div className="flex items-center gap-2">
                           <HiOutlineArrowNarrowLeft/>
                            Back to login
                </div>
                </Link>
            </div>
          </div>

      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
};

export default ForgetPassword;
