import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Steps from '../../pages/dashboard/addcourse/Steps';
import Sidebar from './core/dashboard/Sidebar';
import { getInstructorCourseDetails } from '../../services/operations/authApi';
import { useEffect } from 'react';
import { setCourse, setEditCourse } from '../../slices/courseSlice';
const EditCourse = () => {
    const dispatch=useDispatch();
    const {courseId}=useParams();
    const {course}=useSelector((state)=>state.course)
    const {token}=useSelector((state)=>state.auth)
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        if(courseId){
            getFullCourseDetails()
        }
    },[])
    const getFullCourseDetails =async()=>{
      setLoading(true);
      const result=await getInstructorCourseDetails(token,courseId)
      console.log(result?.courseDetails);
      dispatch(setCourse(result?.courseDetails))
      dispatch(setEditCourse(true))
      setLoading(false);
    }
    if(loading){
        return(
            <div className='spinner'></div>
        )
    }
  return (
    <div className='text-white flex'>
        <div>
            <Sidebar/>
        </div>
        <h1>Edit Course</h1>
        <div>
            {
                course ?(
                    <Steps/>
                ):(<div>Course not found</div>)
            }
        </div>
    </div>
  )
}

export default EditCourse