import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../../services/operations/authApi";
import { useDispatch } from "react-redux";
import {TbLogout} from "react-icons/tb"
import { IoMdArrowDropdown } from "react-icons/io";
const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    dispatch(logout(navigate));
  };
  return (
    <div className="flex flex-col">
      <div className="flex  mx-4 gap-1 group relative">
        <IoMdArrowDropdown className=" text-[1.5rem]" />
        <div className="invisible absolute left-[-50%] translate-x-[-50%]  translate-y-[40%] top-0 flex flex-col rounded-md bg-richblack-900 p-4 text-richblack-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[120px] z-10 shadow-lg shadow-blue-100 border-[1px] border-richblack-5 text-[1.1rem]">
          <div className=" absolute  left-[45%] top-1 translate-y-[-50%] translate-x-[100%] h-6 w-5 rotate-45 rounde bg-richblack-900 border-t-[1px] border-l-[1px] border-richblack-5 z-0 "></div>

          <Link className="text-[1.1rem] pb-2  border-b-[1px]   border-richblack-5 border-opacity-10 hover:text-yellow-50" to={"/dashboard/my-profile"}>Dashboard </Link>
          <button className=" text-left text-[1.1rem] pb-2 flex items-center gap-x-2 border-b-[1px]  border-richblack-5 border-opacity-10 hover:text-yellow-50" onClick={clickHandler}> {<TbLogout/>} Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
