import React from 'react'
import signupImage from "../assets/signup.png"
import Template from '../component/utils/Template'
const Signup = () => {
  return (
           <Template
            title={"Join the millions learning to code with StudyNotion for free"}
            desc1={"Build skills for today, tomorrow, and beyond."}
            desc2={" Education to future-proof your career."}
            formType="signup"
            image={signupImage}
         />
  )
}

export default Signup
