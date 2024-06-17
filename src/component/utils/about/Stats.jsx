import React from "react";
import HighlightText from "../../home/HighlightText";

const Stats = ({ heading, para, highlight }) => {
  const statsData = [
    { heading: "5", highlight: "K", para: "Active Students" },
    { heading: "10", highlight: "+", para: "Mentor" },
    { heading: "200", highlight: "+", para: "Courses" },
    { heading: "50", highlight: "+", para: "Awards" },
  ];
  return (
    <div className="w-11/12 mx-auto max-w-maxContent  flex items-center h-full justify-evenly ">
      {statsData.map((stat, idx) => (
        <div key={idx} className="">
          <h1 className="text-2xl text-richblack-5 font-bold text-center">
            {stat.heading}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-bl from-blue_gradient-50 via-blue_gradient-25 to-blue_gradient-5">
              {stat.highlight}
            </span>
          </h1>
          <p className="text-sm font-bold text-richblack-500">{stat.para}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
