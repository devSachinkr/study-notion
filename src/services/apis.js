const BASE_URL=process.env.REACT_APP_BASE_URL;
console.log(BASE_URL)
export const categories={
    CATEGORIES_API:BASE_URL+"/course/showAllCategory"
}  
export const endpoints={
    // lOGIN API'S
    LOGIN_API:BASE_URL+"/auth/login",
    SIGNUP_API:BASE_URL+"/auth/signup",
    SENDOTP_API:BASE_URL+"/auth/sendotp",
    RESETPASSWORDTOKEN_API:BASE_URL+"/profile/reset-password-token",
    RESETPASSWORD_API:BASE_URL+"/profile/reset-password",
    FORM_API:BASE_URL+"/auth/form-submit",
    ENROLLEDCOURSES_API:BASE_URL+"/profile/getEnrolledCourses",
    GETUSERDETAILS_API:BASE_URL+"/profile/getUserDetails",
    DISPLAYPICTURE_API:BASE_URL+"/profile/updateDisplayPicture",
    UPDATEPROFILE_API:BASE_URL+"/profile/updateProfile",
    UPDATEPASSWORD_API:BASE_URL+"/auth/changePassword",
    DELETEPROFILE_API:BASE_URL+"/profile/deleteProfile",
    SHOWALLCATEGORIES_API:BASE_URL+"/course/showAllCategories",
    UPDATECOURSEDETAILS_API:BASE_URL+"/course/updateCourse",
    CREATENEWCOURSE_API:BASE_URL+"/course/createCourse",
    CREATESECTION_API:BASE_URL+"/course/addSection",
    UPDATESECTION_API:BASE_URL+"/course/updateSection",
    DELETESECTION_API:BASE_URL+"/course/deleteSection",
    CREATESUBSECTION_API:BASE_URL+"/course/addSubSection",
    EDITSUBSECTION_API:BASE_URL+"/course/update-sub-section",
    DELETESUBSECTION_API:BASE_URL+"/course/delete-sub-section",
    GETINSTRUCTORCOURSES_API:BASE_URL+"/course/instructorCourse",
    DELETECOURSE_APT:BASE_URL+"/course/deleteCourse",
    GETINSTRUCTORCOURSEDETAILS_API:BASE_URL+"/course/getCourseDetails",
    UPDATECOURSETHUMBNAIL_API:BASE_URL+"/course/updateThumbnail",
    GETALLCATEGORIES_API:BASE_URL+"/course/showAllCategories",
    GETCATEGORYPAGEDETAILS_API:BASE_URL+"/course/getCategoryPageDetails",
    GETCOURSEDETAILS_API:BASE_URL+"/course/getCourseDetails",
    GET_ALL_COURSEDETAILS_API:BASE_URL+"/course/instructor-courses",
    GETCOURSEDETAILSWITHOUTLOGIN_API:BASE_URL+"/course/getCourseDetail",
    GET_INSTRUCTOR_DASHBOARD_DATA_API:BASE_URL+"/profile/instructor-dashboard",
    // PAYEMTS API'S 
    PAYMENTCAPYURE_API:BASE_URL+"/payment/capturePayment",
    VERIFYSIGNATURE_API:BASE_URL+"/payment/verifySignature",
    PAYMENTSUCCESSEMAIL:BASE_URL+"/payment/sendPaymentEmail",
    // Ratings & Reviews API's
    CREATERATINGANDREVIEW:BASE_URL+"/course/createRating",
    GET_ALL_RATINGS_AND_REVIEWS_API:BASE_URL+"/course/getReviews",
    // Mark As Completed     
    UPDATE_COURSE_PROGRESS_API:BASE_URL+"/course/update-course-progress"
}