import React from "react";
import HighlightText from "./HighlightText";
import Logo1 from "../../assets/learn1bg.jpg";
import Logo2 from "../../assets/learn2bg.jpg";
import Logo3 from "../../assets/learn3bg.jpg";
import Button from "./Button";
const LearningLanguageSection = () => {
  return (
    <div>
      <div className=" flex flex-col gap-5 m-[120px]">
        <div className=" flex flex-col w-11/12 mx-auto items-center">
          <div className="text-4xl font-semibold text-center">
            Your Swiss Knife for
            <HighlightText text={"learning any language"} />
          </div>
          <p className="text-center text-richblack-600 w-[70%] mx-auto text-base m-2">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </p>
          <div className="flex items-center justify-center mt-5">
            <img
              src={Logo1}
              className="object-contain w-[314px] h-[340px] rotate-[15deg]"
            />
            <img src={Logo2} className="object-contain w-[314px] h-[340px]  rotate-[-8deg]" />
            <img
              src={Logo3}
              className="object-contain w-[314px] h-[340px] rotate-12"
            />
          </div>
            <div className="mt-10 w-fit">
                  <Button active={true}  linkto={"/signup"}>
                    Learn More 
                  </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
