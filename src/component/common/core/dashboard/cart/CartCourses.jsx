import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import {AiFillStar} from "react-icons/ai"
import {AiOutlineStar} from "react-icons/ai"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../../slices/cartSlice'
const CartCourses = () => {
    const {cart}=useSelector((state)=>state.cart)
    console.log(cart)
    const dispatch=useDispatch();
  return (
    <div className='  m-2  p-5'>
        <div >{cart.map((course,idx)=> { return (
            <div key={idx} className='flex gap-x-5 border-b-[1px] border-richblack-700 w-[46vw] mt-2 pb-2'>
                <div>
                <img width={240} src={course?.thumbnail} alt={course?.courseName} className='rounded-lg' />
                </div>
                <div>
                    <p className='pt-3 '> Course Name : {course?.courseName}</p>
                    <p className='pt-2 text-richblack-400 font-bold'> Category : {course?.category.name}</p>
                    <div className='flex gap-x-3 items-center pt-2'>
                        <span className='text-richblack-400 font-bold'>{course?.ratingAndReviews[0]?.rating}</span>
                        <ReactStars
                            count={5}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                            emptyIcon={<AiOutlineStar/>}
                            fullIcon={<AiFillStar/>}
                            value={course?.ratingAndReviews[0]?.rating}
                        />
                        <span className='text-richblack-400 font-bold'>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                </div>

                <div className='w-[10vw] flex flex-col items-center  p-2'>
                <button onClick={()=>dispatch(removeFromCart(course._id))}>
                    <div className='flex gap-x-2 items-center p-3 bg-richblack-800 border-[1px] border-richblack-600 rounded-md text-pink-200'>
                     <RiDeleteBin6Line className='text-[1.4rem]'/>
                     <span>Remove</span>
                     </div>
                 </button>
                 <p className='pt-3 text-[1.5rem]'>Rs {course?.price}</p>
                </div>
            </div>
        )
        })}</div>
    </div>
  )
}

export default CartCourses
