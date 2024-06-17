import React, { useState } from 'react'
import Sidebar from '../../component/common/core/dashboard/Sidebar'
import { useEffect } from 'react'
import { instructorCourses } from '../../services/operations/authApi'
import { useDispatch, useSelector } from 'react-redux'
import Iconbutton from '../../component/common/Iconbutton'
import CourseTable from '../../component/common/core/dashboard/my-course/CourseTable'
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
const MyCourses = () => {
    const {token}=useSelector((state)=>state.auth)
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        getCourses()
    },[])
    const [courses,setCourses]=useState([]);
 
    const getCourses=async()=>{
        setLoading(true)
         const result=await instructorCourses(token);
           if(result){
             setCourses(result?.data)
           }
         setLoading(false)
    }

    if(loading){
        return(
            <div className='spinner'> </div>
        )
    }
  return (
    <div className='flex text-richblack-5'>
        <div >
            <Sidebar/>
        </div>
        <div className='w-full p-5'>
            <div>
              <p>Home / Dashboard / <span className='text-yellow-50'>Courses</span></p>
            <h1 className='mt-3 text-[1.9rem]'>My Courses</h1>
            <div className='flex items-center  p-2 justify-end '>
               
               <button onClick={()=>navigate("/dashboard/add-course")} className='bg-yellow-50 flex items-center gap-x-2 p-1 px-2 text-richblack-900 rounded-md mr-10'><span><FiPlusCircle className='text-[1.3rem] text-richblack-900'/></span> New</button>
            </div>
            </div>
            <div className='flex border-[1px] border-richblack-600 gap-x-2 justify-evenly p-3 rounded-lg mt-10 w-[80vw]'>
              <div className='w-[60vw]'>COURSES</div>
              <div>DURATION</div>
              <div>PRICE</div>
              <div>ACTIONS</div>
            </div>
            <div className=' w-[80vw] border-[1px] border-richblack-700 rounded-md p-2  gap-x-2 pt-3 p-2'>
         {
            courses.length !==0 ? courses?.map((course)=>(
                <CourseTable course={course} setCourses={setCourses} getCourses={getCourses} />
            )):<div>No courses Found </div>
         }
        </div>
        </div>
    </div>
  )
}

export default MyCourses
