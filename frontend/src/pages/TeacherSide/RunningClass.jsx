import React from 'react'
import TeacherNav from '../../Component/Navbar/TeacherNav'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import PublicAxios from '../../axios'
import ListCourse from './UploadCource/ListCourse'
import AddCourse from './UploadCource/AddCourse'
function RunningClass() {
  const isAuth=useSelector((state)=>state.user)
  const user_id=isAuth.user_id
  const [isModalVisible, setIsModalVisible] = useState(false);
  const[course,setCourse]=useState('')
  const[list,setList]=useState(false)
  const[fetchCourse,setFetchCourse]=useState(false)
  useEffect(()=>{
    const courseData=async()=>{
      try{
          const response=await PublicAxios.get('/course/coures-completedlist', {params:{ user_id }} , {
            headers:{
              'Content-Type':'application/json',
            },
            withCredentials:true,
        });
        setCourse(response.data);
        setList(true);
        console.log('success the fetching course');
      }
      catch(error){
        console.log(error.response.data.error);
      }
      
    }
    courseData();
    setFetchCourse(false)
  },[fetchCourse]);
  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };
  return (
    <>
        <div className='bg-gray-400 h-screen'>
        <TeacherNav />
        {/* <!-- button --> */}
        <div class="flex items-start justify-between mb-4 mt-16">
            <span className="text-3xl font-bold">Classes: </span>
            <button onClick={toggleModal} type="button" class='flex max-w-sm bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-sm uppercase font-bold shadow-md rounded-full p-3'>
                <div class="flex sm:flex-cols-12 gap-2 ">
                    <div class="col-span-1">
                        <span class="text-xl">+</span>
                    </div>
                    <div class="col-span-2 pt-2">Add Course</div>
                </div>    
            </button>
        </div>
        {list&&<ListCourse courses={course}/>}
        {isModalVisible&&<AddCourse setFetchCourse={setFetchCourse}  toggleModal={toggleModal}/>}
    </div>

    </>
  )
}

export default RunningClass
