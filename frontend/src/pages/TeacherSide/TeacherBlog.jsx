import React from 'react'
import TeacherNav from '../../Component/Navbar/TeacherNav'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PublicAxios from '../../axios'
import Spinner from '../../Component/Spinner/Spinner'
import { useNavigate } from 'react-router-dom'
import { Image_URL } from '../../constants/constans'

function TeacherBlog() {
  const navigate = useNavigate()
  const [blogData, setBlogData] = useState([])
  const userId = useSelector((state) => state.user.user_id)
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [addBlog, setAddBlog] = useState(false)
  const [input, setInput] = useState({
    title: '',
    content: '',
    thumnail: '',
    userId: userId
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await PublicAxios.get('/teacher/blog/fetchdata', {
        params: { userId }
      })
      setBlogData(response.data);
    }
    fetchData();
    setAddBlog(false)
  }, [addBlog]);

  const getTimeDifference = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const timeDifference = now - messageTime;

    if (timeDifference < 60000) {
      // Less than 1 minute ago
      return `${Math.floor(timeDifference / 1000)} s ago`;
    } else if (timeDifference < 3600000) {
      // Less than 1 hour ago
      return `${Math.floor(timeDifference / 60000)} m ago`;
    } else if (timeDifference < 86400000) {
      // Less than 1 day ago
      return `${Math.floor(timeDifference / 3600000)} h ago`;
    } else {
      // More than 1 day ago
      return `${Math.floor(timeDifference / 86400000)} d ago`;
    }
  };
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleFileImage = (e) => {

    setInput((prev) => ({
      ...prev,
      thumnail: e.target.files[0],
    }));
  }
  const handleCreate = async (event) => {
    event.preventDefault();
    if (input.title.trim() === '' || input.content.trim() === '') {
      toast.error('pleas enter the correct input')
      return;
    }
    if (!input.thumnail) {
      toast.error('please select a Thumnail for blog');
      return;
    }
    const validateFile = (file) => {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
      const fileName = typeof file === 'string' ? file : file.name; // Access file name or file path
      const fileExtension = fileName.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        toast.error('Please upload files with allowed extensions (JPG, JPEG, PNG, PDF)');
        return false;
      }
      return true;
    }
    const coverImage = validateFile(input.thumnail);


    if (!coverImage) {
      return;
    }
    try {
      setLoading(true);
      const response = await PublicAxios.post('/teacher/createblog', input, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
        withCredentials: true
      })
      toast.success(response.data.message);
      setAddBlog(true)
      setLoading(false)
      toggleModal();
    }
    catch (error) {
      toast.error(error)
      setLoading(false)
    }
  }
  const toggleModal = () => {
    setIsModalVisible((prev) => !prev)
  }
  const image = 'data:image/jpeg;base64,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'
  return (
    <>
      <div className='bg-gray-400 h-screen '>
        <TeacherNav />
        {/* <!-- button --> */}
        <div class="flex items-start justify-between mb-4 mt-16 p-3">
          <span className="text-3xl font-bold text-black">Blog: </span>
          <button onClick={toggleModal} type="button" className='bg-green-600 border rounded-md p-3'>
            <div class="flex sm:flex-cols-12 gap-2 ">
              <div class="col-span-2 pt-2">Add Blog</div>
            </div>
          </button>
        </div>

        <div className="pt-16 container mx-auto py-8 flex flex-wrap justify-center">
          {blogData &&
            blogData.map((post) => (
              <div key={post.id} className='p-4'>
                <div className="w-64 h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`${Image_URL}${post.image}`}
                      alt={post.title}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </div>
                  <div className="flex-grow p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                    <div className="flex items-center mb-4">
                      {post.author.image ? (
                        <img
                          src={`${Image_URL}${post.author.image}`}
                          alt={post.author?.username}
                          className="w-10 h-10 rounded-full mr-2"
                        />
                      ) : (
                        <img src={image} className="w-10 h-10 rounded-full mr-2" />
                      )}
                      <div>
                        <h4 className="text-gray-600 ">{post.author?.username}</h4>
                        <p className="text-gray-700 text-verySmall mb-1">{getTimeDifference(post.created_at)}</p>
                      </div>
                    </div>
                    <button onClick={() => navigate(`/teacher/blogdetails/${post.id}`)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more  {post.id}
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {isModalVisible &&
          <div
            aria-hidden="true"
            className="flex fixed bg-gray-300 bg-opacity-20 z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
          >
            <div className="relative  w-full  max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Create Blog
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
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Blog Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="enter the title of blog"
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="content"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Content
                      </label>
                      <textarea
                        type="text"
                        name="content"
                        id="content"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Enter the content"
                        required=""
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="files"
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
                  </div>
                  <div className=" flex justify-center items-center">
                    <button
                      type="submit"
                      className=" text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 hover:text-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Submit{loading && <Spinner />}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
      </div>
      <Toaster />
    </>
  )
}

export default TeacherBlog
