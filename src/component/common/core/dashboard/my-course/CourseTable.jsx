import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatedDate, formattedDate } from "../../../../../utils/dateFormatter";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import Iconbutton from "../../../Iconbutton";
import { MdDeleteSweep } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ConfirmationModal from "../../../ConfirmationModal";
import { deleteInstructorCourse } from "../../../../../services/operations/authApi";
import toast from "react-hot-toast";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import EditCourse from "../../../EditCourse";
import { useNavigate } from "react-router-dom";
const CourseTable = ({ course, setCourses, getCourses }) => {
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const courseDelete = async (courseId) => {
    setLoading(true);
    const result = await deleteInstructorCourse(token, courseId);
    if (result) {
      getCourses();
      setCourses(result?.data);
      toast.success("Course deleted");
    } else {
      toast.error("Failed to delete course");
    }
    setLoading(false);
    console.log(result?.data);
  };
  const editCourses = (courseId) => {
    navigate(`/dashboard/editCourse/${courseId}`);
  };
  return (
    <div className="text-richblack-5 mb-3">
      {
        <div key={course._id} className="flex p-2 justify-evenly gap-x-3 pt-3">
          <div className=" flex gap-x-4 w-[59vw] ">
            <img
              src={course?.thumbnail}
              alt="Course Logo"
              className=" h-[150px] w-[250px] rounded-lg border-[1px] border-yellow-50"
            />

            <div className="flex flex-col">
              <p className="pb-2">{course?.courseName}</p>
              <p className="pb-2">{course?.courseDescription}</p>
              <p className="pb-2">Created : {formatedDate(course.createdAt)} </p>
              <div className="flex gap-x-2 items-center justify-center bg-richblack-700 py-1 w-[115px] rounded-2xl">
                <span>
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <FaRegNoteSticky className="text-red-25"  />
                  ) : (
                    <FaCircleCheck className="text-yellow-50" />
                  )}
                </span>
                <span className={`${course?.status===COURSE_STATUS.PUBLISHED ? "text-yellow-50":"text-red-25"}`}>{course?.status}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center ">2 hr 30 mins</div>
          <div className="flex items-center">₹ {course?.price}</div>
          <div className="flex items-center gap-x-2 ml-3">
            <button disable={loading} onClick={() => editCourses(course._id)}>
              <FaEdit className="text-[1.5rem]" />
            </button>

            <button
              disabled={loading}
              onClick={() =>
                setConfirmationModal({
                  text1: "Do you want to delete this course ",
                  text2: "All the data of this is course will be deleted",
                  btnText: "Delete",
                  btnText2: "Cancel",
                  handler1: !loading ? () => courseDelete(course._id) : "",
                  handler2: () => (!loading ? setConfirmationModal(null) : ""),
                  position: "flex w-fit mx-auto justify-center items-center",
                })
              }
            >
              <span>
                <MdDeleteSweep className="text-[1.5rem]" />
              </span>
            </button>
          </div>
        </div>
      }
      {<ConfirmationModal data={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
