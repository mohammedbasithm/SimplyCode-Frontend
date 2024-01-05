import React, { useState } from 'react'
import Navigation from '../../../Component/Navbar/UserNav'
import { Footer } from '../../../Component/Footer'
import Lottie from '../../../Component/Lottie/Lottie'
import 'animate.css';
import Card from './Card'
import { useEffect } from 'react';
import PublicAxios from '../../../axios';
import { useSelector } from 'react-redux';

function Home() {
  const role = useSelector((state) => state.user.role)
  const [courseData, setCourseData] = useState('')
  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await PublicAxios.get('/course/popular-course');
      setCourseData(response.data)
    }
    fetchCourseData();
  }, [])
  return (
    <>
      <Navigation />

      <div className="flex flex-col lg:flex-row-reverse items-center justify-between py-16 lg:pt-0 lg:pb-0">
        <div className="lg:w-7/12 relative">
          <Lottie />
        </div>
        <div className="relative lg:w-5/12 flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
          <div className=" mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <h2 className="animate__animated animate__backInLeft  mb-5 font-serif text-3xl font-bold tracking-tight text-violet-500 low sm:text-4xl sm:leading-none">
              Elevate Your Coding Experience{' '}
              <span className="inline-block text-yellow-500">with Us</span>
            </h2>
            <p className="pr-5 mb-5 text-base text-gray-600 md:text-lg">
              Embark on a coding journey like never before. Our platform is committed to providing you with cutting-edge tools and resources to fuel your creativity and passion for coding.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-5">
        <hr className="flex-grow border-t border-gray-300"></hr>
        <h1 className="text-blue-950 mb-5 font-sans sm:text-4xl tracking-tight sm:leading-none px-4 text-center text-lg font-bold">Popular Courses</h1>
        <hr className="flex-grow border-t border-gray-300"></hr>
      </div>
      <Card courseData={courseData} role={role} />
      <Footer />
    </>
  )
}

export default Home
