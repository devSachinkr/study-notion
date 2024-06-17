import { createSlice } from "@reduxjs/toolkit";
const initialState={
    courseSectionData:[],
    courseEntireData:[],
    completedLectures:[],
    totalNumberOfLectures:0,
}
const viewCourseSlice=createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData:(state,action)=>{
            state.courseSectionData=action.payload
        },
        setEntireCourseData:(state,action)=>{
            state.courseEntireData=action.payload
        },
        setTotalNoOfLectures:(state,action)=>{
            state.totalNumberOfLectures=action.payload
        },
        setCompletedCourses:(state,action)=>{
            state.completedLectures=action.payload
        },
        updateCompletedLectures:(state,action)=>{
            state.completedLectures=action.payload
        },
    },
})
export const{
    setCompletedCourses,setCourseSectionData,setEntireCourseData,setTotalNoOfLectures,updateCompletedLectures
}=viewCourseSlice.actions
export  default viewCourseSlice.reducer
