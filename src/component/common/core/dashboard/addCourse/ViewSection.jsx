import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiMenuAddLine } from "react-icons/ri";
import { ImPencil2 } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../../ConfirmationModal"; 
import { IoMdArrowDropdown } from "react-icons/io";
import { deleteSection } from "../../../../../services/operations/authApi";
import { setCourse } from "../../../../../slices/courseSlice";
import Iconbutton from "../../../Iconbutton";
import SubSectionModal from "./SubSectionModal";
import {MdEdit, MdTrendingUp} from "react-icons/md"
import {GiBookmarklet} from "react-icons/gi"
import { deleteSubSection } from "../../../../../services/operations/authApi";
const ViewSection = ({ handleChangeEditName, setEditSection,IoMdAddCircleOutline }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubsection, setAddSubSection] = useState(false);
  const [viewSubsection, setViewSubSection] = useState(null);
  const [editSubsection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationaModal] = useState(false);

  const [loading, setLoading] = useState(false);
  if (loading) {
    return <div className="spinner"></div>;
  }
  const deleteSectionId = async (sectionId) => {
    setLoading(true);
    const result = await deleteSection({
      token,
      sectionId,
      courseId: course._id,
    });
    if (result) {
      dispatch(setCourse(result?.data));
      setEditSection(false);
    }
    setConfirmationaModal(false)
    setLoading(false);
  };
  const deleteSubSectionId=async(sectionId,subSectionId)=>{
    setLoading(true)
    const result=await deleteSubSection({
      token,
      id:sectionId,
      sectionId:subSectionId
    })
    const updateSectionContent=course.courseContent.map((section)=>section._id===sectionId ?result?.data:section)
    const updateCourseData={...course,courseContent:updateSectionContent}
    dispatch(setCourse(updateCourseData))
    setConfirmationaModal(false)
    setLoading(false)
  } 
  return (
    <div>
      <div>
        {course.courseContent.map((section) => (
          <details key={section._id}  className="flex justify-between mx-8 mb-4" >
            <summary >
              <div className="flex justify-between ">
                <div className="flex gap-x-2 items-center">
                  <RiMenuAddLine className="text-[1.4rem]" />
                  <p>{section.name}</p>
                </div>
                <div className="flex gap-x-2 items-center"> 
                  <button
                    onClick={() =>
                      handleChangeEditName(section._id, section.name)
                    }
                  >
                    <ImPencil2 className="text-[1.3rem]" />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationaModal({
                        text1: "Delete this Section",
                        text2: "All the lecture in this section will deleted",
                        btnText: "Delete",
                        btnText2: "cancel",
                        handler1: () => deleteSectionId(section._id, course._id),
                        handler2:()=> setConfirmationaModal(null),
                      })
                    }
                  >
                    <RiDeleteBin6Line
                      className="text-[1.3rem]"
                
                    />
                  </button>
                  <p className="text-[1.3rem]">|</p>
                  <div>
                    <IoMdArrowDropdown className="text-[1.5rem]" />
                  </div>
                </div>
              </div>
            </summary>
            <div>
              {section.subSection.map((data) => (
                <div key={data?._id} onClick={()=>setViewSubSection(data)} className="flex w-full justify-between px-6 mt-2">
                  <div className="flex gap-x-2 items-center">
                    <GiBookmarklet className="text-[1.4rem]" />
                    <p >{data.title}</p>
                  </div>
                  <div  
                  onClick={(e)=>e.stopPropagation()}
                  className="flex gap-x-2 items-center text-[1.3rem]">
                    <button onClick={()=> setEditSubSection({...data,id:section._id})}>
                      <MdEdit/>
                    </button>

                    <button
                      onClick={() =>
                        setConfirmationaModal({
                          text1: "Delete this Lecture",
                          text2: "Are you sure to delete lecture ",
                          btnText: "Delete",
                          btnText2: "cancel",
                          handler1: () => deleteSubSectionId(section._id,data._id),
                          handler2: () => setConfirmationaModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center" onClick={()=>setAddSubSection(section._id)}>
         
            <IoMdAddCircleOutline className="text-yellow-50 font-bold text-[1.3rem] cursor-pointer" />
            <Iconbutton
              btnText={"Add Lecture"}
              customClasses={
                "p-1  font-semibold text-[1rem] text-yellow-50"
              }
            />
            </div>
          </details>
        ))}
      </div>
      {

      addSubsection?(<SubSectionModal
        modalData={addSubsection}
        setModalData={setAddSubSection}
        add={true}
      />):viewSubsection?(<SubSectionModal
        modalData={viewSubsection}
        setModalData={setViewSubSection}
        view={true}
      />):editSubsection?(<SubSectionModal
        modalData={editSubsection}
        setModalData={setEditSubSection}
        edit={true}
      />):(<div></div>)
       
      }
      {
        confirmationModal?(<ConfirmationModal data={confirmationModal}/>):("")
      }
    </div>
  );
};

export default ViewSection;
