
import { Link } from 'react-router-dom'
import React, { useRef, useEffect, useState } from 'react';
import './ForgotPassword.css'
import toast, { Toaster } from 'react-hot-toast'
import PublicAxios from '../../../axios';


function ForgetPassword({ onClose }) {
  const [email, setEmail] = useState('')
  const [prevTostId, setPrevTostId] = useState(null)
  const modalRef = useRef(null);
  const [modal, setModal] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  const showTost = (message) => {
    if (prevTostId) {
      toast.dismiss(prevTostId)
    }
    const newToastId = toast.error(message, {
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        width: '300px',
      },
    })
    setPrevTostId(newToastId)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showTost("please enter your email")
      return
    }
    try {
      const response = await PublicAxios.post('/forgot-password', { email: email });
      setModal(true);
    }

    catch (error) {
      showTost(error.response.data.message)
    }

  }
  const closeModal = () => {
    setModal(false)
  }
  return (
    <>
      <div className="modal-overlay">
        <div ref={modalRef} className="modal-container">
          <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>

              </div>

              <div class="mt-5">
                <form onClick={handleSubmit}>
                  <div class="grid gap-y-4">
                    <div>
                      <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                      <div class="relative">
                        <input type="email"
                          id="email"
                          value={email}
                          placeholder="john.doe@example.org"
                          onChange={(e) => setEmail(e.target.value)}
                          name="email"
                          class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                      </div>
                      <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                    </div>
                    <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
                  </div>
                </form>
              </div>
            </div>
          </div>


        </div>
      </div>
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
                <h1>Verification Email Sent</h1>
                {/* <div className="flex justify-center items-center h-screen"> */}
                <div className="flex justify-center items-center">
                  <img
                    className="mx-auto"
                    src="https://static.thenounproject.com/png/5736845-200.png"
                    alt=""
                  />
                </div>

                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Please Verify Your Email!
                </h3>
                <p className="text-sm text-gray-600">
                  A verification link has been sent to your email address.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ForgetPassword
