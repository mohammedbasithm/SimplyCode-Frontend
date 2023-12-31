import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import instace from '../../axios'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../ReduxStore/ReduxStore';

export const AdminNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logout, setLogout] = useState(false)
  const isAuth = useSelector((state) => state.user)
  const name = localStorage.getItem('username')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuth && isAuth.access_token !== null) {
      setLogout(true)
    } else {
      setLogout(false)
    }
  }, [isAuth])



  const logoutHandle = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    setLogout(false);
    navigate('/login')

  };



  return (
    <div className="bg-teal-300 fixed w-full z-10 top-0 ">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <Link
            to="/admin"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
            <svg
              className="w-8 text-teal-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-black uppercase">
              Simply Code
            </span>
          </Link>
          <ul className=" items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                to='/admin'
                aria-label="Our product"
                title="Dashboard"
                className="font-medium tracking-wide text-black transition-colors duration-200 hover:text-teal-accent-400"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/students-list"
                aria-label="Our product"
                title="Students"
                className="font-medium tracking-wide text-black transition-colors duration-200 hover:text-teal-accent-400"
              >
                Students
              </Link>
            </li>
            <li>
              <Link
                to="/admin/teacher-list"
                aria-label="Product pricing"
                title="teacher list"
                className="font-medium tracking-wide text-black transition-colors duration-200 hover:text-teal-accent-400"
              >
                Teachers
              </Link>
            </li>
            <li>
              <Link
                to="/admin/teacher-request"
                aria-label="About us"
                title="request"
                className="font-medium tracking-wide text-black transition-colors duration-200 hover:text-teal-accent-400"
              >
                TeacherRquest
              </Link>
            </li>
            <li>
              <Link
                to="/admin/allcourse"
                aria-label="About us"
                title="total course"
                className="font-medium tracking-wide text-black transition-colors duration-200 hover:text-teal-accent-400"
              >
                AllCourse
              </Link>
            </li>

            {logout ?
              (<div>
                <Link className="mr-5 text-black " to="#">
                  {name}
                </Link>
                <button
                  onClick={logoutHandle}
                  className='inline-flex items-center bg-yellow-500 border-0 py-1 px-3 mt-4 md:mt-0'

                >logout</button>
              </div>

              ) : (<ul className=" items-center hidden space-x-8 lg:flex">
                <li>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                    aria-label="Sign up"
                    title="Sign up"
                  >
                    Sign In
                  </Link>

                </li>
              </ul>)}
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        to="/admin"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8 text-deep-purple-accent-400"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-black uppercase">
                          Simply Code
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link
                          to="/admin"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/students-list"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Students
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/teacher-list"
                          aria-label="Product pricing"
                          title="Product pricing"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Teachers
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/teacher-request"
                          aria-label="About us"
                          title="About us"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          TeacherRequest
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/allcourse"
                          aria-label="About us"
                          title="About us"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          AllCourse
                        </Link>
                      </li>
                      {logout ?
                        (<div>
                          <Link className="mr-5 font-medium  text-gray-700" to="#">
                            {name}
                          </Link><br />
                          <button
                            onClick={logoutHandle}
                            className='  bg-teal-300 rounded-sm  border-0 py-1 px-3 mt-4 md:mt-0'

                          >logout</button>
                        </div>

                        ) : (
                          <li>
                            <Link
                              to="/login"
                              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                              aria-label="Sign up"
                              title="Sign up"
                            >
                              Sign In
                            </Link>

                          </li>
                        )}

                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
