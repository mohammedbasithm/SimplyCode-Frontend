import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminAuth from '../Component/Authorisation/AdminAuth'
import Dashboard from '../pages/AdminSide/Dashboard'
import Studentslist from '../pages/AdminSide/Studentlist'
import Error from '../Component/ErrorPage/Error'
import TeacherRequest from '../pages/AdminSide/TeacherRequest/TeacherRequest'
import ProfileCard from '../pages/AdminSide/TeacherList/TeacherList'
import TeacherProfile from '../pages/AdminSide/TeacherList/TeacherProfile/TeacherProfile'
import Allcourse from '../pages/AdminSide/AllCourse/Allcourse'
import CourseDetailsAdmin from '../pages/AdminSide/AllCourse/CourseDetailsAdmin'
function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route element={<AdminAuth />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/students-list' element={<Studentslist />} />
          <Route path='/teacher-request' element={<TeacherRequest />} />
          <Route path='/teacher-list' element={<ProfileCard />} />
          <Route path='/teacher-profile/:id' element={<TeacherProfile />} />
          <Route path='/allcourse' element={<Allcourse />} />
          <Route path='/coursedetails/:id' element={<CourseDetailsAdmin />} />
          <Route path='/*' element={<Error />} />
        </Route>

      </Routes>
    </>
  )
}

export default AdminRoutes
