import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from './RatingStars'
import { useState } from 'react'
import { useEffect } from 'react'
import GetAvgRating from '../../utils/avgRating'

const CourseCard = ({course}) => {
    const [avgReviewCount,setavgReviewCount]=useState(0)
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews)
        setavgReviewCount(count)
    },[course])
  return (
    <div>
        <Link
        to={`/courses/${course?._id}`}
        >
        <div>
            <img src={course?.thumbnail} alt={course?.courseName} width={350} height={250} className='rounded-md border-[1px] border-yellow-25'/>
        </div>

        <p>{course?.courseName}</p>

        <p> Instructor : {course?.instructor?.firstName}  {course?.instructor?.lastName}   </p>

        <div className='flex gap-x-2 items-center'>
            
        <span>{avgReviewCount }</span>

        <div><RatingStars Review_count={avgReviewCount||0} /></div>

        <span>{course?.ratingAndReviews?.length} Ratings</span>
        </div>
        <p>₹ {course?.price}</p>
        </Link>
    </div>
  )
}

export default CourseCard