import React from 'react'
import TeacherNav from '../../../Component/Navbar/TeacherNav'
import DashboardTextContent from './DashboardTextContent'
import DashboardCardSection from './DashboardCardSection'
import RecentTransaction from './RecentTransaction'

export default function TeacherDashbord() {
  return (
    <div>
      <div className='mt-8 w-screen h-screen+50 md:h-screen overflow-x-hidden'>
      <TeacherNav/>
      <div className='w-full h-full bg-dashboard-bg p-5 md:p-8  flex flex-col gap-0 md:gap-8'>
          <DashboardTextContent text="teacher" />
          <DashboardCardSection />
          <RecentTransaction />
      </div>
    </div>
    </div>
  )
}
