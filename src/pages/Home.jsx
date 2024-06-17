import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import HighlightText from "../component/home/HighlightText";
import Button from "../component/home/Button";
import stydyVideo from "../assets/study.mp4";
import TimelineSection from "../component/home/TimelineSection";
import LearningLanguageSection from "../component/home/LearningLanguageSection";
import CodeBlocks from "../component/home/CodeBlocks";
import InstructorSection from "../component/home/InstructorSection.jsx";
import ExploreMore from "../component/home/ExploreMore.jsx";
import Footer from "../component/footer/Footer"; 
import RatingReviewSlider from "../component/rating_review/RatingReviewSlider.jsx";
const Home = () => {
  return (
    <>
      {/* Section 1 */} 
      <div className="relative mx-auto flex flex-col max-w-maxContent items-center text-white justify-between w-11/12 ">
        <div>
          <Link to={"/signup"}>
            <div className="mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
              <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 shadow-lg shadow-richblack-700  hover:bg-richblack-900">
                <p>Become an Instructor</p>
                <span>
                  <AiOutlineArrowRight />
                </span>
              </div>
            </div>
          </Link>

          <div className=" mt-5 text-center text-4xl font-semibold">
            Epower Your Future With
            <HighlightText text={"Coding Skills "} />
          </div>

          <div className="flex mt-2 justify-center w-[100%]">
            <p className="w-[90%] text-center text-lg font-bold text-richblack-300">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </p>
          </div>

          <div className="flex flex-row gap-7 mt-8 justify-center">
            <Button linkto={"/signup"} active={true}>
              Learn More{" "}
            </Button>
            <Button linkto={"/login"} active={false}>
              Book a Demo
            </Button>
          </div>
        </div>

        <div className=" my-14 w-11/12 flex  justify-center mx-auto shadow-lg shadow-blue-200">
          <video muted loop autoPlay>
            <source src={stydyVideo} />
          </video>
        </div>

        {/* code section 1 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold text-white ">
                Unlock Your
                <HighlightText text={"Coding Potential"} />
                with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            button1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            button2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>
        {/* code section 2 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold text-white ">
                Start
                <HighlightText text={"Coding"} />
                <br />
                <HighlightText text={"in seconds"} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            button1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            button2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-pink-25"}
          />
        </div>

        <ExploreMore />
      </div>
      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 ">
        <div className="home-page-bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col gap-5 items-center justify-between mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7">
              <Button active={true} linkto={"/signup"}>
                <div className="flex gap-2 items-center font-bold">
                  Explore Full Catalog
                  <AiOutlineArrowRight />
                </div>
              </Button>
              <Button active={false} linkto={"/signup"}>
                <div>Learn More</div>
              </Button>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7 mt-16">
          <div className="flex flex-row gap-5 justify-center ">
            <div className="text-4xl font-semibold w-[45%] ">
              Get the skills you need for a
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col gap-10 w-[40%]">
              <p className="text-[1.1rem]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>

              <div className="w-[150px]">
                <Button active={true} linkto={"/signup"}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>
      {/* Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-around gap-8 bg-richblack-900 first-letter text-white">
        <InstructorSection />

        <h1 className="text-center text-4xl font-semibold mt-10">
          Review from Other Learner
        </h1>
        <div>
        {/* Review Slider */}
            <RatingReviewSlider/>
        </div>
      </div>
      {/* Section 4 */}
      <div className="  flex flex-col items-center  justify-evenly gap-5 bg-richblack-800 text-white h-fit ">
         <Footer/>
      </div>
    </>
  );
};

export default Home;
