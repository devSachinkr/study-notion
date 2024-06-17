import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
// import {resetCard} from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnect";
import { endpoints } from "../apis";

const {
  LOGIN_API,
  SIGNUP_API,
  SENDOTP_API,
  RESETPASSWORDTOKEN_API,
  RESETPASSWORD_API,
  ENROLLEDCOURSES_API,
  GETUSERDETAILS_API,
  DISPLAYPICTURE_API,
  UPDATEPROFILE_API,
  UPDATEPASSWORD_API,
  DELETEPROFILE_API,
  SHOWALLCATEGORIES_API,
  UPDATECOURSEDETAILS_API,
  CREATENEWCOURSE_API,
  CREATESECTION_API,
  UPDATESECTION_API,
  DELETESECTION_API,
  CREATESUBSECTION_API,
  EDITSUBSECTION_API,
  DELETESUBSECTION_API,
  GETINSTRUCTORCOURSES_API,
  DELETECOURSE_APT,
  GETINSTRUCTORCOURSEDETAILS_API,
  UPDATECOURSETHUMBNAIL_API,
  GETALLCATEGORIES_API,
  GETCATEGORYPAGEDETAILS_API,
  GETCOURSEDETAILS_API,
  GETCOURSEDETAILSWITHOUTLOGIN_API,
  CREATERATINGANDREVIEW,
  UPDATE_COURSE_PROGRESS_API,
  GET_ALL_RATINGS_AND_REVIEWS_API,
  GET_INSTRUCTOR_DASHBOARD_DATA_API,
  GET_ALL_COURSEDETAILS_API
} = endpoints;
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("OTP send res", res);
      // console.log(res.data.success);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (err) {
      console.log("Failed To Send OTP", err.message);
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function signup(
  firstName,
  lastName,
  password,
  confirmPassword,
  accountType,
  otp,
  email,
  navigate
) {
  return async (dispatch) => {
    const toastID = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      const res = await apiConnector("POST", SIGNUP_API, {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        accountType,
        otp,
      });
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success("Sign Up Successfully");
      navigate("/login");
    } catch (err) {
      console.log("Failed to sign up", err);
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastID);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Login Successfully");
      dispatch(setToken(res.data.token));
      const userImage = res.data?.validUser?.image
        ? res.data?.validUser?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${res.data?.validUser?.firstName}${res.data?.validUser?.lastName}`;
      dispatch(setUser({ ...res.data.validUser }, { image: userImage }));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data?.validUser));
      navigate("/dashboard/my-profile");
    } catch (err) {
      console.log("Login Api Error", err.message);
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(setCart(null))
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Looged Out");
    navigate("/");
    dispatch(setLoading(false));
  };
}
export function resetPasswordToken(email, setSendMail) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      console.log(RESETPASSWORDTOKEN_API);
      const res = await apiConnector("POST", RESETPASSWORDTOKEN_API, {
        email,
      });
      console.log("Password Token res", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success("Reset Mail Send");
      setSendMail(true);
    } catch (err) {
      // console.log(err.data.response.message);
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const res = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      console.log("open");
      console.log("resset pass res", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success("Password Reset Successfully");
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export async function getEnrolledCourses(token) {
  let result = [];
  try {
    const res = await apiConnector("GET", ENROLLEDCOURSES_API, null, {
      Authorisation: `Bearer ${token}`,
    });
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    result = res.data.data;
  } catch (err) {
    console.log(err.message);
    toast.error(err.response.data.message);
  }
  return result;
}

export function updateDisplayPic(dp) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await apiConnector("PUT", DISPLAYPICTURE_API, { dp });
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success("Profile Pic  Updated successfully");
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
export async function udpateProfieData(
  gender,
  dateOfbirth,
  about,
  contactNumber,
  token
) {
    try {
      console.log(gender, dateOfbirth, about, contactNumber);
      const res = await apiConnector(
        "PUT",
        UPDATEPROFILE_API,
        {
          gender,
          dateOfbirth,
          about,
          contactNumber,
        },
        {
          Authorisation: `Bearer ${token}`,
        } 
      );
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      console.log(res)

      toast.success("Profile Updated Successfully");
      return res?.data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
}

export function updatePassword(currentPassword, changePassword, token) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await apiConnector("POST", UPDATEPASSWORD_API, {
        currentPassword,
        changePassword,
        token,
      });
      if (res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Password Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

    dispatch(setLoading(false));
  };
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await apiConnector("DELETE", DELETEPROFILE_API, { token });
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success("Profile deleted Successfully");
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export async function showAllCategorie(token) {
  try {
    const res = await apiConnector("GET", SHOWALLCATEGORIES_API,null, {
        Authorisation: `Bearer ${token}`,
      });
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res?.data?.allCategory;
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message);
  }
}

export async function updateCourseDeatils( formData) {
  try {
    const res = await apiConnector("POST", UPDATECOURSEDETAILS_API,formData);
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res?.data;
  } catch (err) {
    console.log(err);
    toast.error(err.res.data.message);
  }
}

export async function createNewCourse(formdata) {
  try {
    const res = await apiConnector("POST", CREATENEWCOURSE_API, formdata);  
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    toast.success("Course Details Added successfully")
    return res?.data;
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message);
  }
}

export async function createSection(formData){
  try{
    const res=await apiConnector("POST",CREATESECTION_API,formData);
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    toast.success("Section Added successfully");
    return res?.data;
  }catch(err){
    console.log(err);
    toast.error(err.response.data.message);
  }
}

export async function updateSection(formData){
  try{
     const res=await apiConnector("POST",UPDATESECTION_API,formData)
     if (!res.data.success) {
      throw new Error(res.data.message);
    }
    toast.success("Section Updated successfully");
    return res?.data;
  }catch(err){
    console.log(err);
    toast.error(err.response.data.message);
}
}

export async function deleteSection(data){
  try{
  const res=await apiConnector("DELETE",DELETESECTION_API,data)
  if (!res.data.success) {
    throw new Error(res.data.message);
  }
  toast.success("Section Deleted successfully");
  return res?.data;
  }catch(err){
    console.log(err);
    toast.error(err.response.data.message);
  }
}

export async function createSubSection (data){
  try{
    const res=await apiConnector("POST",CREATESUBSECTION_API,data);
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    toast.success("Sub Section Created  successfully");
    return res?.data;
  }catch(err){
    console.log(err);
    toast.error(err.response.data.message);
  }
}

export async function editSubSection (data){
  try{
    const res=await apiConnector("PUT",EDITSUBSECTION_API,data);
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    toast.success("Sub Section Updated  successfully");
    return res?.data;
  }catch(err){
    console.log(err);
    toast.error(err.response.data.message);
  }
}
export async function deleteSubSection (data){
  try{
    const res=await apiConnector("DELETE",DELETESUBSECTION_API,data);
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    toast.success("Sub Section Deleted  successfully");
    return res?.data;
  }catch(err){
    console.log(err);
    toast.error(err.response.data.message);
  }
}

export async function instructorCourses(token){
  try{
     const res=await apiConnector("POST",GETINSTRUCTORCOURSES_API, {token})
     if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res?.data;
  }catch(err){
    console.log(err);
    toast.error(err.response.data.message);
  }
}

export async function deleteInstructorCourse(token,courseId){
  try{
     const res=await apiConnector("DELETE",DELETECOURSE_APT,{token,courseId})
     if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res?.data;
  }catch(err){
    console.log(err);
    toast.error(err.response.data.message);
  }
}


export async function getInstructorCourseDetails(token,courseId){
  try{
    const res=await apiConnector("POST",GETINSTRUCTORCOURSEDETAILS_API,{token,courseId})
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res?.data;
  }catch(err){
    console.log(err);
    toast.error(err.response.data.message);
  }
}

export async function updateCourseThumbnail(formData){
  try{
     const res=await apiConnector("POST",UPDATECOURSETHUMBNAIL_API,formData)
     if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res?.data;
  }catch(err){
    console.log(err);
    toast.error(err.response.data.message);
  }
}

export async function getAllCategories(){
   try{
    const res=await apiConnector("GET",GETALLCATEGORIES_API)
    if(!res?.data?.success){
      throw new Error(res?.data?.message)
    }
    return res?.data
   }catch(err){
    console.log(err.message)
    toast.error(err.response.data.message)
   }
}

export async function getCategoryPageDetails(categoryId){
   try{
    const res=await apiConnector("POST",GETCATEGORYPAGEDETAILS_API,{categoryId})
    if(!res?.data?.success){
      throw new Error(res?.data?.message)
    }
    return res?.data
   }catch(err){
    console.log(err.response.data.message)
   }
}

export async function getCoursesDetails(token,courseId){
   try{
    const res=await apiConnector("POST",GETCOURSEDETAILS_API,{token,courseId})
    if(!res?.data?.success){
      throw new Error(res?.data?.message)
    }
    return res?.data
   }catch(err){
    console.log(err.response.data.message)
   }
  }

export async function getCoursesDetailWithoutLogin(courseId){
   try{
    const res=await apiConnector("POST",GETCOURSEDETAILSWITHOUTLOGIN_API,{courseId})
    if(!res?.data?.success){
      throw new Error(res?.data?.message)
    }
    return res?.data
   }catch(err){
    console.log(err.response.data.message)
   }
  }


export async function craeteRatingAndReviews(formData){
   try{
    const res=await apiConnector("POST",CREATERATINGANDREVIEW,formData)
    if(!res?.data?.success){
      throw new Error(res?.data?.message)
    }
    toast.success("Review Added")
    return res?.data
   }catch(err){
    toast.error(err?.response?.data?.message)
    console.log(err?.response?.data?.message)
   }
  }  

export async function markAsCompleted(token,courseId,subSectionId){
   try{
    const res=await apiConnector("POST",UPDATE_COURSE_PROGRESS_API,{token,courseId,subSectionId})
    if(!res?.data?.success){
      throw new Error(res?.data?.message)
    }
    toast.success("Lecture Marked")
    return res?.data
   }catch(err){
    console.log("first")
    toast.error(err?.response?.data?.message)
    console.log(err?.response)
   }
  }

export async function getAllRatingAndReviews(){
   try{
    const res=await apiConnector("GET",GET_ALL_RATINGS_AND_REVIEWS_API)
    if(!res?.data?.success){
      throw new Error(res?.data?.message)
    }
    return res?.data
   }catch(err){
    toast.error(err?.response?.data?.message)
    console.log(err?.response)
   }
  }

export async function instructorDashBoardData(token){
   try{
    const res=await apiConnector("POST",GET_INSTRUCTOR_DASHBOARD_DATA_API,{token})
    if(!res?.data?.success){
      throw new Error(res?.data?.message)
    }
    return res?.data
   }catch(err){
    toast.error(err?.response?.data?.message)
    console.log(err?.response)
   }
  }

export async function getUserDetails(token){
  try{
  const res=await apiConnector("GET",GETUSERDETAILS_API,null,{
    Authorisation: `Bearer ${token}`,
  })
  if(!res.data.success){
    throw new Error(res?.data?.message)
  }
  return res?.data

  }catch(err){
    toast.error(err?.response?.data?.message)
    console.log(err?.response)
  }
}


export async function getInstructorCourses(token){
  try{
  const res=await apiConnector("GET",GET_ALL_COURSEDETAILS_API,null,{
    Authorisation: `Bearer ${token}`,
  })
  if(!res.data.success){
    throw new Error(res?.data?.message)
  }
  return res?.data

  }catch(err){
    toast.error(err?.response?.data?.message)
    console.log(err?.response)
  }
}

