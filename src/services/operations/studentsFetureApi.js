import toast from "react-hot-toast"
import { endpoints } from "../apis"
import { apiConnector } from "../apiConnect"
import { useSelector } from "react-redux"
import {resetCart}from "../../slices/cartSlice";
const {PAYMENTCAPYURE_API,VERIFYSIGNATURE_API,PAYMENTSUCCESSEMAIL}=endpoints


export const buyCourse =async(token,courses,userDetails,navigate,dispatch)=>{
      const toastId=toast.loading("Loading...")
      try{
        
         const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
         if(!res){
            toast.error("Razorpay SDK Failed to load ")
            return
         }
       
        //  initiate the order
        const orderRes=await apiConnector("POST",PAYMENTCAPYURE_API,{courses},{
            Authorisation:`Bearer ${token}`
        })
        if(!orderRes.data.success){
        throw new Error(orderRes.data.message)
        }
        const options={
            key:process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderRes.data.data.currency,
            amount:orderRes.data.data.amount,
            order_id:orderRes.data.data.id,
            name:"Study Noation",
            description:"Thank you for purcasing the course",
            image:"",
            prefill:{
                name:userDetails.firstName,
                email:userDetails.email
            },

            handler:function (response){
                sendPaymentSuccessEmail(response,orderRes.data.data.amount,token)
                verifyPayment({...response,courses},token,navigate,dispatch)
            }
        }
        const paymentObject=new window.Razorpay(options)

        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error("oops, payment failed")
        })
    }catch(err){
            toast.error("You already purchased  this course")
      }
      toast.dismiss(toastId)
  }


async function sendPaymentSuccessEmail(response,amount,token){
    try{
       await apiConnector("POST",PAYMENTSUCCESSEMAIL,{
        orderId:response.razorpay_order_id,
        paymentId:response.razorpay_payment_id,
        amount
       },{
        Authorisation: `Bearer ${token}`
       })
    }catch(err){
        console.log("Payment success email error ",err)
    }
}


async function verifyPayment(bodyData,token,navigate,dispatch){
     const toastId=toast.loading("verifying payment")
     try{
        const response=await apiConnector("POST",VERIFYSIGNATURE_API,bodyData,{
            Authorisation:`Bearer ${token}`
        })
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("payment successfull")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
     }catch(err){
      console.log("payment verify error ",err)
     }
     toast.dismiss(toastId)
}

  const loadScript=(src)=>{
    return new Promise ((resolve)=>{
        const script=document.createElement("script");
        script.src=src;
        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }

        document.body.appendChild(script)
    })
  }


