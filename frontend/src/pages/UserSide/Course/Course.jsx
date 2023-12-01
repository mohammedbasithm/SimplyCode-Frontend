import React from 'react'
import Navigation from '../../../Component/Navbar/UserNav'
import { Footer } from '../../../Component/Footer'

function Course() {
  return (
    <div>
      <Navigation></Navigation>
      <div className='bg-yellow w-10 h-10'>
      <h1 className='text-center'>Welcome course page...</h1>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Course
