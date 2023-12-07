import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import PublicAxios from '../../../axios';
import ChapterDetails from '../../TeacherSide/UploadCource/ChapterDetails';
import toast,{Toaster} from 'react-hot-toast';
import Navigation from '../../../Component/Navbar/UserNav';
const ChapterCourse = () => {
    const {id}=useParams();
    const[courseDetails,setCourseDetails]=useState('')
    const[chapterDetails,setChapterDetails]=useState('')
    const [selectChapter,setSelectChapter]=useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    
    const closeModal = () => {
        setModalVisible(false);
      };
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await PublicAxios.get('/user/coursedetails',{params: { id } });
                setCourseDetails(response.data)
                console.log('fetching data success');
            }
            catch(error){
                console.log('somthing issues');
            }
        }
        fetchdata();
        const chapterFetchdata=async()=>{
            try{
                const response=await PublicAxios.get('/course/fetchchapter',{params:{id}});
                setChapterDetails(response.data);
                console.log("success the fetching chapter");
            }catch(error){
                console.log('fetching chapter faild');
            }
        }
        chapterFetchdata();
       
    },[]);
    const handleButtonClick=(chapter)=>{
        setSelectChapter(chapter);
        setModalVisible(true);
    }
  return (
    <>
    <Navigation/>
     
      {courseDetails && (
        <div className="pt-20 bg-gray-400 h-screen">
          <div className="flex justify-between ">
            <span className="text-2xl font-bold">
              {courseDetails.title}
              {` `}:
            </span>
            <div className="absolute top-32 right-3 ">
 
              {chapterDetails && chapterDetails.map((chapter) => (
                <div className="relative py-3" key={chapter.id}>
                  <button
                    id="dropdownDefaultButton"
                    onClick={()=>handleButtonClick(chapter)}
                    className="text-gray-600 bg-gray-300 hover:text-gray-600 transition-colors duration-300 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-400 font-semibold rounded-lg text-xl w-96 overflow-hidden px-2 py-2.5 text-center inline-flex items-center justify-center"
                    type="button"
                  >
                    {chapter.chapter}
                  </button>
                </div>
              ))}
              
            </div>
          </div>
          <div className='bg-gray-400 '>
          <div className="flex flex-col ml-3 p-5">
            <img
              src={`http://127.0.0.1:8000/${courseDetails.cover_image}`}
              alt="thumbnail"
              className=" w-1/4"
            />
          </div>
          <div className="p-3 mx-5 w-2/3">
            <span className="text-xl">
              <span className="font-bold">Course Blurb:{` `}</span><br />
              {courseDetails.about}
            </span>
          </div>

          <div className="p-3 mx-5 w-2/3">
            <span className="font-bold text-lg">Description:{` `} </span>
            <div className="text-justify">{courseDetails.description}</div>
          </div>
          </div>
          
          <Toaster />
        </div>
      )}
      {modalVisible && (selectChapter && <ChapterDetails onClose={closeModal} chapter={selectChapter}/>)}
    </>
  )
}

export default ChapterCourse
