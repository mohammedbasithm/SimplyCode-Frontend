import React, { useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import PublicAxios from '../../../axios'
import { useEffect } from 'react'
import Spinner from '../../../Component/Spinner/Spinner'

function CurrentPassword({ user_id, setChangepass, setNewpass }) {
  const [password, setPassword] = useState('')
  const modalRef = useRef(null);
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setChangepass(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
  }, [setChangepass]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() === '') {
      toast.error('please enter password')
      return
    }

    try {
      setLoad(true)
      const response = await PublicAxios.put('/current-password', {
        password: password,
        user_id: user_id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setLoad(false)
        setNewpass(true);
        setChangepass(false)
        toast.success(response.data.message)

      }
    }
    catch (error) {
      toast.error(error.response.data.message)
      setLoad(false)
    }
  }
  return (
    <>

      <div className="modal-overlay pt-8">
        <div ref={modalRef} className="modal-container">
          <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Change your password?</h1>
              </div>
              <div class="mt-5">
                <form onSubmit={handleSubmit}>
                  <div class="grid gap-y-4">
                    <div>
                      <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Enter Current Password </label>
                      <div class="relative">
                        <input
                          type="text"
                          id="password"
                          name="password"
                          class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          placeholder="••••••••"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </div>
                    </div>
                    <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >{load ? <Spinner /> : "Submit"}</button>
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

export default CurrentPassword;
