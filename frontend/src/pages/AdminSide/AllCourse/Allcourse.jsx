import React from 'react'
import PublicAxios from '../../../axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import AdminNav from '../../../Component/Navbar/AdminNav'
import { Button } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast'
import { Image_URL } from '../../../constants/constans'

const Allcourse = () => {
  const [update, setUpdate] = useState(true)
  const [courseData, setCourseData] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await PublicAxios.get('/user/fetchcourse');
      setCourseData(response.data);
    }
    fetchData();
    setUpdate(false)
  }, [update])

  const handleBlockCourse = async (id) => {
    try {
      const response = await PublicAxios.put('/admin/blockcourse',
        {
          course_id: id
        }, {
        headers: {
          "Content-Type": "application/Json"
        },
        withCredentials: true,
      })
      toast.success(response.data.message)
      setUpdate(true)
    }
    catch (error) {
      toast.error(error.response.error)
    }
  }
  const handleUnblockCourse = async (id) => {
    try {
      const response = await PublicAxios.put('/admin/unblockcourse', {
        course_id: id,
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      toast.success(response.data.message)
      setUpdate(true)
    }
    catch (error) {
      toast.error(error.response.status)
    }
  }
  return (
    <>
      <AdminNav />
      <div className="pt-14 container mx-auto p-0 border-gray-200 overflow-x-auto">
        <div className="flex flex-wrap justify-center gap-4 pt-4 items-center">
          {courseData && courseData.map((course) => (
            <div key={course.id} className="p-4 bg-white rounded shadow-md max-w-sm">
              <div className='flex justify-center'>
                <img
                  src={`${Image_URL}${course.cover_image}`}
                  className="w-48 h-48 object-cover rounded "
                  alt="Course banner"
                />
              </div>
              <div className="p-4">
                <h6 className="text-xl font-bold">{course.title}</h6>
                <p className="text-sm">Instructor: {course.instructor_username}</p>
                <div className="flex flex-col">
                  <p className="text-xs">Available for</p>
                  <p className="text-sm font-bold text-indigo-600">₹{course.price}</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full h-1/3">
                <button onClick={() => navigate(`/admin/coursedetails/${course.id}`)} className="bg-white text-blue-500 px-4 py-2 rounded">VIEW DETAILS</button>
                {course.is_active ? (
                  <Button onClick={() => handleBlockCourse(course.id)} className='bg-red-600 '>Block</Button>
                ) : (
                  <Button onClick={() => handleUnblockCourse(course.id)} className='bg-green-600'>Unblock</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default Allcourse
