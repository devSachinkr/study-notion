import React from 'react'
import {useParams } from 'react-router-dom'
import { getCategoryPageDetails,getAllCategories } from '../services/operations/authApi';
import Footer from '../component/footer/Footer';
import CourseSlider from '../component/common/CourseSlider';
import CourseCard from '../component/common/CourseCard'
import { useEffect } from 'react';
import { useState } from 'react';
const Catalog = () => {
    const {catalogName}=useParams();
    const [catalogPageData,setCatalogPageData]=useState(null);
    const [categoryId,setCategoryId]=useState("");
    const [category,setCategory]=useState([]);
    const [toggleState,settoggleState]=useState(1);
    useEffect(()=>{
      getCategoryId()
    },[catalogName])

    useEffect(()=>{
        if(categoryId){
            categoryPageDetails();
            return
        }
    },[categoryId])
    const getCategoryId=async()=>{
        const result=await getAllCategories();
        const category_id=result?.allCategory?.filter((ct)=>ct?.name.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
        setCategoryId(category_id);
        setCategory(result?.allCategory)
    }
    const categoryPageDetails= async()=>{
     const result=await getCategoryPageDetails(categoryId);
     setCatalogPageData(result?.data)
    }
  const currentTab=(tabIdx)=>{
        settoggleState(tabIdx)
  }

  return (
    <>
            <div className=' bg-richblack-800 pl-10 pt-10'>
                <p className='text-richblack-100'>Home / Catalog /  <span className=' text-yellow-50 capitalize'>{catalogName}</span></p>
                <p className=' capitalize mt-5 text-[1.8rem] text-richblack-5'>{catalogName}</p>
                <p className='w-[60vw] mt-3 text-richblack-100 pb-5'>{category.map((cate)=>categoryId===cate._id ?cate.description:"")}</p>
            </div>
            <div className=' text-white lg:w-[95vw]  mx-auto'>
            <div className='mt-10'>
                {/* section 1 */}
                <section>
                    <p className='text-[1.6rem]'>Courses to get you started</p>
                      <div className={`flex gap-x-2 items-center `}>
                         <p onClick={()=>currentTab(1)} className={` cursor-pointer ${toggleState===1?"text-yellow-50":"text-richblack-5"}`}>Most Popular</p>
                         <p onClick={()=>currentTab(2)} className={` cursor-pointer ${toggleState===2?"text-yellow-50":"text-richblack-5"}`}>New</p>
                      </div>
                      <div className='mt-5'>
                        <CourseSlider active={toggleState} courses={catalogPageData?.selectedCourse}/>
                      </div>
                </section>
                {/* Section 2 */}
                <section>
                    <div className='mt-10'>
                         <p className='text-[1.6rem] mb-10'>Top Courses</p>
                         <div>
                            <CourseSlider  courses={catalogPageData?.diffrentCourses}/>
                         </div>
                    </div>
                </section>
                {/* Section 3 */}

                <section className='mt-10'>
                    <p className='text-[1.6rem]'>Frequently Bought Together</p>
                    <div className=' py-8'>
                         <div className="flex flex-wrap items-center">
                            {
                                catalogPageData?.mostSellingCourses?.slice(0,4)
                                .map((course)=>(
                                    <div key={course?._id} className='text-white w-[50%] flex justify-center'>
                                        <CourseCard course={course}/>
                                    </div>
                                ))
                            }
                         </div>
                    </div>
                </section>

            </div>

        </div>
         <div className=' flex flex-col items-center  justify-evenly gap-5 bg-richblack-800 text-white h-fit'>
                <Footer size={"100vw"}/>
         </div>
             
        </>
    )
}

export default Catalog