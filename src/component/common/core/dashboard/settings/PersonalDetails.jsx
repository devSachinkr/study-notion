import React, { useState } from "react";
import { countryNum } from "../../../../../data/countryCode";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  udpateProfieData,
} from "../../../../../services/operations/authApi";
import { updatePassword } from "../../../../../services/operations/authApi";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../../../slices/authSlice";
import { setUser } from "../../../../../slices/profileSlice";
import ConfirmationModal from "../../../ConfirmationModal";
const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    about: "",
    gender: "",
    contactNumber: "",
    dateOfBirth: "",
  });
  const [formPassword, setFormPassword] = useState({
    currentPassword: "",
    changePassword: "",
  });
  const { token } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [SecondShowPassword, setSecondShowPassword] = useState(false);
  const { about, gender, contactNumber, dateOfBirth } = formData;
  const { currentPassword, changePassword } = formPassword;
  const { user } = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setFormPassword((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await udpateProfieData(
      gender,
      dateOfBirth,
      about,
      contactNumber,
      token
    );
    console.log(result)
    //  pending return new instructor
    dispatch(setUser(result));
    setLoading(false);
  };
  const submithandler2 = (event) => {
    event.preventDefault();
    dispatch(updatePassword(currentPassword, changePassword, token));
  };
  const clickHandler = () => {
    alert("i am cancel");
  };
  const deleteHandler = () => {
    dispatch(deleteProfile(token, navigate));
  };
  return (
    <>
      <div className=" mt-5 flex flex-col items-center bg-richblack-800 border-[1px] border-richblack-700 w-[60vw] justify-center rounded-sm text-richblack-300  p-5 ">
        <div className="w-full flex justify-start text-lg text-richblack-50 font-bold mb-2">
          <p>Proflie Information</p>
        </div>
        <form onSubmit={handelSubmit}>
          <div className=" w-[57vw]">
            <div className="flex gap-x-4 w-full  justify-between ">
              <div>
                <label>
                  <p>
                    {" "}
                    About <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-[25vw] p-[12px] border-[1px] border-richblack-600  border-b-[1px] border-b-richblack-400"
                    id="about"
                    type="text"
                    value={formData.about}
                    onChange={changeHandler}
                    placeholder="Enter Bio Details"
                    name="about"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  <p>
                    {" "}
                    Phone Number <sup className="text-pink-200">*</sup>{" "}
                  </p>
                  <div className="flex items-center gap-x-2">
                    <div className="">
                      <select
                        className="w-[77px] bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px]  border-[1px] border-richblack-600  border-b-[1px] border-b-richblack-400 "
                        name="dropdown"
                        id="dropdown"
                      >
                        {countryNum.map((code, idx) => (
                          <option
                            key={idx}
                            className="bg-richblack-800 text-white "
                          >
                            {code.dial_code}
                            {"  "}
                            {code.code} {code.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-[24vw] p-[12px]  border-[1px] border-richblack-600  border-b-[1px] border-b-richblack-400"
                      id="contactNumber"
                      type="text"
                      value={formData.contactNumber}
                      onChange={changeHandler}
                      placeholder="Enter Contact Number"
                      name="contactNumber"
                      required
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="flex gap-x-4 w-full  mt-5">
              <div>
                <label>
                  <p>
                    Date Of Birth <sup className="text-pink-200">*</sup>
                  </p>

                  <input
                    className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-[25vw] p-[12px] border-[1px] border-richblack-600  border-b-[1px] border-b-richblack-400 "
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={changeHandler}
                    name="dateOfBirth"
                    required
                  />
                </label>
              </div>
              <div>
                <fieldset>
                  <leagend>
                    Gender <sup className="text-pink-200">*</sup>
                  </leagend>
                  <div className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-[31vw] p-[12px] border-[1px] border-richblack-600  border-b-[1px] border-b-richblack-400 flex gap-x-5">
                    <div className="flex items-center justify-evenly w-full">
                      <div className=" flex gap-x-1">
                        <input
                          type="radio"
                          id="male"
                          value="male"
                          onChange={changeHandler}
                          name="gender"
                          checked={formData.gender === "male"}
                        />
                        <label htmlFor="male">Male</label>
                      </div>

                      <div className=" flex gap-x-1">
                        <input
                          type="radio"
                          id="female"
                          value="female"
                          onChange={changeHandler}
                          name="gender"
                          checked={formData.gender === "female"}
                        />
                        <label htmlFor="female">Female</label>
                      </div>

                      <div className=" flex gap-x-1">
                        <input
                          type="radio"
                          id="other"
                          value="other"
                          onChange={changeHandler}
                          name="gender"
                          checked={formData.gender === "other"}
                        />
                        <label htmlFor="other">Other</label>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className=" mt-5 flex flex-col items-center bg-richblack-800 border-[1px] border-richblack-700 w-[60vw] justify-center rounded-sm text-richblack-300 p-5 ">
        <div className="w-full flex justify-start text-lg text-richblack-50 font-bold mb-2">
          <p>Change Password</p>
        </div>
        <form>
          <div className="flex  gap-x-5 p-5 ">
            <form onSubmit={submithandler2}>
              <label
                className=" text-richblack-300 w-full text-[0.875rem] leading-[1.99rem] relative"
                htmlFor="password"
              >
                Current Password <sup className=" text-pink-200">*</sup>
                <input
                  className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  border-[1px] border-richblack-600  border-b-[1px] border-b-richblack-400"
                  required
                  id="password"
                  onChange={changeHandler}
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={formPassword.currentPassword}
                />
                <span
                  className="text-richblack-5 absolute right-4 bottom-[-7%] text-[1.5rem] "
                  onClick={() => setShowPassword((perv) => !perv)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </label>

              <label
                className=" text-richblack-300 w-full text-[0.875rem] leading-[1.99rem] relative"
                htmlFor="confirmPassword"
              >
                New Password <sup className=" text-pink-200">*</sup>
                <input
                  className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-[1px] border-richblack-600  border-b-[1px] border-b-richblack-400"
                  required
                  id="confirmPassword"
                  onChange={changeHandler}
                  placeholder="Enter Password"
                  type={SecondShowPassword ? "text" : "password"}
                  name="changePassword"
                  value={formPassword.changePassword}
                />
                <span
                  className="text-richblack-5 absolute right-4 bottom-[-7%] text-[1.5rem] "
                  onClick={() => setSecondShowPassword((perv) => !perv)}
                >
                  {SecondShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </label>
              <div className="flex justify-end mt-5">
                <button
                  className="text-black bg-yellow-50 p-2 px-2 font-bold rounded-md"
                  onClick={submithandler2}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </form>
      </div>

      <div className=" mt-5 flex flex-col items-center bg-red-5 border-[1px] border-richblack-700 w-[60vw] justify-center rounded-sm text-richblack-5 p-5 ">
        <div>
          <div className="flex items-center  gap-x-2" onClick={()=>setConfirmationModal({
                text1:"Delete Account",
                text2:"your account will be deleted permanently !",
                btnText:"Delete",
                btnText2:"Cancel",
                classHeader:"text-white",
                handler1:()=>deleteHandler(),
                handler2:()=>setConfirmationModal(null)
                  
              })}>
            <span className="text-[1.5rem] p-2 border-[1px] border-red-5 aspect-square rounded-full bg-red-50 cursor-pointer">
              <RiDeleteBinLine />
            </span>
            <p className="font-bold">Delete Account</p>
          </div>
          <div className="pl-[51px]">
            <p>Would you like to delete account?</p>
            <p>
              This account contains Paid Courses. Deleting your account will
              remove all the contain associated with it.
            </p>
            <p
              className="mt-2 text-red-50 font-bold cursor-pointer"
              onClick={()=>setConfirmationModal({
                text1:"Delete Account",
                text2:"your account will be deleted permanently !",
                btnText:"Delete",
                btnText2:"Cancel",
                classHeader:"text-white",
                handler1:()=>deleteHandler(),
                handler2:()=>setConfirmationModal(null)

              })}
            >
              {" "}
              <i> I want to delete my account.</i>
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4 w-[60vw] justify-end mt-3 pb-5">
        <button
          className="bg-richblack-800 p-2 text-richblack-5 font-bold border-r-[1px] border-richblack-400 border-b-[1px]  rounded-md "
          onClick={clickHandler}
        >
          Cancel
        </button>
        <button
          className="p-2 bg-yellow-100 text-richblack-900 font-bold rounded-md"
          type="submit"
          onClick={handelSubmit}
        >
          Save
        </button>
      </div>
      <ConfirmationModal data={confirmationModal}/>
    </>
  );
};

export default PersonalDetails;
