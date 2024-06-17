import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCoursesDetails,
  getEnrolledCourses,
} from "../../services/operations/authApi";
import ProgressBar from "@ramonak/react-progress-bar";
import Sidebar from "../../component/common/core/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { TbBookOff } from "react-icons/tb";
const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getEnrolledCourse = async () => {
    try {
      setLoading(true);
      const response = await getEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (err) {
      console.log(err.messgage);
    }
    setLoading(false);
  };
  useEffect(() => {
    getEnrolledCourse();
  }, []);
  const viewLecture = (courseId) => {
    navigate(`/view-lecture/${courseId}`);
  };
  if (loading) {
    return <div className="spinner"></div>;
  }
  let totalDuration = 0;
  console.log(enrolledCourses);
  enrolledCourses?.map((course) =>
    course.courseContent?.map((section) =>
      section?.subSection.map(
        (lecture) => (totalDuration = lecture?.timeDuration?.replace(".", ":"))
      )
    )
  );
  return (
    <div className="flex">
      <Sidebar />
      <div className="text-white">
        {!enrolledCourses ? (
          <div className="spinner"></div>
        ) : !enrolledCourses.length ? (
          <div className="text-[2rem] h-[80vh] flex flex-col items-center justify-center w-[80vw]  text-yellow-50">
            You have not enrolled any course yet
            <div><TbBookOff className="text-[4rem]"/></div>
          </div>
        ) : (
          <div className=" flex justify-center w-[90vw] mb-10">
            <div className="w-[85vw]">
              <div className="p-5">
                Home / Dashboard /{" "}
                <span className="text-yellow-50">Enrolled Courses</span>
                <div className="text-[2rem]">Enrolled Courses</div>
              </div>
              <div className="flex bg-richblack-700 p-2 w-[75vw]  rounded-tr-md rounded-tl-md">
                <p className="w-[50vw]">Course Name</p>
                <p>Duration</p>
              </div>
              <div className="w-[75vw] border-[1px] border-richblack-700">
                {enrolledCourses?.map((course, idx) => (
                  <div
                    key={idx}
                    onClick={() => viewLecture(course?._id)}
                    className="cursor-pointer border-b border-richblack-700 "
                  >
                    <div className=" mt-2 p-3 flex text-richblack-200 ">
                      <div className="flex gap-x-5 w-[50vw]">
                        <img
                          width={100}
                          height={100}
                          src={course.thumbnail}
                          alt=""
                          className=" rounded-md"
                        />
                        <div>
                          <p>{course.courseName}</p>
                          <p>{course.courseDescription}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-richblack-200 font-bold flex items-center h-full">
                          {totalDuration}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
