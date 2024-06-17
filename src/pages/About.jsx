import React from "react";
import HighlightText from "../component/home/HighlightText";
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";
import about4 from "../assets/about4.jpg";
import Stats from "../component/utils/about/Stats.jsx";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import LearningSection from "../component/utils/about/LearningSection.jsx";
import ContactForm from "../component/utils/about/ContactForm.jsx";
import Footer from "../component/footer/Footer";
import RatingReviewSlider from "../component/rating_review/RatingReviewSlider.jsx";
const About = () => {
  return (
    <div className="bg-richblack-900">
      {/* section 1 */}
      <section className="bg-richblack-800 text-center">
        <div className="w-[52%] mx-auto max-w-maxContent flex flex-col justify-center items-center pt-20 ">
          <div>
            <h1 className="text-3xl text-richblack-25 font-semibold">
              Driving Innovation in Online Education for a{" "}
            </h1>
            <div className="text-3xl">
              <HighlightText text={"Brighter Future"} />
            </div>
          </div>
          <p className=" text-richblack-200 text-center mt-4">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
          <div className="flex w-full gap-x-3 justify-center translate-y-16 ">
            <img src={about1} width={280} height={280} alt="Students img" />
            <img src={about2} width={280} height={280} alt="Students img" />
            <img src={about3} width={280} height={280} alt="Students img" />
          </div>
        </div>
      </section>

      {/* section 2 */}

      <section className="text-white border-b-[1px] border-richblack-800">
        <div className="w-[50%] mx-auto max-w-maxContent mt-[10rem]  justify-center text-2xl relative mb-20">
          <div className="absolute top-[-8px] left-[-32px] text-richblack-600">
            <ImQuotesLeft />
          </div>{" "}
          We are passionate about revolutionizing the way we learn. Our
          <div className="w-[120%] translate-x-[-50px]">
            innovative platform <HighlightText text={"combines technology"} />,
            <span className=" text-transparent bg-clip-text bg-gradient-to-r from-orange_gradient-5 to-orange_gradient-25 font-bold">
              {" "}
              expertise
            </span>{" "}
            , and community to
          </div>
          <div className="text-center">
            create an{" "}
            <span className=" text-transparent bg-clip-text bg-gradient-to-r from-yellow_gradient-5 to-yellow_gradient-25 font-bold relative">
              unparalleled educational experience.
            </span>{" "}
            <div className=" absolute right-[45px] translate-y-[-2.2rem] text-richblack-600">
              <ImQuotesRight />
            </div>
          </div>
        </div>
      </section>
      {/* section 3 */}
      <section className="text-white">
        <div className="w-11/12 mx-auto max-w-maxContent  flex justify-between mt-16">
          <div className="w-[50%]">
            <div className="w-[67%] mx-auto">
              <h1 className="text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink_gradient-5 via-pink_gradient-25 to-pink_gradient-50 font-bold">
                Our Founding Story{" "}
              </h1>
              <p className=" text-richblack-100">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="mt-3 text-richblack-100 ">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
          </div>
          <div className="w-[50%] flex justify-center  ">
            <div className="w-[80%] h-[80%] my-auto flex justify-center items-center shadow-lg shadow-pink_gradient-5">
              <img src={about4} alt="students img" width={350} />
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto max-w-maxContent  flex justify-between mb-20">
          <div className="flex mt-40 justify-evenly">
            <div className="w-[44%]">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow_gradient-5 to-yellow_gradient-25 text-3xl">
                Our Vision
              </h1>
              <p className="mt-3  text-richblack-100">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="w-[34%]">
              <h1 className=" text-3xl"><HighlightText text={"Our Mission"}/></h1>
              <p className="mt-3  text-richblack-100">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* section 4 */}
      <section className="bg-richblack-800 lg:h-[150px]">
        <Stats />
      </section>
      {/* section 5 */}
      <section className="text-white">
        <LearningSection />
      </section>
      {/* section 6 */}
      <section className="text-white">
        <ContactForm heading={"Get in Touch"} desc={"We’d love to here for you, Please fill out this form."} />
      </section>
      {/* section 7 pending */}
      <section className="text-white ">
        <div  className=" mb-5 w-11/12 mx-auto max-w-maxContent  flex items-center justify-center mt-24">
          <h1 className="text-3xl" >Reviews form other learners</h1>
        </div>
        <div>
          <RatingReviewSlider/>
        </div>
      </section>
      {/* section 8 */}
      <section className=" flex flex-col items-center  justify-evenly gap-5 bg-richblack-800 text-white h-fit">
        <Footer />
      </section>
    </div>
  );
};

export default About;
