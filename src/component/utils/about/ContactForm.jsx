import React from 'react'
import CommonForm from "../../common/CommonForm.jsx"
const ContactForm = ({heading,desc,margin}) => {
  return (
    <div className={`w-11/12 mx-auto max-w-maxContent  mt-[20px]`}>
              <div className='w-full flex flex-col items-center' >
                <h1 className='text-3xl font-bold'>{heading}</h1>
                <p className='pt-3 text-richblack-100'>{desc}</p>
              </div>
                       
               <div>
                 <CommonForm/>
               </div>
            
        
    </div>
  )
}

export default ContactForm
