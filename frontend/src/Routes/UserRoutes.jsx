import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/UserSide/Home/Home";
import SignIn from "../pages/UserSide/SignIn/SignIn";
import SignUp from '../pages/UserSide/Signup/SignUp'
import AboutUs from "../pages/UserSide/AboutUs/AboutUs";
import Blog from "../pages/UserSide/Blog/Blog";
import Course from "../pages/UserSide/Course/Course";
import ForgetPassword from "../pages/UserSide/SignIn/ForgotPassword";
import ResendPassword from "../pages/UserSide/SignIn/ResendPassword";
import Error from "../Component/ErrorPage/Error";
import UserProfile from "../pages/UserSide/UserProfile/UserProfile";
import BackAuth from "../Component/Authorisation/BackAuth";
import ChapterCourse from "../pages/UserSide/Course/ChapterCourse";
import SuccessPayments from "../pages/UserSide/UserPayments/SuccessPayments";
import MyCourse from "../pages/UserSide/UserProfile/MyCourse";
// import ChatPage from "../Component/Chat/ChatPage";
import Chat from "../Component/Chat/Chat";
import CourseDetails from "../pages/UserSide/Course/CourseDetails";
import BlogDetailsUser from "../pages/UserSide/Blog/BlogDetailsUser";
function UserRoutes() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route element={<BackAuth />}>
          <Route exact path="/login" element={<SignIn />}></Route>
        </Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/aboutus" element={<AboutUs />}></Route>
        <Route exact path="/blog" element={<Blog />}></Route>
        <Route exact path="/course" element={<Course />}></Route>
        <Route exact path="/forgot-password" element={<ForgetPassword />}></Route>
        <Route exact path="/reset-password" element={<ResendPassword />}></Route>
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/user-coursedetails/:id" element={<CourseDetails />} />
        <Route exact path="/success" element={<SuccessPayments />} />
        <Route path="/mycourse" element={<MyCourse />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="blogdetails/:id" element={<BlogDetailsUser />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  )
}

export default UserRoutes
