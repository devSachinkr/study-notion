import React from 'react'
import HighlightText from '../../home/HighlightText'
import Button from '../../home/Button'
const LearningSection = ({color}) => {
    const LearningsData=[
        {
           order:-1,
           heading:"World-Class Learning for",
           highlight:"Anyone, Anywhere",
           desc:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
           btnText:"Learn More",
           link:"/"
        },
        {
           order:1,
           heading:"Curriculum Based on Industry Needs",
           desc:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
        },
        {
           order:2,
           heading:" Our Learning Methods",
           desc:"The learning process uses the namely online and offline."
        },
        {
           order:3,
           heading:"Certification",
           desc:"You will get a certificate that can be used as a certification during job hunting."
        },
        {
           order:4,
           heading:"Rating \"Auto-grading\"",
           desc:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
        },
        {
           order:5,
           heading:"Ready to Work",
           desc:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
        },
    ]
  return (
    <div className='grid mx-auto grid-cols-1 mt-20 lg:grid-cols-4 mb-10 w-11/12  max-w-maxContent  justify-between'>
          {
            LearningsData.map((card,idx)=>(
                <div 
                key={idx}
                className={`${idx==0 &&"lg:col-span-2"}
                 ${card.order%2===0?"bg-richblack-800":"bg-richblack-700"}
                 ${card.order===3 && "lg:col-start-2"}
                 ${card.order<0 && "bg-transparent "}
                `}
                >
                {
                    card.order<0?(
                       
                            <div className='w-[75%] pl-16'>
                            <div className='flex flex-col text-3xl'>
                                {card.heading}
                                <HighlightText text={card.highlight}/>
                            </div>
                                <p className='mt-3 text-richblack-300'>{card.desc}</p>
                                <div className='w-[150px] mt-10'>
                                 <Button active={true} linkto={card.link}>
                                        {card.btnText}
                                 </Button>
                                 </div>
                            </div>
                      
                    ):(
                         <div className='pt-8 pl-8 lg:h-[250px] pr-8'>
                            <h1>{card.heading}</h1>
                            <p className='mt-10'>{card.desc}</p>
                    </div>
                    )
                }
                </div>
            ))
          }
    </div>
  )
}

export default LearningSection
