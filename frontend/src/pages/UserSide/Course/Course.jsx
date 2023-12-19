import React from 'react'
import Navigation from '../../../Component/Navbar/UserNav'
import { Footer } from '../../../Component/Footer'
import { useEffect } from 'react'
import PublicAxios from '../../../axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bannerImg from '../../../assets/course_banner_img.webp'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

function Course() {
  const navigate=useNavigate()
  const[courseData,setCourseData]=useState('');
  const isAuth=useSelector((state)=>state.user)
  const user_id=isAuth.user_id
  console.log('user_id:',user_id);
  useEffect(()=>{
    const fetchData=async()=>{
      const response=await PublicAxios.get('/user/fetchcourse');
      console.log('success the fetch data');
      setCourseData(response.data);
    }
    fetchData();
  },[])

  const handlePurches=async(id)=>{
    console.log('id:',id);
    try{
        const response=await PublicAxios.post('/stripe/create-checkout-session',{id,user_id:user_id}, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials:true,
        });
      toast.success(response.data.message)
      console.log('success');
      window.location.href = response.data.checkout_session_url;
    }catch(error){
      console.log('somthing issue');
    }
  }

  return (
    <>
      <Navigation></Navigation>
      <div className="pt-20 container mx-auto p-3 border-gray-200 overflow-x-auto">
      <div className='bg-indigo-100 w-full h-60 flex items-center' style={{ backgroundImage: `url(${bannerImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <h1 className='font-bold text-6xl text-white pl-56' style={{ width: '25%' }}>Course</h1>
</div>
{/* 



            <div className="flex flex-wrap pt-4">
            {courseData && courseData.map((course) => (
              <div
                key={course.user_id}  
                onClick={()=>navigate(`/user-coursedetails/${course.id}`)}
                className="p-4 h-60 border mr-3 mb-3 w-80 rounded shadow-sm flex flex-col items-center justify-center bg-gray-300 hover:bg-gray-400"
              >
                <img
                  src={`http://127.0.0.1:8000/${course.cover_image}`}
                  alt="plus"
                  className="w-52 h-40 opacity-80 hover:opacity-100"
                />
                <h1 className="text-3xl font-bold text-gray-700 text-center hover:text-gray-800 justify-center p-2">
                  {course.title}
                </h1>
              </div>
            ))}
           </div>  */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
{courseData && courseData.map((course) => (
    <div className="p-4 bg-white rounded shadow-md">
      <img
        src={`http://127.0.0.1:8000${course.cover_image}`}
        className="w-full rounded"
        alt="skilling banner"
      />
      <div className="p-4">
        <h6 className="text-xl font-bold">{course.title}</h6>
        <p className="text-sm">instructor : {course.instructor_username}</p>
        <div className="flex flex-col">
          <p className="text-xs">Available for</p>
          <p className="text-sm line-through text-gray-500">₹{course.price}</p>
          <p className="text-sm font-bold text-indigo-600">₹999</p>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <button onClick={()=>navigate(`/user-coursedetails/${course.id}`)} className="bg-white text-blue-500 px-4 py-2 rounded">VIEW DETAILS</button>
        <button onClick={()=>handlePurches(course.id)} className="bg-blue-500 text-white px-4 py-3 rounded-full">BUY NOW</button>
      </div>
    </div>))}
  {/* </div> */}
  {/* Additional cards go here */}
</div>


      </div>
      <Footer></Footer>
    </>
  )
}

export default Course
