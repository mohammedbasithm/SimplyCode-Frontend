import React from 'react'
import { Route,Routes } from 'react-router-dom'
import UploadClass from '../pages/TeacherSide/UploadCource/UploadClass'
import RunningClass from '../pages/TeacherSide/RunningClass'
import TeacherChat from '../pages/TeacherSide/TeacherChat'
import TeacherPayments from '../pages/TeacherSide/TeacherPayments'
import AdditionalDetails from '../pages/TeacherSide/AdditionalDetails'
import TeacherDashbord from '../pages/TeacherSide/TeacherDashbord/TeacherDashbord'
import TeacherProfile from '../pages/TeacherSide/TeacherProfile/TeacherProfile'
import TeacherAuth from '../Component/Authorisation/TeacherAuth'
import Error from '../Component/ErrorPage/Error'
import CourseDetails from '../pages/TeacherSide/UploadCource/CourseDetails'
function TeacherRoutes() {
  return (
    <>
      <Routes>
        <Route element={<TeacherAuth allows={true}/>}>
          <Route path='/' element={<TeacherDashbord/>}/>
          <Route path='/uploadclass' element={<UploadClass/>}/>
          <Route path='/runningclass' element={<RunningClass/>}/>
          <Route path='/teacherchat' element={<TeacherChat/>}/>
          <Route path='/teacherpayments' element={<TeacherPayments/>}/>
          <Route path='/additionalinformations' element={<AdditionalDetails/>}/>
          <Route path='/teacherprofile' element={<TeacherProfile/>}/>
          <Route path='/coursedetails/:id' element={<CourseDetails/>}/>
        </Route>
        <Route path='/*' element={<Error/>}/>
      </Routes>
    </>
  )
}

export default TeacherRoutes
