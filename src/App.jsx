import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./component/common/Navbar";
import ForgetPassword from "./pages/ForgetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact";
import MyProfile from "./pages/dashboard/MyProfile.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import PrivateRoute from "./component/common/core/Auth/PrivateRoute.jsx";
import Error from "./pages/Error.jsx";
import EnrolledCourses from "./pages/dashboard/EnrolledCourses.jsx";
import Settings from "./pages/dashboard/Settings.jsx";
import Cart from "./component/common/core/dashboard/cart/index.jsx";
import AddCourse from "./pages/dashboard/addcourse/AddCourse.jsx";
import MyCourses from "./pages/dashboard/MyCourses.jsx";
import { useSelector } from "react-redux";
import EditCourse from "./component/common/EditCourse.jsx";
import Catalog from "./pages/Catalog.jsx";
import Courses from "./pages/Courses.jsx";
import ViewCourse from "./pages/dashboard/addcourse/ViewCourse.jsx";
import WatchCourseVideo from "./pages/WatchCourseVideo.jsx";
import InstructorDashboard from "./pages/dashboard/InstructorDashboard.jsx";
const App = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<Courses />} />
        <Route
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/my-profile"
          element={
            <PrivateRoute>
              {" "}
              <MyProfile />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/enrolled-courses"
          element={
            <PrivateRoute>
              {" "}
              <EnrolledCourses />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              {" "}
              <Settings />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/cart"
          element={
            <PrivateRoute>
              {" "}
              <Cart />{" "}
            </PrivateRoute>
          }
        />
        {user?.accountType === "Instructor" && (
          <>
            <Route
              path="/dashboard/add-course"
              element={
                <PrivateRoute>
                  {" "}
                  <AddCourse />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/my-courses"
              element={
                <PrivateRoute>
                  {" "}
                  <MyCourses />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/editCourse/:courseId"
              element={
                <PrivateRoute>
                  {" "}
                  <EditCourse />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/instructor"
              element={
                <PrivateRoute>
                  {" "}
                  <InstructorDashboard />{" "}
                </PrivateRoute>
              }
            />
          </>
        )}
            {user?.accountType === "Student" &&(
           <>
              <Route path="/view-lecture/:courseId" element={
                <PrivateRoute>
                  <ViewCourse/>
                </PrivateRoute>
              }/>
              <Route path="/view-lecture/:courseId/:sectionId/:subSectionId" element={
                <PrivateRoute>
                  <WatchCourseVideo/>
                </PrivateRoute>
              }/>
              </>
            )}
        {/**/}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
