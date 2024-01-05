import React, { useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import PublicAxios from '../../../axios'
import { useEffect } from 'react'
import Spinner from '../../../Component/Spinner/Spinner'

function ChangePassword({ user_id, setNewpass }) {
  const [pass1, setPass1] = useState('')
  const [pass2, setPass2] = useState('')
  const modalRef = useRef(null);
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {

        setNewpass(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);


  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass1.trim() === '') {
      toast.error('please set password')
      return
    }
    if (pass1 !== pass2) {
      toast.error('password not match..')
      return
    }


    try {
      setLoad(false)
      const response = await PublicAxios.post('/setnew-password', {
        password: pass1,
        user_id: user_id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      toast.success(response.message)
      setNewpass(false)
      setLoad(false)
    }
    catch (error) {
      setLoad(false)
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      <div className="modal-overlay">
        <div ref={modalRef} className="modal-container">
          <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Enter New password?</h1>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  change your password?

                </p>
              </div>


              <div class="mt-5">
                <form onSubmit={handleSubmit}>
                  <div class="grid gap-y-4">
                    <div>
                      <label for="text" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Password </label>
                      <div class="relative">
                        <input
                          type="text"
                          id="pass1"
                          name="pass1"
                          class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          placeholder="••••••••"
                          onChange={(e) => setPass1(e.target.value)}
                          value={pass1}
                        />
                      </div>
                      <label for="text" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Confirm Password</label>
                      <div class="relative">
                        <input
                          type="text"
                          id="pass2"
                          name="pass2"
                          class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          value={pass2}
                          onChange={(e) => setPass2(e.target.value)}
                          placeholder="••••••••"
                        />
                      </div>

                    </div>
                    <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                      {load ? <Spinner /> : 'Reset password'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ChangePassword;
