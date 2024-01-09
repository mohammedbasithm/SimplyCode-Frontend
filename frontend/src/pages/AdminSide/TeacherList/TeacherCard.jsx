import React from 'react'
import { Button } from "@material-tailwind/react";
import PublicAxios from '../../../axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Image_URL } from '../../../constants/constans';

const profilePic = 'https://akademi.dexignlab.com/react/demo/static/media/8.0ec0e6b47b83af64e0c9.jpg';
const TeacherCard = ({ teacher, setUpdate }) => {

    const navigate = useNavigate()
    const handleBlock = async (id) => {
        try {
            const response = await PublicAxios.put('/admin/teacher-block', { id }, {
                headers: {
                    "Content-Type": 'application/json',
                },
                withCredentials: true,
            });
            toast.success(response.data.message)
            console.log('teacher block successs');
            setUpdate(true)
        }
        catch (error) {
            toast.error(error.response.data.error);
            console.log('teacher block faild');
        }
    }
    const handleUnblock = async (id) => {
        try {
            const response = await PublicAxios.put('/admin/teacher-unblock', { id }, {
                headers: {
                    "Content-Type": 'application/json',
                },
                withCredentials: true,
            });
            toast.success(response.data.message)
            console.log('teacher unblock successs');
            setUpdate(true)
        }
        catch (error) {
            toast.error(error.response.data.error);
            console.log('teacher unblock faild');
        }
    }

    return (
        <>
            <div key={teacher.id} className=' bg-gray-700 w-64 h-56 rounded-md'>
                <div className='w-full h-2/3'>
                    <div className='h-2/3 flex justify-center py-3'>
                        {teacher.image ? <img className='w-1/3 h-full' src={`${Image_URL}${teacher.image}`} alt="" /> :
                            <img className='w-1/3 h-full' src={profilePic} alt="" />}
                    </div>
                    <div className='h-2/3 text-white flex flex-col items-center gap-1 capitalize'>
                        <div className='text-sm'>{teacher.username}</div>
                        <div className='text-verySmall'>total Course : 4</div>
                        <div className='text-verySmall '>Status : {teacher.is_active ? <span className='text-green-500'>Active</span> :
                            <span className='text-red-600'>Inactive</span>}</div>
                    </div>
                </div>
                <div className='w-full h-1/3 flex justify-evenly items-center'>
                    {teacher.is_active ? <Button onClick={() => handleBlock(teacher.id)} className='bg-red-600'>Block</Button> :
                        <Button onClick={() => handleUnblock(teacher.id)} className='bg-green-600'>unBlock</Button>}
                    <Button onClick={() => navigate(`/admin/teacher-profile/${teacher.id}`)} className='bg-profile-color'>Profile</Button>
                </div>
            </div>

            <Toaster />
        </>
    )
}

export default TeacherCard
