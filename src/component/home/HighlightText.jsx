import React from 'react'

const HighlightText = ({text}) => {
  return (
         <span className='font-bold text-transparent bg-clip-text bg-gradient-to-bl from-blue_gradient-50 via-blue_gradient-25 to-blue_gradient-5'>
         {" "}
         {text}
         </span>
  )
}

export default HighlightText
