import React from "react";
import {BiEdit} from "react-icons/bi"
const Iconbutton = ({
  btnText,
  onclick,
  type,
  disable,
  customClasses,
  isIcon,
  disabled
}) => {
  return (
    <button disabled={disabled} onClick={onclick} type={type}  className={`${disable?"bg-yellow-50":""} ${customClasses} cursor-pointer flex justify-center w-fit`}>
            <div className="flex items-center gap-x-2 w-full justify-center">
           <span>{btnText} </span>
           <span>{isIcon?<BiEdit/>:""}</span>
            </div>
       
    </button>
  );
};

export default Iconbutton;
