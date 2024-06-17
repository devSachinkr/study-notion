import React from 'react'
import VideoDetailsSideBar from "../../../component/common/core/dashboard/VideoDetailsSideBar"
import CourseReviewModal from "../../../component/common/core/dashboard/CourseReviewModal.jsx"
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { getInstructorCourseDetails } from '../../../services/operations/authApi.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { GiLightningDissipation } from 'react-icons/gi'
import { setCompletedCourses, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../../../slices/viewCourseSlice.js'
import WatchCourseVideo from '../../WatchCourseVideo.jsx'
const ViewCourse = () => {
    const [reviewModal,setReviewModal]=useState(false)
    const {token}=useSelector((state)=>state.auth)
    const {courseId}=useParams();
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
       getCourseData()
    },[courseId])
   const getCourseData=async()=>{
      try{ 
         setLoading(true)
         const result=await getInstructorCourseDetails(token,courseId);
           dispatch(setCourseSectionData(result.courseDetails.courseContent))
           dispatch(setEntireCourseData(result.courseDetails))
           dispatch(setCompletedCourses(result.completedVideos))
           let lectures=0;
           result.courseDetails.courseContent.forEach((section)=>lectures+=section.subSection.length)
            dispatch(setTotalNoOfLectures(lectures))
      }catch(err){
          console.log(err.message)
      }
      setLoading(false);
   }
   if(loading){
    return(
        <div className='spinner'></div>
    )
   }
  return (
    <>
    <div className=''>
    <div>
        <VideoDetailsSideBar setReviewModal={setReviewModal} />
        <div>
            <Outlet/>
        </div>
    </div>
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} courseId={courseId}/> }
    <div>
    </div>
    </div>
    </>
  )
}

export default ViewCourse