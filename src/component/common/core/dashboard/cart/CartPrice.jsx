import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Iconbutton from '../../../Iconbutton'
import { buyCourse } from '../../../../../services/operations/studentsFetureApi'
import { useNavigate } from 'react-router-dom'
import { resetCart } from '../../../../../slices/cartSlice'

const CartPrice = () => {
    const {total,cart}=useSelector((state)=>state.cart)
    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handelBuyCourse=()=>{
      const courses=cart.map((course)=>course._id)
      buyCourse(token,courses,user,navigate,dispatch)
      
     
    }
  return (
    <div className='w-[16vw] bg-richblack-800 border-[1px] border-richblack-600 rounded-md p-5 m-5'>
      <p className='text-richblack-300 font-bold'>Total:</p>
      <p className='text-yellow-50 text-[1.5rem]'>Rs. {total}</p>
      <s className='text-richblack-400 font-bold'>Rs. {total+1000}</s>
      <div className='mt-2'>
      <Iconbutton
        btnText="Buy Now" 
        disable={true}
        onclick={handelBuyCourse}
        customClasses={"text-richblack-900 font-bold p-1 px-2 w-[12vw] rounded-md"}
      />
      </div>
    </div>
  )
}

export default CartPrice
