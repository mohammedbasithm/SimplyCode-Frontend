import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import PublicAxios from '../../../axios'
import { useSelector } from 'react-redux'
import Navigation from '../../../Component/Navbar/UserNav'
import { Footer } from '../../../Component/Footer'
import { useNavigate } from 'react-router-dom'
import { Image_URL } from '../../../constants/constans'

const MyCourse = () => {
  const isAuth = useSelector((state) => state.user)
  const user_id = isAuth.user_id
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const response = await PublicAxios.get('/user/mycourse', {
        params: {
          user_id: user_id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      setCourseData(response.data)
    }
    fetchData();
  }, [])
  return (
    <>
      <Navigation />

      <div className="pt-14 container mx-auto  border-gray-200 overflow-x-auto">
        <div className='bg-indigo-100 h-64 w-full flex justify-center items-center' style={{ borderBottomRightRadius: '75px' }}>
          <div className='text-blue-900 text-4xl font-bold'>My Course</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
          {courseData && courseData.map((course) => (
            <div key={course.id} className="p-4 bg-white rounded shadow-md">

              <img
                src={`${Image_URL}${course.cover_image}`}
                className="w-full rounded"
                alt="skilling banner"
              />
              <div className="p-4">
                <h6 className="text-xl font-bold">{course.title}</h6>
                <p className="text-sm">{course.instructor_username}</p>
              </div>
              <div className="flex justify-between p-4">
                <button onClick={() => navigate(`/user-coursedetails/${course.id}`)} className="bg-white text-blue-500 px-4 py-2 rounded">VIEW DETAILS</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>

  )
}

export default MyCourse
