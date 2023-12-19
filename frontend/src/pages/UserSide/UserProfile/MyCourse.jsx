import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import PublicAxios from '../../../axios'
import { useSelector } from 'react-redux'
import Navigation from '../../../Component/Navbar/UserNav'
import { Footer } from '../../../Component/Footer'
import { useNavigate } from 'react-router-dom'
const MyCourse = () => {
    const isAuth=useSelector((state)=>state.user)
    const user_id=isAuth.user_id
    const navigate=useNavigate()
    const[courseData,setCourseData]=useState('')
    useEffect(()=>{
        const fetchData=async()=>{
            console.log(user_id);
            const response=await PublicAxios.get('/user/mycourse',{
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
    },[])
  return (
<>
  <Navigation />

  <div className="pt-20 container mx-auto p-3 border-gray-200 overflow-x-auto">
    {/* Banner */}
    {/* <div className='bg-indigo-100 w-full h-60 flex items-center' style={{ backgroundImage: `url(${bannerImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className='font-bold text-6xl text-white pl-56' style={{ width: '25%' }}>Course</h1>
    </div> */}

    {/* Course Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
      {courseData && courseData.map((course) => (
        <div key={course.id} className="p-4 bg-white rounded shadow-md">
          {/* Course Image */}
          <img
            src={`http://127.0.0.1:8000${course.cover_image}`}
            className="w-full rounded"
            alt="skilling banner"
          />

          {/* Course Details */}
          <div className="p-4">
            <h6 className="text-xl font-bold">{course.title}</h6>
            <p className="text-sm">Asitha Vijilesh</p>
            
          </div>

          {/* Buttons */}
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
