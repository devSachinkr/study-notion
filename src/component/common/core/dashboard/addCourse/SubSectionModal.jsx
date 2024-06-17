import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection } from "../../../../../services/operations/authApi";
import { deleteSubSection } from "../../../../../services/operations/authApi";
import { editSubSection } from "../../../../../services/operations/authApi";
import { RxCross2 } from "react-icons/rx";
import Iconbutton from "../../../Iconbutton";
import { setCourse } from "../../../../../slices/courseSlice";
const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    setValue,
    getValue,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  useEffect(() => {
    if (view || edit) {
      setValue("title", modalData.title);
      setValue("description", modalData.description);
      setValue("video", modalData.video);
    }
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }
  const isFormUpdated = () => {
    const currentValues = getValue();
    if (
      currentValues.title !== modalData.title ||
      currentValues.description !== modalData.description ||
      currentValues.video !== modalData.video
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handelEditSubSection = async (data) => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("id", modalData.id);
    formData.append("sectionId", modalData._id);
    formData.append("token", token);
    if (currentValues.title !== modalData.title) {
      formData.append("title", currentValues.title);
    }

    if (currentValues.description !== modalData.description) {
      formData.append("description", currentValues.description);
    }

    if (currentValues.video !== modalData.video) {
      formData.append("video", currentValues.video);
    }
    setLoading(true);
    const result = await editSubSection(formData);
    console.log(result);
    console.log("id : ", modalData.id);
    const updateSectionContent = course.courseContent.map((section) =>
      section._id === modalData.id ? result?.data : section
    );
    const updatedCourseContent = {
      ...course,
      courseContent: updateSectionContent,
    };
    console.log(updatedCourseContent);
    dispatch(setCourse(updatedCourseContent));
    setModalData(null);
    setLoading(false);
  };
  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpdated) {
        toast.error("No Changes made to the form");
      } else {
        handelEditSubSection(data);
      }
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("video", data.video[0]);
    formData.append("sectionId", modalData);
    formData.append("token", token);
    setLoading(true);
    console.log("video", data.video);
    const result = await createSubSection(formData);
    const updateSectionContent = course.courseContent.map((section) =>
      section._id === modalData ? result?.updatedSection : section
    );

    const updateCourseContent = {
      ...course,
      courseContent: updateSectionContent,
    };
    dispatch(setCourse(updateCourseContent));
    setModalData(null);
    setLoading(false);
  };
  return (
    <div>
      <div className="flex items-center ">
        <p>
          {view && "Viewing "} {edit && "Edit "} {add && "Add "}Lecture
        </p>
        <span
          className="cursor-pointer"
          onClick={() => (!loading ? setModalData(null) : {})}
        >
          <RxCross2 />
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <p>
              Video <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="file"
              {...register("video", { required: true })}
              className="w-full"
            />
          </label>
          {errors.video && (
            <span>
              Video is required <sup className="text-pink-200">*</sup>
            </span>
          )}
          <label>
            <p>
              Title <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              placeholder="Enter Title"
              className="w-full mb-2"
            />
          </label>
          {errors.video && (
            <span>
              Title is required <sup className="text-pink-200">*</sup>
            </span>
          )}
          <label>
            <p>
              Enter Description <sup className="text-pink-200">*</sup>
            </p>
            <textarea
              name="description"
              id="description"
              cols="10"
              rows="5"
              className="w-full"
              {...register("description", { required: true })}
              placeholder="Enter Description"
            ></textarea>
            {errors.description && (
              <span>
                {" "}
                Description is required <sup className="text-pink-200">*</sup>
              </span>
            )}
          </label>
          <div className="flex justify-end">
            {!view && (
              <div>
                <Iconbutton
                  btnText={
                    loading ? (
                      <div className="spinner"></div>
                    ) : add ? (
                      "Save"
                    ) : edit ? (
                      "Save Changes"
                    ) : (
                      ""
                    )
                  }
                  customClasses={
                    " bg-yellow-50 font-bold flex items-center p-1 px-2 text-richblack-800 rounded-md"
                  }
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubSectionModal;
