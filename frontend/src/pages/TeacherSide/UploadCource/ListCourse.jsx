import React from 'react'
import { useNavigate } from 'react-router-dom'
const ListCourse = ({courses}) => {
  const navigate=useNavigate();
  return (
    <>
        
            <div className="container mx-auto p-3 border-gray-200 overflow-x-auto">
            <div className="flex flex-wrap">
            {courses.map((course) => (
              <div
                key={course.user_id}  
                onClick={()=>navigate(`/teacher/coursedetails/${course.id}`)}
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
           </div> 
      </div>
    </>
  )
}

export default ListCourse
