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

function UserRoutes() {
  return (
    <>
        <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route element={<BackAuth/>}>
              <Route exact path="/login" element={<SignIn/>}></Route>
            </Route>
            <Route exact path="/signup" element={<SignUp/>}></Route>
            <Route exact path="/aboutus" element={<AboutUs/>}></Route>
            <Route exact path="/blog" element={<Blog/>}></Route>
            <Route exact path="/course" element={<Course/>}></Route>
            <Route exact path="/forgot-password" element={<ForgetPassword/>}></Route>
            <Route exact path="/reset-password" element={<ResendPassword/>}></Route>
            <Route path="/userprofile" element={<UserProfile/>}/>
            
            <Route path="/*" element={<Error/>}/>
        </Routes>
    </>
  )
}

export default UserRoutes
