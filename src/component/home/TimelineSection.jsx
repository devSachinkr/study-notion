import React from "react";
import { SiGriddotai, SlBadge } from "react-icons/si";
import Logo1 from "../../assets/medal.png";
import Logo4 from "../../assets/bracket.png";
import Logo3 from "../../assets/diamond.png";
import Logo2 from "../../assets/graduation-hat.png";
import timelineimage from "../../assets/girloncomp.jpg";
const TimelineSection = () => {
  const timeline = [
    {
      Logo: Logo1,
      heading: "Leadership",
      desc: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      heading: "Responsibility",
      desc: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      heading: "Flexibility",
      desc: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      heading: "Solve the problem",
      desc: "Code your way to a solution",
    },
  ];
  return (
    <div>
      <div className="flex flex-row gap-14 items-center">
        <div className="flex flex-col w-[45%] gap-5">
          {timeline.map((card, index) => {
            return (
              <div className="flex flex-row gap-6" key={index}>
                <div className="w-[50px] h-[50px] bg-white flex items-center ">
                  <img src={card.Logo} alt={card.heading} />
                </div>
                <div className="flex flex-col ">
                  <h2 className="font-semibold text-[18px]">{card.heading}</h2>
                  <p className="text-base">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative shadow-blue-200 ">
          <img
            src={timelineimage}
            alt="timeline image"
            className="w-[600px] h-fit "
          />

          <div className="absolute w-[75%] h-[100px] bg-caribbeangreen-700 flex  flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="flex gap-5 items-center border-r border-caribbeangreen-300 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-100 text-sm">
                Years of Experiences
              </p>
            </div>
            <div className="flex gap-5 items-center  px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-100 text-sm">
                TYPES OF COURSES
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
