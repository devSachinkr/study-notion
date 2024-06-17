import React from 'react'
import {Swiper,SwiperSlide}from "swiper/react"
import "swiper/css"
import  "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay,Pagination, Navigation} from "swiper/modules"
import CourseCard from './CourseCard'
const CourseSlider = ({courses,active}) => {
  return (
    <div>
        {courses?.length?
        (
        <Swiper
        slidesPerView={3}
        spaceBetween={25}
        pagination={true}
        modules={[Autoplay,Pagination,Navigation]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
  
        >
            {
              courses?.map((course,idx)=>(
                <SwiperSlide key={idx}>
                   <CourseCard course={course}/>
                </SwiperSlide>
              ))
            }
        </Swiper>
        ):(
        
        <div>
        No course Found
        </div>
        )

        }
    </div>
  )
}

export default CourseSlider