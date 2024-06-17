import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { endpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiConnect";
import toast from "react-hot-toast";
import { countryNum } from "../../data/countryCode";
const CommonForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        message: "",
        dropdown: "+91",
      });
    }
  }, [isSubmitSuccessful, reset]);
  const submitForm = async (data) => {
    console.log(data)
    try {
      setLoading(true);
      const res = await apiConnector("POST", endpoints.FORM_API, data);
      console.log("Form res : ", res);
      if (!res.data.success) {
        throw new Error("Failed To Submit Form");
      }
      toast.success("Form Submitted successfully");
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to Submit form");
    }
    setLoading(false)
  };
  return (
    <div className="mt-10">
      {!loading ? (
        <div className="w-full flex flex-col items-center">
          <form
            className="flex flex-col gap-y-2"
            onSubmit={handleSubmit(submitForm)}
          >
            {/* first name $ last name */}
            <div className="flex gap-x-4">
              <label>
              <p className="mb-1">
                First Name
                <sup  className=" text-pink-200 px-1">*</sup>
              </p>
                <input
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                  type="text"
                  name="firstName"
                  id="firstName"
                  {...register("firstName", { required: true })}
                  placeholder="Enter First Name"
                />
              </label>
              <label>
              <p className="mb-1">
                Last Name
                <sup className=" text-pink-200 px-1">*</sup>
              </p>
                <input
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"

                  type="text"
                  name="lastName"
                  id="lastName"
                  {...register("lastName", { required: true })}
                  placeholder="Enter Last Name"
                />
              </label>
            </div>
            {/* Email*/}
            <label>
            <p className="mb-1">
               Email Address
                <sup className=" text-pink-200 px-1">*</sup>
              </p>
              <input
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"

                type="email"
                name="email"
                id="email"
                {...register("email", { required: true })}
                placeholder="Enter email"
              />
            </label>
            {/* Phone Number */}
            <div>
              <label>
              <p className="mb-1">
                Phone Number
                <sup className=" text-pink-200 px-1">*</sup>

              </p>
                <div className="flex gap-x-3  text-black">
                  <div className="">
                    <select
                 className="w-[77px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[1px] border-richblack-600 "

                      name="dropdown"
                      id="dropdown"
                      {...register("countryCode", { required: true })}
                    >
                      {countryNum.map((code, idx) => (
                        <option key={idx} className="bg-richblack-800 text-white ">
                          {code.dial_code}
                          {"  "}
                          {code.code} {code.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"

                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: {
                        value: true,
                        message: "Please Enter Phone Number",
                      },
                      maxLength: { value: 10, message: "Invalid Phone Number" },
                      minLength: { value: 8, message: "Invalid Phone Number" },
                    })}
                    placeholder="Enter Phone Number"
                  />
          
                </div>
              </label>
            </div>

            {/* message */}
            <label>
              <p className="mb-1">Message
              <sup className=" text-pink-200 px-1">*</sup>

              </p>
              <textarea
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"

                name="message"
                cols="30"
                rows="5"
                maxLength={1000}
                minLength={10}
                id="message"
                placeholder="Your Premium Message"
                {...register("message", { required: true })}
              ></textarea>
            </label>

            <button  className=" bg-yellow-100 h-[35px] mt-8 rounded-md w-full font-inter font-bold text-black" type="submit">
              Send Message
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default CommonForm;
