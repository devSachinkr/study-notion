import React from 'react'
import ContactForm from '../component/utils/about/ContactForm'
import {BsFillChatLeftTextFill} from "react-icons/bs"
import {BsGlobeAmericas} from "react-icons/bs"
import {IoIosCall} from "react-icons/io"
import Footer from '../component/footer/Footer'
import RatingReviewSlider from '../component/rating_review/RatingReviewSlider'
const Contact = () => {
  return ( 
    <div>
      <section>
        <div className='w-11/12 mx-auto max-w-maxContent  flex flex-col justify-center items-center pt-20 '>
        <div className='flex w-[75%] justify-evenly'>
                <div className='lg:w-[300px] lg:h-[300px] flex flex-col justify-evenly rounded-lg bg-richblack-800 text-white'>
                
                <div className='pl-5'>
                    <p className='text-[20px] flex items-center gap-x-2 font-bold'> {<BsFillChatLeftTextFill/>} Chat on us</p>
                    <p className='text-richblack-100'>Our friendly team is here to help.</p>
                    <p className='text-richblack-100'>krs888904@gmail.com</p>
                
                </div>
                <div className='pl-5'>
                    <p className='text-[20px] flex items-center gap-x-2 font-bold'> {<BsGlobeAmericas/>} Visit Us</p>
                    <p className='text-richblack-100'>Come and say hello at our office HQ.</p>
                    <p className='text-richblack-100'>xyz street no : 01</p>
                </div>
                <div className='pl-5'>
                    <p className='text-[20px] flex items-center gap-x-2 font-bold'>{<IoIosCall/>} Call Us</p>
                    <p className='text-richblack-100'>Mon - Fri From 8am to 5pm</p>
                    <p className='text-richblack-100'>+91 123 456 7890</p>
                </div>
                </div>
                <div className='text-white w-[480px] p-5 border-[1px] border-richblack-700 rounded-lg'>
                    <ContactForm heading={"Got a Idea? We’ve got the skills. Let’s team up"} desc={"Tall us more about yourself and what you’re got in mind."} margin={50}/>
                </div>
        </div>
        </div>
      </section>
      <section className="text-white">
        <div className=" mb-5 w-11/12 mx-auto max-w-maxContent  flex items-center justify-center mt-24">
          <h1 className="text-3xl" >Reviews form other learners</h1>
        </div>
        <div>
          <RatingReviewSlider/>
        </div>
      </section>
      <section className=" flex flex-col items-center  justify-evenly gap-5 bg-richblack-800 text-white h-fit">
        <Footer />
      </section>
    </div>
  )
}

export default Contact
