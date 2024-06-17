import React from 'react'
import teacher from "../../assets/teacher.jpg"
import HighlightText from './HighlightText'
import Button from './Button'
import { AiOutlineArrowRight } from "react-icons/ai";

const InstructorSection = () => {
  return (
    <div className='mt-16'>
          <div className='flex gap-20 items-center w-11/12'>
                <div className="w-[50%] flex justify-center ">
                    <img src={teacher} className='w-[350px] h-[390px]'/>
                </div>
          <div className=" flex flex-col gap-10 w-[50%]">
              <div className='text-4xl font-semibold w-[50%]'>
                Become an 
                <HighlightText text={"Instructor"}/>
              </div>
              <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
              Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
              </p>
              <div className='w-fit flex flex-row'>
              <Button active={true} linkto={"/signup"} >
              <div className='flex items-center gap-2'>
              Start Teaching Today
              <AiOutlineArrowRight/>
              </div>
              </Button>
              </div>
          </div>
          </div>
    </div>
  )
}

export default InstructorSection
