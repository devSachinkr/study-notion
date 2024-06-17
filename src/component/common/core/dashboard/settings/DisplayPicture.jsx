import React from "react";
import { useSelector } from "react-redux";
import Iconbutton from "../../../Iconbutton";
import { useNavigate } from "react-router-dom";
import PersonalDetails from "./PersonalDetails";
import { IoIosArrowBack } from "react-icons/io";
const DisplayPicture = () => {
  const { user } = useSelector((state) => state.profile);
  const  navigate  = useNavigate(); 
  const clickHandler=()=>{
     navigate("/dashboard/my-profile")
  }
  return (
    <div>
      <div className=" w-[80vw] flex flex-col items-center h-full">
        <button onClick={clickHandler} className="w-[75vw] flex justify-start  text-white items-center mt-5">
          {" "}
          <span>
            <IoIosArrowBack />
          </span>
          Back
        </button>
        <div className="w-[75vw] flex justify-start ">
          {" "}
          <h1 className="text-richblack-5  text-[1.5rem]">Edit Profile</h1>
        </div>
        <div className=" flex items-center bg-richblack-800 border-[1px] border-richblack-700 w-[60vw] justify-between rounded-sm mt-5">
          <div className="flex pl-10 h-[90px] items-center">
            <img
              src={user?.image}
              alt="profile dp"
              className="aspect-square w-[60px] h-[60px] rounded-full object-cover"
            />
            <div className="ml-5">
              <p className="capitalize text-richblack-50 font-bold text-[1.3rem]">
                Change Profile Picture
              </p>
              <div className="flex gap-x-3 mt-2">
                <Iconbutton
                  disable={true}
                  btnText="Update"
                  customClasses={
                    "text-richblack-800 px-3 py-1 rounded-sm font-bold rounded-xl "
                  }
                  onclick={() => {
                    navigate("/dashboard/settings");
                  }}
                />
                <Iconbutton
                  btnText="Remove"
                  customClasses={
                    "text-richblack-5 px-3 py-1 rounded-sm font-bold border-[1px] border-richblack-700 rounded-xl bg-transparent "
                  }
                  onclick={() => {
                    navigate("/dashboard/settings");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <PersonalDetails />
      </div>
    </div>
  );
};

export default DisplayPicture;
