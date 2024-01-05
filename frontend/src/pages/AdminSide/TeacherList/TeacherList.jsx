import React, { useEffect } from 'react'
import AdminNav from '../../../Component/Navbar/AdminNav'
import { FaSearch } from 'react-icons/fa'
import TeacherCard from './TeacherCard'
import SimplePagination from './SimplePagination'
import PublicAxios from '../../../axios'
import { useState } from 'react'


const TeacherList = () => {
    const [data, setData] = useState('')
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        const teacherData = async () => {
            const response = await PublicAxios.get('/admin/teacherlist');
            setData(response.data)
        }
        teacherData();
        setUpdate(false);
    }, [update])

    return (
        <>
            <div className='w-screen h-screen overflow-x-hidden'>
                <AdminNav />
                <div className='pt-20 w-full h-full bg-dashboard-bg'>
                    <div className=' w-full px-6 h-24 bg-dashboard-bg flex justify-center items-center'>
                        <div className='w-full h-2/3 bg-teacher-card-bg flex items-center justify-end px-4'>
                            <div className='flex '>
                                <div className='w-14 h-10 rounded-l-md bg-black flex justify-center items-center'>
                                    <FaSearch className='text-blue-500' />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="p-2 rounded-r-md w-full md:w-64 text-white text-verySmall-1 bg-dashboard-bg outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-auto bg-dashboard-bg flex items-center justify-center flex-wrap gap-4 py-2 px-2'>
                        {data && data.map((teacher) => {

                            return <TeacherCard teacher={teacher} setUpdate={setUpdate} />

                        })
                        }


                    </div>
                    <div className='w-full h-24 bg-dashboard-bg flex items-center justify-center'>
                        <SimplePagination />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeacherList
