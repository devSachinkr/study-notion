import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total")? JSON.parse(localStorage.getItem("total")):0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart
     addToCart:(state,action)=>{
        const course=action.payload
        let sameCourse=false
        const index =state.cart.findIndex((item)=>(item._id===course._id))
        if(index>=0){
            toast.error("Course Already In Cart")
            return
        } 
        //  if course is not in cart 
        state.cart.push(course)
        // update  quantity and price 
        state.totalItems++
        state.total +=course.price
        localStorage.setItem("cart",JSON.stringify(state.cart))
        localStorage.setItem("total",JSON.stringify(state.total))
        localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
        toast.success("Item add in cart")
     },


    setTotalItems(state, value) {
      state.token = value.payload;
    },
    // remove from  cart
    removeFromCart:(state,action)=>{
        const courseId=action.payload
        const index =state.cart.findIndex((item)=>item._id===courseId)
    
        //  if course is not in cart 
        // update  quantity and price 
        state.totalItems--
        state.total -=state.cart[index].price
        state.cart.splice(index,1)
        localStorage.setItem("cart",JSON.stringify(state.cart))
        localStorage.setItem("total",JSON.stringify(state.total))
        localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
        toast.success("Item remove from cart")
     },
    // reset cart
    resetCart:(state)=>{
      state.cart=[];
      state.total=0;
      state.totalItems=0;
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")

    }

  },
});
export const { setTotalItems,addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;
