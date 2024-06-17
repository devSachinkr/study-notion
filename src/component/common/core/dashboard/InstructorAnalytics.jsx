import React, { useState } from 'react'
import { Chart,registerables } from 'chart.js';
import {Pie} from "react-chartjs-2" 
Chart.register(...registerables)
const InstructorAnalytics = ({courseData}) => {
    const [currChart,setCurrChart]=useState("students");
    const getRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0 ; i<numColors;i++){
            const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color)
        } 
        return colors;
    }
    // create data for chart displaying 
    const chartDataForStudent={
        labels:courseData?.map((course)=>course.courseName),
        datasets:[
            {
               data:courseData?.map((course)=>course?.totalStudentEnrolled),
               backgroundColor:getRandomColors(courseData?.length)
            }
        ]
    }
    const chartDataForIncome={
        labels:courseData?.map((course)=>course.courseName),
        datasets:[
            {
                data:courseData?.map((course)=>course.totalAmount),
                backgroundColor:getRandomColors(courseData?.length)
            }
        ]

    }

    const options={

    };
  return (
    <div>
        <p>Visualise</p>
        <div>
            <button onClick={()=>setCurrChart("students")}>Student</button>
            <button onClick={()=>setCurrChart("income")}>Income</button>
        </div>
        <div className='w-[60vw] h-[60vh]'>
            <Pie
            data={currChart==="students"?chartDataForStudent:chartDataForIncome}
            options={options}
            className=''
           width={50}
           height={50}
            />
        </div>
    </div>
  )
}

export default InstructorAnalytics