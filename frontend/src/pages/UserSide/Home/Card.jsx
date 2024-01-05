import React from 'react'
import { Image_URL } from '../../../constants/constans'
import { useNavigate } from 'react-router-dom'

const Card = ({ courseData, role }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        {courseData && courseData.map((course, index) => {
          if (course.is_active === true) {
            return (
              <div key={index} className="p-4 bg-white rounded shadow-md max-w-sm">
                <img
                  src={`${Image_URL}${course.cover_image}`}
                  className="w-60 h-48 object-cover rounded"
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
                <div className="flex justify-between ">
                  <button onClick={() => { role === 'USER' ? navigate(`/user-coursedetails/${course.id}`) : navigate('/login') }} className="bg-white text-blue-500 px-4 py-2 rounded">VIEW DETAILS</button>

                </div>
              </div>
            )
          }
        })}
      </div>
    </>
  )
}

export default Card
