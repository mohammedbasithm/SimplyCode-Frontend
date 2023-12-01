import React from 'react'
import AdminNav from '../../Component/Navbar/AdminNav'


function Dashboard() {
  return (
    <>
      <AdminNav></AdminNav>
      
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="p-8 rounded shadow-xl sm:p-16">
      <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/2 lg:pr-8 flex flex-col justify-center">
  <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none text-center">
    Welcome to the Admin Dashboard
    <br className="hidden md:block" />
    <span className="inline-block text-deep-purple-accent-400">
      Manage and Monitor
    </span>
  </h2>
  <p className="mt-4 text-base text-gray-700 text-center">
    Here, you have access to powerful tools and controls to oversee and manage the system. Utilize the comprehensive admin functionalities to maintain and monitor various aspects of the application.
  </p>
  <a
    href="/admin"
    aria-label=""
    className="inline-block mt-6 px-4 py-2 text-sm font-semibold text-white bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 rounded-md transition-colors duration-300 self-center"
  >
    Explore Admin Panel
  </a>
</div>
  <div className="lg:w-1/2 mt-6 lg:mt-0">
    <img
      src="src/assets/img1.jpg"
      alt="Admin Dashboard Illustration"
      className="w-full h-auto rounded-md shadow-md"
    />
  </div>
</div>

      </div>
    </div>
   
    </>
  )
}

export default Dashboard
