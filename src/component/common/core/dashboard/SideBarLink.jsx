import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, matchPath, useLocation } from 'react-router-dom'
const SideBarLink = ({link}) => {
    const Icon = Icons[link.icon]
    const loaction =useLocation();
    const matchRoute=(route)=>{
        return matchPath({path:route},loaction.pathname)
    }
  return (
    <NavLink to={link.path} className={`relative px-8 py-2 ${matchRoute(link.path)?"bg-yellow-800":"bg-opacity-0"}`}>
     <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-5 ${matchRoute(link.path)? "opacity-full":"opacity-0"} `}></span>
     <div className='flex items-center gap-x-2'>
        {/* <Icon className="text-lg"/> */}
        <span>{link.name}</span>
     </div>
    </NavLink>
  )
}

export default SideBarLink
