import React from 'react'
import toast,{Toaster} from 'react-hot-toast'
import { useState } from 'react'
import { useEffect } from 'react'
import PublicAxios from '../../../axios'
import Spinner from '../../../Component/Spinner/Spinner'
import ChapterDetails from './ChapterDetails'
import Checkbox from '@mui/material/Checkbox';

const AboutCourse = ({id}) => {
    const [courseDetails,setCourseDetails]=useState('')
    const [isModalVisible,setIsModalVisible]=useState(false)
    const [loading,setLoading]=useState(false)
    const [chapterDetails,setChapterDetails]=useState('')
    const [selectChapter,setSelectChapter]=useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [newChapterAdded, setNewChapterAdded] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [input,setInput]=useState({
        'chapterName':'',
        'description':'',
        'videos':'',
        'is_free':false,
        'course_id':id,
    })
    const handleCheckbox=(e)=>{
      const { name, checked } = e.target;
      setInput((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
    
    const toggleModal=()=>{
        setIsModalVisible((prev)=>!prev)
    }
    const handleButtonClick=(chapter)=>{
        setSelectChapter(chapter);
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
      };
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await PublicAxios.get('/course/coursedetails',{params: { id } });
                setCourseDetails(response.data)
                console.log('fetching data success');
            }
            catch(error){
                console.log(error.response.data.error   );
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
        setNewChapterAdded(false);
    },[id,newChapterAdded]);
    const handlechange=(e)=>{
        setInput((prev)=>({
            ...prev,
            [e.target.name]:e.target.value,     
        }));
    }
    const isValidFileUpload = (file) => {
        const validExtensions = ["mkv", "mp4"];
        const fileExtension = file.type.split("/")[1];
        return validExtensions.includes(fileExtension);
      };
      const handleFile = (e) => {
        if (isValidFileUpload(e.target.files[0])) {
          setInput((prev)=>({
            ...prev,
            videos:e.target.files[0]
          }));
        } else {
          toast.error("Invalid File Format");
          return;
        }
      };
      const handleCreate=async(e)=>{
        e.preventDefault();
        console.log("handle create:",input);
        setLoading(true)
        if(
            input.chapterName.trim()===''||
            input.description.trim()===''
        ){
            toast.error('fill the form');
            return;
        }
        try{
        const response=await PublicAxios.post('/course/addchapter',input,{
            headers:{
                "Content-Type":'multipart/form-data',
            },
            withCredentials:true,
        });
        console.log(response.data.message);
        toast.success(response.data.message);
        setNewChapterAdded(true);
        setLoading(false)
      }
      catch(error){
        console.log('add chapter faild');
        toast.error(error.response.data.error);
        setLoading(false)
      }
    }
    const handleButton=async(id)=>{
      
        try{
          const response=await PublicAxios.put('/course/course-completed',{id},{
            headers:{
              "Content-Type":"application/Json"
            },
            withCredentials:true,
          });
          toast.success(response.data.message)
          console.log('course completed success');
          
        }
        catch(error){
          toast.error(error.response.data.error)
          console.log('somthing problem');
        }
      
    }
    console.log('input:',input);
    console.log(chapterDetails);
  return (
    <>
      {courseDetails && (
        <div className="pt-20 ">
          <div className="flex justify-between ">
            <span className="text-2xl font-bold">
              {courseDetails.title}
              {` `}:
            </span>
            <div className="absolute top-32 right-3 ">
              {/* //////////////////// */}
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
              {/* ///////////////// */}
              {!courseDetails.is_completed && (<div className="relative py-3 ">
                <button
                  id="dropdownDefaultButton"
                  className="text-green-700 bg-gray-300 hover:text-green-800 transition-colors duration-300 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-400 font-semibold rounded-lg text-2xl w-96 overflow-hidden px-4 py-2.5 text-center inline-flex items-center justify-center"
                  type="button"
                  onClick={toggleModal}
                >
                  Add Chapter +
                </button>
              </div>)}
              {/* ////////////////// */}
            </div>
          </div>
          <div className='bg-gray-400 '>
          <div className="flex flex-col ml-3 p-5">
            <img
              src={`http://127.0.0.1:8000${courseDetails.cover_image}`}
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
          {!courseDetails.is_completed &&!courseDetails.is_subscripe && <div className='pl-16 pb-4 '>
          <button onClick={()=>handleButton(courseDetails.id)} className='bg-green-600 p-3 rounded-lg'>Completed</button>

          </div>}
          </div>
          {isModalVisible && (
            <div
              aria-hidden="true"
              className="flex fixed bg-gray-course300 bg-opacity-20 z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
            >
              <div className="relative  w-full  max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Create Chapter
                    </h3>

                    <button
                      onClick={toggleModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      data-modal-toggle="crud-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form className="p-4 md:p-5" onSubmit={handleCreate}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="chapterName"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Chapter Name
                        </label>
                        <input
                          type="text"
                          name="chapterName"
                          id="chapterName"
                          onChange={handlechange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder="Give a name to your Chapter"
                          required=""
                        />
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          name="description"
                          id="description"
                          onChange={handlechange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder="Chapter Description here"
                          required=""
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <label
                          htmlFor="formFileLg"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Upload Video
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 relative m-0 block w-full min-w-0 flex-auto cursor-pointer border-solid bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-400 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-300 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                          id="formFileLg"
                          type="file"
                          name='videos'
                          accept=".mp4, .mkv"
                          onChange={handleFile}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          id="freeCourseCheckbox"
                          name="is_free"
                          onClick={handleCheckbox}
                          style={{ transform: 'scale(1)' }}
                        />
                        <label htmlFor="freeCourseCheckbox" style={{ fontSize: '1em', marginLeft: '5px' }}>
                          Free Course
                        </label>
                      </div>

                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 hover:text-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Submit{loading && <Spinner/>}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <Toaster />
        </div>
      )}
      {modalVisible && (selectChapter && <ChapterDetails onClose={closeModal} chapter={selectChapter}/>)}
    </>
  )
}

export default AboutCourse
