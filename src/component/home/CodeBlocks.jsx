import React from 'react';
import Button from './Button';
import HighlightText from './HighlightText';
import { AiOutlineArrowRight } from "react-icons/ai";
import {TypeAnimation} from "react-type-animation";

const CodeBlocks = ({position , heading , subHeading , button1, button2 , codeblock , backgroundGradient , codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10    `}>
        {/* Section 1 */}
        <div className="w-[50%] flex flex-col gap-8 ">
            {heading}
            <div className="text-richblack-300 font-bold "> 
            {subHeading}
            </div>
            <div className="flex  gap-7 m-7">
                <Button active={button1.active} linkto={button1.linkto}>
                     <div className="flex  gap-2 items-center">
                        {button1.btnText}
                        <AiOutlineArrowRight/>
                     </div>
                </Button>
                <Button active={button2.active} linkto={button2.linkto}>
                    
                        {button2.btnText}
                       
                </Button>
            </div>
        </div>
        {/* Section 2  */}
        <div className=' flex flex-row text-10[px] w-[100%] py-2 lg:w-[500px] bg-gradient-to-t from-grey_black-5 to-grey_black-50 shadow-lg shadow-yellow-25'>
          {/* Bg gradient */}
        
         
          <div className='text-center flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
     
          </div>
           <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 `}>
                <TypeAnimation 
                  sequence={[codeblock,2000,""]}
                  repeat={Infinity}
                  omitDeletionAnimation={true}
                  style={
                    {
                      whiteSpace:'pre-line',
                      display:"block",
                    }
                  }
                />
           </div>
       
    </div>
    </div>
  )
}

export default CodeBlocks
