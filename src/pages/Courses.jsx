import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentsFetureApi";
import {
  getCoursesDetailWithoutLogin,
  getCoursesDetails,
} from "../services/operations/authApi";
import { useState } from "react";
import GetAvgRating from "../utils/avgRating";
import toast from "react-hot-toast";
import RatingStars from "../component/common/RatingStars";
import { formatedDate } from "../utils/dateFormatter";
import PaymentCard from "../component/common/PaymentCard";
import { LuDot } from "react-icons/lu";
import { FaVideo } from "react-icons/fa";
import RatingReviewSlider from "../component/rating_review/RatingReviewSlider";
import Footer from "../component/footer/Footer";
const Courses = () => {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avgReviewCou, setavgReviewCount] = useState(0);
  const [totalSection, setTotalSection] = useState(0);
  const [totalLecture, setTotalLecture] = useState(0);
  const [isActive, setIsActive] = useState([]);

  const handelActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };
  const clickHandler = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
    } else {
      toast.error("Login first");
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    courseDetails();
  }, [courseId]);
  async function courseDetails() {
    setLoading(true);
    try {
      setLoading(true);
      const result = await getCoursesDetailWithoutLogin(courseId);
      setCourseData(result.courseDetails);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  }
  useEffect(() => {
    const count = GetAvgRating(courseData?.ratingAndReviews);
    setavgReviewCount(count);
  }, [courseData]);
  useEffect(() => {
    const numberOfSection = courseData?.courseContent?.length;
    setTotalSection(numberOfSection);
  }, [courseData]);
  useEffect(() => {
    let count = 0;
    courseData?.courseContent?.forEach(
      (lecture) => (count += lecture?.subSection?.length || 0)
    );
    setTotalLecture(count);
  }, [courseData]);

  if (loading) {
    return <div className="spinner"></div>;
  }
  return (
    <>
      {courseData && (
        <div className=" text-richblack-5 bg-richblack-900 h-fit pb-10  flex flex-col gap-y-3">
          <div className="flex gap-x-2 px-20 py-10 bg-richblack-800">
            <div className="md:w-[60%] flex flex-col gap-y-5">
              <p>
                Home / Learning /{" "}
                <span className=" text-yellow-50">{courseData.courseName}</span>
              </p>

              <p className="text-4xl">{courseData.courseDescription}</p>

              <div className="flex gap-x-2 items-center">
                <span>{avgReviewCou}</span>

                <RatingStars Review_count={avgReviewCou} Star_Size={24} />
                <span>{`${courseData.ratingAndReviews.length} reviews`}</span>
                <span>{`{${courseData.studentEnrolled.length}} students enrolled`}</span>
              </div>

              <div>
                <p>
                  Created By {courseData?.instructor?.firstName}{" "}
                  {courseData?.instructor?.lastName}
                </p>
              </div>

              <div className="flex gap-x-2">
                <p>Created At {formatedDate(courseData?.createdAt)}</p>
                <p>English</p>
              </div>
            </div>
            <div className="md:w-[38%] flex justify-center">
              <div className=" p-5 w-[20vw] rounded-md overflow-hidden bg-caribbeangreen-700 bg-opacity-[0.3] ">
                <PaymentCard
                  courseData={courseData}
                  clickHandler={clickHandler}
                  btnClasses="w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="px-20 py-10 border-[1px] border-richblack-700 w-[80%] mx-auto h-full ">
              <p className="text-4xl">What you'll learn</p>
              <p className="text-wrap mt-2">{courseData.whatYouWillLearn}</p>
            </div>
          </div>
          <div className="mt-7 ">
            <div className="w-[80%] mx-auto ">
              <div className="text-4xl  flex flex-col justify-between">
                Course Content
                <div className="flex items-center mt-2 text-yellow-50">
                  <span className="text-sm">{totalSection} Sections</span>{" "}
                  <span>
                    <LuDot />
                  </span>
                  <span className="text-sm">{totalLecture} Lectures</span>{" "}
                </div>
              </div>
              <div className="">
                <div>
                  {courseData.courseContent.map((section, idx) => (
                    <div>
                      <details
                        open={idx === 0 ? true : false}
                        key={idx}
                        className=" cursor-pointer w-full bg-caribbeangreen-300 bg-opacity-[0.5]  mt-2 p-2"
                      >
                        <summary className="pl-10">{section.name}</summary>
                        <p className=" bg-caribbeangreen-800 pl-16 w-full p-5 rounded-md">
                          {section.subSection.map((lecture, idx) => (
                            <div key={idx}>
                              <p className="flex items-center gap-x-2">
                                {" "}
                                <span>
                                  <FaVideo />
                                </span>{" "}
                                {lecture.description}{" "}
                                <span>
                                  {lecture.timeDuration?.replace(".", " : ")}
                                </span>
                              </p>
                            </div>
                          ))}
                        </p>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="w-[80%] mx-auto flex flex-col gap-y-2 mt-6">

            <p className="text-4xl">Author</p>
            <div className="flex items-center gap-x-2">
              <img
                src={courseData?.instructor?.image}
                alt="Instructor img"
                width={50}
                height={50}
                className=" rounded-full aspect-square "
                />
              <p>
                {courseData?.instructor?.firstName}{" "}
                {courseData?.instructor?.lastName}
              </p>
            </div>
            <div className="mt-3">{courseData.courseDescription}</div>
                </div>
          </div>
          <div className="mt-[7rem]">
            <h1 className="mb-5 text-[1.6rem] text-center text-5xl">
              Review From Other Learners
            </h1>
            <div>
              <RatingReviewSlider />
            </div>
          </div>
            {/* Section 4 */}
      <div className="  flex flex-col items-center  justify-evenly gap-5 bg-richblack-800 text-white h-fit ">
         <Footer/>
      </div>
        </div>
      )}
    </>
  );
};

export default Courses;
