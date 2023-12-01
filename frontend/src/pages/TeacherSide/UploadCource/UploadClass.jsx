import React from 'react'
import TeacherNav from '../../../Component/Navbar/TeacherNav'

function UploadClass() {
  return (
    <div>
        <TeacherNav/>
        <div className='pt-20'>
          <button className='bg-gray-600 text-white'>add course</button>
        </div>      
    </div>
  )
}

export default UploadClass
