import React from 'react'
import Sidebar from '../../../component/common/core/dashboard/Sidebar'
import Steps from './Steps'
import Tips from './Tips'
import CourseForm from "./CourseForm"
const AddCourse = () => {
  return (
    <div>
       <div className='flex'>
         <Sidebar/>
         <div className='text-richblack-5'>
           <div>Add Course</div>
           <div>
            <Steps/>
           </div>
         </div>
         <div>
          <Tips/>
         </div>
       </div>
    </div>
  )
}

export default AddCourse
