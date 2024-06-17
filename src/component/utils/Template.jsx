import React from "react";
import HighlightText from "../home/HighlightText.jsx";
import SignupForm from "../../component/signup/SignupForm.jsx";
import LoginForm from "../../component/login/LoginForm.jsx";
import FrameImage from "../../assets/frame.png";
import { useSelector } from "react-redux";
function Template({ title, desc1, desc2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div>
      {loading ? (
        <div className="flex w-[100vw] h-[90vh] items-center justify-center">
         
          <div className="spinner"></div>
        </div>
      ) : (
        <div className=" w-11/12 mx-auto max-w-maxContent flex py-12 gap-x-12 gap-y-0 h-[600px] items-center">
          <div className="flex flex-col w-11/12 items-center">
            <div className="w-[350px] ">
              <h1 className="text-3xl text-richblack-5 font-semibold leading-[2.375rem] w-[500px] ">
                {title}
              </h1>
              <p className="text-richblack-100 leading-[1.625rem] mt-4">
                {desc1}
              </p>
              <p className="italic">
                <HighlightText text={desc2} />
              </p>
              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
          </div>

          <div className="relative w-11/12 flex items-center justify-center">
            <img
              className=" "
              src={FrameImage}
              alt="Frame img"
              width={400}
              height={400}
              loading="lazy"
            />
            <img
              className=" absolute left-[86px] top-[-16px]"
              src={image}
              alt="Frame img"
              width={400}
              height={400}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
