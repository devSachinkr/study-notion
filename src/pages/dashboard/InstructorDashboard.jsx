import React, { useEffect, useState } from "react";
import Sidebar from "../../component/common/core/dashboard/Sidebar";
import {
  getInstructorCourses,
  getUserDetails,
  instructorDashBoardData,
} from "../../services/operations/authApi";
import { useSelector } from "react-redux";
import Handpng from "../../../src/assets/Handpng.png";
import Iconbutton from "../../component/common/Iconbutton";
import { useNavigate } from "react-router-dom";
import InstructorAnalytics from "../../component/common/core/dashboard/InstructorAnalytics";
const InstructorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [courseData, setCourseData] = useState(null);
  const [courses, setCourses] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await instructorDashBoardData(token);
        const courseResult = await getInstructorCourses(token);
        if (result.success || courseResult) {
          setCourseData(result?.courses);
          setCourses(courseResult?.allCourses);
        }
      } catch (err) {
        console.log(err.messgae);
      }
      setLoading(false);
    })();
  }, []);

  const totalAmount = courseData?.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );
  let totalStudentEnrolled = courseData?.reduce(
    (acc, curr) => acc + curr.totalStudentEnrolled,
    0
  );

  if (loading) {
    return <div className="spinner"></div>;
  }
  return (
    <div className="flex text-white">
      <div>
        <Sidebar />
      </div>
      <div className="w-full p-5">
        <div className="flex items-center gap-x-2">
          <h1 className="text-[1.5rem]">Hi {user?.firstName} </h1>
          <img src={Handpng} alt="logo" width={40} height={40} />{" "}
        </div>
        <p className="text-richblack-600">Let's start something new</p>

        <div>
          <div>
            <InstructorAnalytics courseData={courseData} />
          </div>

          <div>
            <p>Statistics</p>
            <div>
              <p>Total Courses</p>
              <p>{courses?.length}</p>
            </div>
            <div>
              <p>Total Students</p>
              <p>{totalStudentEnrolled}</p>
            </div>
            <div>
              <p>Total Income</p>
              <p>₹ {totalAmount}</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <p>Your Courses</p>
              <Iconbutton
                btnText={"View All"}
                onclick={() => navigate("/dashboard/my-courses")}
                customClasses={"font-bold text-yellow-50 text-[1.2rem]"}
              />
            </div>
            {courses?.length !== 0 ? (
              <div className="flex justify-evenly">
                {courses?.slice(0, 3)?.map((course) => (
                  <div key={course._id}>
                    <img
                      className="h-[28vh] w-[25vw]"
                      src={course?.thumbnail}
                      alt=""
                    />
                    <div>
                      <p>{course?.courseName}</p>
                      <div>
                        <p>{course?.studentEnrolled?.length} Students</p>
                        <p> | </p>
                        <p>Rs {course?.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div> You have not created any course yet </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
