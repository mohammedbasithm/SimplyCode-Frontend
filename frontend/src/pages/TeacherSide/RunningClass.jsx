import React from 'react'
import TeacherNav from '../../Component/Navbar/TeacherNav'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import PublicAxios from '../../axios'
import ListCourse from './UploadCource/ListCourse'
import AddCourse from './UploadCource/AddCourse'
function RunningClass() {
  const isAuth = useSelector((state) => state.user)
  const user_id = isAuth.user_id
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [course, setCourse] = useState('')
  const [list, setList] = useState(false)
  const [fetchCourse, setFetchCourse] = useState(false)
  useEffect(() => {
    const courseData = async () => {
      try {
        const response = await PublicAxios.get('/course/coures-completedlist', { params: { user_id } }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setCourse(response.data);
        setList(true);
      }
      catch (error) {
        console.log(error);
      }

    }
    courseData();
    setFetchCourse(false)
  }, [fetchCourse]);
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
        </div>
        {list && <ListCourse courses={course} />}

      </div>

    </>
  )
}

export default RunningClass
