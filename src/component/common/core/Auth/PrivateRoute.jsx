import React  from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import Iconbutton from '../../Iconbutton'

const PrivateRoute = ({children}) => {
    const  navigate=useNavigate();
    const {token}=useSelector((state=>state.auth))
    if(token!==null){
      return children
    }else{
        return(
            <div>
               <Iconbutton btnText={"Login First"}
                disable={true}
                onclick={()=>navigate("/login")}
               />
            </div>
        )
    }

}

export default PrivateRoute
