import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Iconbutton from '../../component/common/Iconbutton'
import Sidebar from '../../component/common/core/dashboard/Sidebar'
import { MdEmail } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaTransgenderAlt } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
const MyProfile = () => {
    const {user}=useSelector((state)=>state.profile)
    const navigate=useNavigate();
  return ( 
    <>
    <div className='flex text-richblack-300 w-full '>
    <Sidebar/>
    {/* Section 1  */}
    <div className='flex flex-col w-[80vw]  justify-center items-center mt-5'>
    <h1 className='w-[60vw] h-[60px] font-bold text-2xl text-richblack-5'>My Profile</h1>
    <div className=''>
        <div className=" flex items-center bg-richblack-800 w-[60vw] justify-between rounded-sm">
            <div className="flex pl-10 h-[90px] items-center">
                <img src={user?.image} alt='profile dp' className="aspect-square w-[50px] h-[50px] rounded-full object-cover"/>
                <div className="ml-5">
                    <p className='capitalize text-richblack-5 font-bold text-[1.3rem]'>{user?.firstName +" "+user?.lastName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <div className='pr-10'>

        <Iconbutton
          disable={true}
            btnText="Edit"
            customClasses={"text-richblack-800 px-5 py-1 rounded-sm font-bold "}
            onclick={()=>{
                navigate("/dashboard/settings")
            }}
            isIcon={true}
        />
            </div>
        </div>
    </div>
    {/* Section 2 */}
    <div className='mt-5'>
        <div className=" flex items-center bg-richblack-800 w-[60vw] justify-between rounded-sm">
            <div className=" flex pl-10 h-[90px] items-center">
            <div>
              <h1 className=' text-[1.5rem]'>About</h1>
              <p className='text-richblack-5 font-bold'>{user?.additionalDetails?.about??"Write Something About Yourself"}</p>
            </div>
            </div>
            <div className='pr-10'>

        <Iconbutton
          disable={true}
            btnText="Edit"
            customClasses={"text-richblack-800 px-5 py-1 rounded-sm font-bold "}
            onclick={()=>{
                navigate("/dashboard/settings")
            }}
            isIcon={true}
        />
            </div>
        </div>
    </div>
    {/* Section 3 */}
     <div> 
       <div className='flex  flex-col  bg-richblack-800 w-[60vw] justify-between rounded-sm mt-5'>
       <div className='flex justify-between w-full mt-5'>
        <p className='pl-10 text-[1.3rem] text-richblack-5 font-bold'>Personal Details</p>
        <Iconbutton btnText={"Edit"} disable={true} customClasses={"text-richblack-800 px-5 py-1 rounded-sm font-bold mr-10"}   onclick={()=>{
                navigate("/dashboard/settings")
            }} isIcon={true} />
       </div>
           <div className="w-[30vw] ml-10 mt-10">
            <div className="flex justify-between mb-3">
            <div className=''>

              <p>First Name</p>
              <p className='text-richblack-5 font-bold capitalize'>{user?.firstName}</p>
            </div>
          <div className=''>
            
              <p>Last Name</p>
              <p className='text-richblack-5 font-bold capitalize'>{user?.lastName}</p>
          </div>
            </div>
            <div className="flex justify-between mb-5 ">
            <div >
              <div className='flex gap-x-1 items-center'>
                <div className='text-[1.2rem]'><MdEmail/></div>
                <p>Email</p>
              </div>
              <p className='text-richblack-5 font-bold'>{user?.email}</p>
            </div>
      <div className='pr-5'>
              <div className='flex items-center gap-x-1'>
              <div className='text-[1.2rem]'><SiGnuprivacyguard/></div>
              <p>Role</p>
              </div>
              <p className='text-richblack-5 font-bold capitalize'>{user?.accountType}</p>
      </div>
            </div>
            <div className="flex justify-between mb-5  w-[34.3vw]">
            <div>
               <div className='flex items-center gap-x-1'>
                  <div className='text-[1.2rem]'><LiaBirthdayCakeSolid/></div>
              <p>Date of Birth</p>
               </div>
              <p className='text-richblack-5 font-bold'>{user?.additionalDetails?.dateOfBirth??"Add Date Of Birth"}</p>
            </div>
      <div className=''>
              <div className='flex items-center gap-x-1'>
              <div className='text-[1.2rem]'><IoMdContact/> </div>

            
              <p>Contact Number</p>
              </div>
              <p className='text-richblack-5 font-bold'>{user?.additionalDetails?.contactNumber??"Add Contact Number"}</p>
      </div>
            </div>
            <div className="flex justify-between mb-5 ">
            <div>
              <div  className='flex items-center gap-x-1'>
              <div className='text-[1.2rem]'><FaTransgenderAlt/></div>
              <div>
              <p>Gender</p>
              </div>
              </div>
              <p className='text-richblack-5 font-bold capitalize'>{user?.additionalDetails?.gender??"Add Gender"}</p>
            </div>
     
            </div>
           
           </div>
       </div>
     </div>
     
   
     </div>
    </div>
    </>
  )
}

export default MyProfile

