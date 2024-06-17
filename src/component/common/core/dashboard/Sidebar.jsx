import React, { useState } from "react";
import { sidebarLinks } from "../../../../data/dashboard-links";
import { logout } from "../../../../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import SideBarLink from "./SideBarLink";
import { useNavigate } from "react-router-dom";
import  {VscSignOut} from "react-icons/vsc"
import ConfirmationModal from "../../ConfirmationModal";
const Sidebar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [confirmationModal,setConfirmationModal]=useState(null);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  if (authLoading || profileLoading) {
    return <div className="spinner"></div>;
  }
  return (
    <>
      <div className=" text-richblack-300 flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return;
            return <SideBarLink link={link} key={link.id} />;
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>
        <div className="flex flex-col">
          <SideBarLink
            link={{ id:7, name: "Settings", path: "/dashboard/settings", icon:"VscSettingsGear"}}
          />
          <button onClick={()=>setConfirmationModal({
            text1:"Are You Sure ?",
            text2:"You will be looged out of your Account",
            btnText:"Logout",
            btnText2:"Cancel",
            handler1:()=> dispatch(logout(navigate)),
            handler2:()=> setConfirmationModal(null),
          })}
          className="text-sm font-medium text-richblack-300">
            <div className="flex items-center gap-x-2 px-10 pt-5">
            <VscSignOut className=" text-lg"/>
            <span>Logout</span>
            </div>
          </button>
        </div>
   {confirmationModal && <ConfirmationModal data={confirmationModal}/>}
      </div>

    </>
  );
};

export default Sidebar;
