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
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState('');
  const isAuth = useSelector((state) => state.user)
  const user_id = isAuth.user_id
  const [paymentsDetails,setPaymentDetails]=useState('')
  console.log('user_id:', user_id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await PublicAxios.get('/user/fetchcourse');
      console.log('success the fetch data');
      setCourseData(response.data);
    }
    fetchData();
    
  }, [])
  // useEffect(()=>{
  //   const fetchPaymentData = async () => {
  //     try {
  //         const response = await PublicAxios.get('/course/fetchpaymentsData', {
  //             params: {
  //                 course_id: courseId, // Ensure courseId is defined and has a valid value
  //                 user_id: isAuth.user_id, // Ensure isAuth object contains user_id
  //             },
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             withCredentials: true,
  //         });
  //         setPaymentDetails(response.data.is_paid)
  //         console.log('Payment data:', response.data.is_paid);
  //         console.log('Successfully fetched payment data');
  //     } catch (error) {
  //         console.log('Failed to fetch payment data:', error);
  //     }
  // };
  // fetchPaymentData();
  // })

  const handlePurchase = async (id) => {
    console.log('id:', id);
    try {
      const response = await PublicAxios.post('/stripe/create-checkout-session', { id, user_id: user_id }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      toast.success(response.data.message)
      console.log('success');
      window.location.href = response.data.checkout_session_url;
    } catch (error) {
      console.log('somthing issue');
    }
  }
  console.log('courseData:', courseData);

  return (
    <>
      <Navigation />
      <div className="pt-14 container mx-auto p-0 border-gray-200 overflow-x-auto">
        <div className='bg-indigo-100 h-64 w-full flex justify-center items-center' style={{ borderBottomRightRadius: '75px' }}>
          <div className='text-blue-900 text-4xl font-bold'>Course</div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {courseData && courseData.map((course) => {
            if (course.is_active === true) {
              return (
                <div key={course.id} className="p-4 bg-white rounded shadow-md max-w-sm">
                  <img
                    src={`http://127.0.0.1:8000${course.cover_image}`}
                    className="w-full h-48 object-cover rounded"
                    alt="Course banner"
                  />
                  <div className="p-4">
                    <h6 className="text-xl font-bold">{course.title}</h6>
                    <p className="text-sm">Instructor: {course.instructor_username}</p>
                    <div className="flex flex-col">
                      <p className="text-xs">Available for</p>
                      <p className="text-sm font-bold text-indigo-600">₹{course.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-between p-4">
                    <button onClick={() => navigate(`/user-coursedetails/${course.id}`)} className="bg-white text-blue-500 px-4 py-2 rounded">VIEW DETAILS</button>
                   {!course.is_paid && <button onClick={() => handlePurchase(course.id)} className="bg-blue-500 text-white px-4 py-3 rounded-full">BUY NOW</button>}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Course
