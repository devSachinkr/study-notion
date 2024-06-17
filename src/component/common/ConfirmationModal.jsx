import React from "react";
import Iconbutton from "./Iconbutton";
const ConfirmationModal = ({ data }) => {
  return (
    <div className={data?.position}>
      {data && (
        <div
          className={
            "p-4 w-[23vw] flex-wrap bg-richblack-800 rounded-md border-[1px] border-richblack-5"
          }
        >
          <p className={`text-[1.5rem] ${data.classHeader}`}>{data?.text1}</p>
          <p className="mt-2 text-richblack-400">{data?.text2}</p>
          <div className="flex items-center gap-x-3 mt-3">
            <Iconbutton
              btnText={data?.btnText}
              onclick={data?.handler1}
              type={data?.type}
              disable={true}
              customClasses={`${data?.customClasses} text-richblack-900 p-1 px-2 font-bold rounded-md`}
            />
            <button
              onClick={data?.handler2}
              className="text-richblack-900  bg-richblack-600 p-1 px-2 font-bold rounded-md"
            >
              <span className="px-2">{data?.btnText2}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
