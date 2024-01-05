import React from 'react'
import TeacherNav from '../../../Component/Navbar/TeacherNav'
import { useParams } from 'react-router-dom'
import AboutCourse from './AboutCourse';

const CourseDetails = () => {
  const { id } = useParams();
  return (
    <>
      <TeacherNav />
      <AboutCourse id={id} />
    </>
  )
}

export default CourseDetails
