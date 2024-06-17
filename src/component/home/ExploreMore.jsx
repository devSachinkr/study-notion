import React, { useState } from "react";
import { HomePageExplore } from "../../data/homePage-explore";
import HighlightText from "./HighlightText";
const ExploreMore = () => {
  const tabsName = [
    "Free",
    "New To Coding",
    "Most Popular",
    "Skills Path",
    "Carrer Path",
  ];
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className="text-4xl font-semibold text-center ">
        Unlock The
        <HighlightText text={"Power Of Code"} />
      </div>
      <p className="text-center text-richblack-300 text-sm ">
        Learn to Build Anything You Can Imagine
      </p>
      <div className="flex flex-row gap-4 rounded-full  bg-richblack-800 mb-5 mt-5 px-2 py-1 shadow-lg shadow-richblack-700">
        {
          tabsName.map((ele, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-3 ${
                currentTab === ele
                  ? " bg-richblack-900 text-richblack-5 font-medium"
                  : "  text-richblack-500"
              } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 text-richblue-5 py-2 px-2 ml-2 `}
              key={index}
              onClick={() => {
                setMyCard(ele);
              }}
            >
              {ele}
            </div>
          );
        })
        }
      </div>
      <div className="lg:h-[150px]">

           {/* Course Card  */}
           {/* <div className="absolute flex flex-row gap-10 justify-between w-full">
            {
              courses.map((ele,idx)=>{
                  return(
                    <CourseCard
                      key={idx}
                      cardData={ele}
                      currentCard={currentCard}
                      setCurrentCard={setCurrentCard}
                    />
                  )
              })
            }
           </div> */}

      </div>
    </div>
  );
};

export default ExploreMore;
