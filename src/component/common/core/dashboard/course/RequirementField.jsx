import React, { useEffect } from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
const RequirementField = ({
  name,
  label,
  register,
  setValue,
  getValue,
  errors,
}) => {
  const [requirements, setRequirements] = useState("");
  const [list, setList] = useState([]);
  const addInList = () => {
    if (requirements) {
      setList([...list, requirements]);
      setRequirements("");
    }
  };
  const handelRemove = (idx) => {
    const updaterequirementList = [...list];
    updaterequirementList.splice(idx, 1);
    setList(updaterequirementList);
  };
  useEffect(() => {
    register(name,{required:true});
  });
  useEffect(() => {
    setValue(name, list);
  }, [list]);
  return (
    <div>
      <label>
        <p>
          {label} <sup className=" text-pink-200">*</sup>
        </p>
        <div>
          <input
            type="text"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
            id={name}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder={`Enter ${label}`}
          />
          <button
            onClick={addInList}
            type="button"
            className="text-bold bg-yellow-50 p-2 text-richblack-800"
          >
            Add
          </button>
        </div>
      </label>
      {list.length > 0 && (
        <ul>
          {list.map((item, idx) => (
            <li key={idx}>
              {" "}
              <span>{item} </span>
              <button type="button" onClick={()=>handelRemove(idx)} >
                <RxCross2 title="clear"/>
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && <span>{`${label} is required`}</span>}
    </div>
  );
};

export default RequirementField;
