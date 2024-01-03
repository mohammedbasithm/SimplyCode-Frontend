import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import 'hover.css/css/hover-min.css';
import {  useSelector } from 'react-redux';
import AdditionalDetails from '../../pages/TeacherSide/AdditionalDetails';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../ReduxStore/ReduxStore';
import { useNavigate } from 'react-router-dom';

const TeacherNav =()=> {
  const [isOpen, setIsOpen] = useState(false);
  const isAuth=useSelector((state)=>state.user)
  const name=isAuth.username;
  const approvel=isAuth.is_approvel
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[modal,setModal]=useState(false)
  const teacherRequest=isAuth.teacher_request
  console.log(isAuth);
 
  // if (!approvel && !teacher_request){
  //   useEffect(()=>{
  //     setIsEditModalOpen(true)
  //   },[]
  // )}
  // if(teacher_request){
  //   useEffect(()=>{
  //     setModal(true);
  //   },[])
  // }
  useEffect(() => {
    if (!approvel && !teacherRequest) {
      setIsEditModalOpen(true);
    } else if (teacherRequest) {
      setModal(true);
    } else if (approvel) {
      setModal(false);
    }
  }, [approvel, teacherRequest]);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  console.log('teacherRequest:',teacherRequest);
  const logoutHandle=()=>{
    dispatch(userLogout())
    navigate('/login')
  }
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div>
      <AdditionalDetails userId={isAuth.user_id} isEditModalOpen={isEditModalOpen} closeEditModal={closeEditModal}/>
      <nav className="z-40 w-screen bg-black fixed top-0">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full flex items-center justify-between h-16">
            <div className="w-full flex items-center justify-between">
              <div className="flex-shrink-0">
                <p className='text-blue-300 font-bold text-lg'>Logo</p>
              </div>
              <div className="hidden md:flex md:justify-between">
                <div className=" flex items-center justify-between space-x-7">
                  <Link to={'/teacher/'} className='text-white text-medium cursor-pointer py-1 hvr-underline-from-left'>Dash Board</Link>
                  <Link to={'/teacher/uploadclass'} className='text-white text-medium cursor-pointer py-1 hvr-underline-from-left'>Upload Class</Link>
                  <Link to={'/teacher/runningclass'} className='text-white text-medium cursor-pointer py-1 hvr-underline-from-left'>Running Class</Link>
                  <Link to={'/teacher/teacherchat'} className='text-white text-medium cursor-pointer py-1 hvr-underline-from-left'>Chats</Link>
                  <Link to={'/teacher/teacherblog'} className='text-white text-medium cursor-pointer py-1 hvr-underline-from-left'>Blog</Link>
                </div>
              
              <div className='pl-6 flex items-center justify-between space-x-7'>
                  <Link to={'/teacher/teacherprofile'} className='text-white text-medium cursor-pointer py-1'>
                   {name}
                  </Link>
                  <span onClick={logoutHandle} className='hidden md:block bg-teal-500 px-3 py-1 text-custom-btn-color font-medium cursor-pointer  hvr-bounce-to-right'>Logout</span>
                </div>
            </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              
                <div className=" flex flex-col gap-3 mb-3">
                <Link to={'/teacher/'} className='text-white text-medium cursor-pointer py-1 hvr-underline-from-left'>Dash Board</Link>
                  <Link to={'/teacher/uploadclass'} className='text-white text-medium cursor-pointer py-1 hvr-underline-from-left'>Upload Class</Link>
                  <Link to={'/teacher/runningclass'} className='text-white text-medium cursor-pointer py-1 hvr-underline-from-left'>Running Class</Link>
                  <Link to={'/teacher/teacherchat'} className='text-white text-medium cursor-pointer py-1 hvr-underline-from-left'>Chats</Link>
                  <Link to={'/teacher/teacherpayments'} className='text-white text-medium cursor-pointer py-1 hvr-underline-from-left'>Payment</Link>
                </div>
              
                
                <Link className='text-white text-medium cursor-pointer py-1' to={'/userprofile'}>{name}</Link>
                <span onClick={logoutHandle} className='md:hidden bg-teal-500 px-3 py-1 text-custom-btn-color font-medium cursor-pointer'>Logout</span>
              </div>
            </div>
          )}
        </Transition>
      </nav>
      {modal && (
        <div
          id="popup-modal"
          className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                {/* ... close icon ... */}
                X
              </button>
              <div className="p-4 text-center">
              <h1>Approval Verification Pending</h1>
              {/* <div className="flex justify-center items-center h-screen"> */}
              <div className="flex justify-center items-center">
                <img
                  className="mx-auto"
                  src="https://static.thenounproject.com/png/5736845-200.png"
                  alt=""
                />
              </div>

                <h3 className="mb-5 text-lg font-normal text-gray-500">
                Your approval verification is pending.
                </h3>

                <p className="text-sm text-gray-600">
                A verification link has been sent to your email address. Please check your email and follow the instructions to complete the verification process.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeacherNav;