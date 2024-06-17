import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Iconbutton from "../../Iconbutton";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
const VideoDetailsSideBar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState(null);
  const [videoBarActive, setVideoBarActive] = useState(null);
  const [activeSection, setActiveSection] = useState(false);
  const navigate = useNavigate();
  const loaction = useLocation();
  const sectionsId = [];
  const SubSectionsId = [];
  const {
    courseSectionData,
    courseEntireData,
    totalNumberOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewcourse);
  courseSectionData &&
    courseSectionData.forEach((section) => {
      sectionsId.push(section._id);
      section.subSection.forEach((sub) => {
        SubSectionsId.push(sub._id);
      });
    });
  useEffect(() => {
    (() => {
      if (sectionsId.length === 0) {
        return;
      }
      let currentSection;
      sectionsId.forEach((section) => {
        currentSection = section;
      });
      let currentSubSection;
      SubSectionsId.forEach((section) => {
        currentSubSection = section;
      });
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === currentSection
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === currentSubSection);

      const activeSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]._id;
      // set current section
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      // set Current sub section
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseEntireData, courseEntireData, loaction.pathname]);

  const reviewClickHandler = () => {
    setReviewModal(true);
  };
  const sectionClickHandler = (sectionId) => {
    setActiveStatus(sectionId);
    setActiveSection(!activeSection);
  };
  const subSectionClichkHandler=(sectionId,subSectionId)=>{
     setVideoBarActive(subSectionId)
     navigate(`/view-lecture/${courseEntireData._id}/${sectionId}/${subSectionId}`)
  }
  return (
    <div className="text-white w-[14vw]">
      <div>
        <div>
          <div>
            <IoArrowBackCircleSharp
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="text-[1.5rem] font-bold cursor-pointer"
            />
          </div>
          <div>
            <Iconbutton
              btnText={"Add Review"}
              disable={true}
              customClasses={
                "font-bold py-1 px-2 text-richblack-900 rounded-md"
              }
              onclick={() => reviewClickHandler()}
            />
          </div>
        </div>
        <div>
          <p>{courseEntireData.courseName}</p>
          <p>
            {completedLectures.length} / {totalNumberOfLectures}
          </p>
        </div>
      </div>

      <div  >
        {courseSectionData &&
          courseSectionData?.map((section, idx) => (
            <div className="bg-richblack-800 mt-2 ">
              <div
                key={idx}
                onClick={() => sectionClickHandler(section._id)}
                className="flex justify-between items-center "
              >
                <p className="pl-4 ">{section.name}</p>
                <span>
                  { activeStatus === section._id &&activeSection ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>
              {activeStatus === section._id &&
                activeSection &&
                courseSectionData?.map((section) =>
                  section.subSection.map((sub, idx) => (
                    
                    <div
                    onClick={()=>subSectionClichkHandler(section._id,sub._id)}
                      key={idx}
                     className="bg-richblack-900 pl-5"
                    >
                    {activeStatus===section._id &&

                    <div  className={`flex gap-x-3 items-center ${
                      videoBarActive === sub._id
                        ? "text-richblue-300"
                        : ""
                    } w-[10vw] cursor-pointer`}>
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(sub._id)}
                      />
                      <p>{sub.title}</p>
                      <span><MdOndemandVideo/></span>
                      </div>
                    }
                    </div>
                  ))
                )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoDetailsSideBar;
