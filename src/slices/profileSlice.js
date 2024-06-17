import { createSlice } from "@reduxjs/toolkit";

const initialsState={
    user:null,
    loading:false,
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
   
};
export const profileSlice=createSlice({
    name:"profile",
    initialState:initialsState,
    reducers:{
        setUser(state,value){
            state.user=value.payload
        }  ,
        setLoading(state,value){
            state.loading=value.payload
        },
    }
})
export const {setUser,setLoading}=profileSlice.actions;
export default profileSlice.reducer;
