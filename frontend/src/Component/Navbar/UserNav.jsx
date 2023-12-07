import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { userLogout } from '../../ReduxStore/ReduxStore';
import 'hover.css/css/hover-min.css'

export const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [logout,setLogout]=useState(false)
    const isAuth=useSelector((state)=>state.user)
   
    const name=localStorage.getItem('username')
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    console.log('role:',isAuth.role);
    useEffect(()=>{
      console.log(isAuth);
      if(isAuth &&isAuth.access_token!==null){
        setLogout(true)
      }else{
        setLogout(false)
      }
    },[isAuth])

    
    
    const logoutHandle = (e) => {
      e.preventDefault();

      console.log('login out');
      dispatch(userLogout());
      setLogout(false);
      navigate('/')

    };
    
      
    
    return (
      <div class="bg-indigo-100 fixed top-0 w-full z-10 shadow-md">
        <div class="px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div class="relative flex items-center justify-between">
            <Link
              to="/"
              aria-label="Company"
              title="Company"
              class="inline-flex items-center"
            >
              <svg
                class="w-8 text-blue-900"
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
              <span class="ml-2 text-xl font-bold tracking-wide text-blue-900 uppercase">
                Simply Code
              </span>
            </Link>
            <ul class="flex items-center hidden space-x-8 lg:flex ">
              <li>
                <Link
                  to='/'
                  aria-label="Our product"
                  title="Our product"
                  class="hvr-underline-from-left font-medium tracking-wide text-blue-600 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={isAuth.role === 'USER' ? "/course" : "/login"}
                  aria-label="Our product"
                  title="Our product"
                  class="hvr-underline-from-left font-medium tracking-wide text-blue-600 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Course
                </Link>
              </li>
              <li>
                <Link
                  to={isAuth.role === 'USER' ? "/aboutus" :"/login"}
                  aria-label="Product pricing"
                  title="Product pricing"
                  class="hvr-underline-from-left font-medium tracking-wide text-blue-600 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to={isAuth.role === 'USER' ? "/blog" :"/login"}
                  aria-label="About us"
                  title="About us"
                  class="hvr-underline-from-left font-medium tracking-wide text-blue-600 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Blog
                </Link>
              </li>
              
            </ul>
            {logout?
            (<div>
              <Link className="hvr-underline-from-left mr-5 text-blue-600" to="/userprofile">
              {name}
              </Link>
              <button
              onClick={logoutHandle}
              className='hvr-bounce-to-right inline-flex items-center bg-gray-300 shadow-sm border-0 py-1 px-3 mt-4 md:mt-0'
              
              >logout</button>
            </div>
            
            ):(<ul class="flex items-center hidden space-x-8 lg:flex">
              <li>
                <Link
                  to="/login"
                  class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-blue-600 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="login"
                >
                  Sign In
                </Link>
                
              </li>
            </ul>)}
            
            <div class="lg:hidden">
              <button
                aria-label="Open Menu"
                title="Open Menu"
                class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
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
                <div class="absolute top-0 left-0 w-full">
                  <div class="p-5 bg-white border rounded shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                      <div>
                        <Link
                          to="/"
                          aria-label="Company"
                          title="Company"
                          class="inline-flex items-center"
                        >
                          <svg
                            class="w-8 text-deep-purple-accent-400"
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
                          <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Simply Code
                          </span>
                        </Link>
                      </div>
                      <div>
                        <button
                          aria-label="Close Menu"
                          title="Close Menu"
                          class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                      <ul class="space-y-4">
                        <li>
                          <Link
                            to="/"
                            aria-label="Our product"
                            title="Our product"
                            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/"
                            aria-label="Our product"
                            title="Our product"
                            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Course
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/aboutus"
                            aria-label="Product pricing"
                            title="Product pricing"
                            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            AboutUs
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog"
                            aria-label="About us"
                            title="About us"
                            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Blog
                          </Link>
                        </li>
                        {logout?
                        (<div>
                          <Link className="hvr-underline-from-left mr-5 text-black" to="/userprofile">
                          {name}
                          </Link>
                          <button
                          onClick={logoutHandle}
                          className='hvr-bounce-to-right inline-flex items-center bg-green-400 border-0 py-1 px-3 mt-4 md:mt-0'
                          
                          >logout</button>
                        </div>
                        
                        ):(<ul class="flex items-center hidden space-x-8 lg:flex">
                          <li>
                            <Link
                              to="/login"
                              class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                              aria-label="Sign up"
                              title="Sign up"
                            >
                              Sign In
                            </Link>
                            
                          </li>
                        </ul>)}
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

export default Navigation
