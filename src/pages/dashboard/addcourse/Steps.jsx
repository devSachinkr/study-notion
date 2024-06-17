import React from 'react'
import { useSelector } from 'react-redux'
import {FaCheck} from "react-icons/fa"
import CourseForm from "./CourseForm"
import CourseBuilder from "./CourseBuilder"
import PublishForm from "./PublishForm"
const Steps = () => {
    const {step}=useSelector((state)=>state.course)
    const steps=[
        {
            id:1,
            title:"Course Information",
        },
        {
            id:2,
            title:"Course Builder",
        },
        {
            id:3,
            title:"Publish",
        },
    ]
  return (
    <>
      <div className='flex justify-evenly w-[65vw] items-center'>
         {
            steps.map((item)=>(
                <div >
                <div key={item.id}>
                <div className=''>
                <div  className='text-center'>
                     <span className='flex justify-center items-center' ><p className={`${step>=item.id ? "bg-yellow-800 border-2 border-yellow-100 text-yellow-50":"border-2 border-richblack-600 bg-richblack-800 text-richblack-300"} flex w-[30px] rounded-full aspect-square justify-center items-center`} >{step>item.id?(<FaCheck/>):(item.id)}</p></span>
                </div>

            <div className={`${step===item.id ?"text-richblack-100":"text-richblack-500"}`}>
                     <span>{item.title}</span>
            </div>
                </div>
                </div>
            
</div>
            ))
         } 

      </div> 
     {step===1 && <CourseForm/>}
     {step===2 && <CourseBuilder/>}
     {step===3 && <PublishForm/>}
    </>
  )
}

export default Steps
