import React from 'react'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Spinner from '../../../Component/Spinner/Spinner';
import PublicAxios from '../../../axios';
import { useEffect } from 'react';
import { Await } from 'react-router-dom';

const AddCourse = ({toggleModal}) => {
    const[loading,setLoading]=useState(false)
    const[categories,setCategories]=useState([])
    const isAuth=useSelector((state)=>state.user)
    const [input,setInput]=useState({
        coursename:'',
        price:'',
        category:'',
        description:'',
        about:'',
        coverimage:'',
        user_id:isAuth.user_id,
    });
    useEffect(()=>{
      const CatData=async()=>{
      const response=await PublicAxios.get('/course/category',{
        headers:{
          "Content-Type":'application/json',
        },
        withCredentials:true,
      },[]);
      setCategories(response.data)
      
    }
    CatData();
  },[])
  
    const handleChange=(e)=>{
        setInput((prev)=>({
            ...prev,
            [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value,
        }));
    }
    const handleFileImage=(e)=>{
        setInput((prev)=>({
            ...prev,
            coverimage:e.target.files[0],
        }));
    }
    const handleCreate=async(e)=>{
        e.preventDefault();
        console.log('heloo',input);
        
        if (
            input.coursename.trim()==='' ||
            input.category.trim()==='' ||
            input.about.trim()===''||
            input.description.trim()===''
            
        ){
            toast.error('Enter Valid Details',{ duration:2000});
            return;
        }
        // Assuming input.price is a number
        const pricePattern = /^\d+(\.\d{1,2})?$/;
        const priceAsString = input.price.toString();
        console.log('priceAsString:', priceAsString);

        if (!pricePattern.test(priceAsString)) {
        toast.error('Please enter a correct price (numeric with up to two decimal places)', { duration: 2000 });
        return; 
        }

        if(!input.coverimage){
            toast.error('please select a Thumnail for course',{duration:3000});
            return;
        }
        const validateFile = (file) => {
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
            const fileName = typeof file === 'string' ? file : file.name; // Access file name or file path
            const fileExtension = fileName.split('.').pop().toLowerCase();
          
            // Check if the extension is allowed
            if (!allowedExtensions.includes(fileExtension)) {
              toast.error('Please upload files with allowed extensions (JPG, JPEG, PNG, PDF)');
              return false;
            }
            return true;
          }
          const coverImage = validateFile(input.coverimage);
          
      
          if (!coverImage ) {
            return;
          }
          try{
            setLoading(true);
            console.log(input);
            const response=await PublicAxios.post('/course/addcourse',input,{
              headers: {
                'Content-Type': 'multipart/form-data', // Make sure to set the correct content type
              },
                withCredentials:true,
            });
            console.log('success submission ');
            setLoading(false);
            toggleModal();
            toast.success(response.data.message,{duration:2000});
          }
          catch(error){
            setLoading(false);
            toast.error(error.response.data.error)
            console.log('Submission is faild..');
            // toast.error(error.response.data.error)
          }
    }
    
  return (
    <>
      <div
            aria-hidden="true"
            className="flex fixed bg-gray-300 bg-opacity-20 z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
          >
            <div className="relative  w-full  max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Create Course
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
                        htmlFor="coursename"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Course Name
                      </label>
                      <input
                        type="text"
                        name="coursename"
                        id="coursename"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Give a name to your Course"
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Course Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Enter the course price"
                        required=""
                      />
                    </div>
                    
                    <div className="col-span-2">
                        <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900"
                        >
                        Category
                        </label>
                        <select
                        name="category"
                        id="category"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required=""
                        >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.category}
                          </option>
                        ))}   
                        </select>
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
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Course Description here"
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="formFileLg"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Thumbnail
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 relative m-0 block w-full min-w-0 flex-auto cursor-pointer border-solid bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-400 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-300 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                        id="files"
                        type="file"
                        name='files'
                        onChange={handleFileImage}
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="about"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        About the Author
                      </label>
                      <input
                        type="text"
                        name="about"
                        id="about"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Description about the Author"
                        required=""
                      />
                    </div>
                    
                  </div>
                  <div className=" flex justify-center items-center">
                    <button
                      type="submit"
                      className=" text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 hover:text-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                     Submit{loading && <Spinner/>} 
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
        <Toaster/>
      
    </>
  )
}

export default AddCourse;
