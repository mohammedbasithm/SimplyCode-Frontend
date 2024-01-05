import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../axios'
import toast, { Toaster } from 'react-hot-toast'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Spinner from '../../../Component/Spinner/Spinner';

function SignUp() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [modal, setModal] = useState(false)
  const [prevTostId, setPrevTostId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);
  const handleMouseDownRePassword = ((event) => event)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = ((event) => event)
  const [isChecked, setIsChecked] = useState(false);
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
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmpassword.trim() === '') {
      showTost('fill the form ')
      return
    }
    if (password !== confirmpassword) {
      showTost('password does not match')
      return
    }
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("is_teacher", isChecked)

      const response = await axios.post('/signup', formData)
      setLoading(false)
      setModal(true);
    }
    catch (error) {
      setLoading(false)
      showTost(error.response.data.message)

    }

  }
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className="relative">
      <div className='flex bg-white h-screen '>
        <div className='mt-8 bg-white h-full w-full flex flex-col justify-center items-center'>
          <h1 className='text-3xl mb-4 text-black'>SignUp</h1>
          <form onSubmit={handleSubmit} class='flex flex-col items-center'>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField onChange={(e) => setUsername(e.target.value)} id="standard-basic" label="User Name" variant="standard" />
            </Box>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField onChange={(e) => setEmail(e.target.value)} id="standard-basic" label="Email" variant="standard" />
            </Box>
            <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                value={confirmpassword}
                onChange={(e) => { setConfirmpassword(e.target.value) }}
                type={showRePassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRePassword}
                      onMouseDown={handleMouseDownRePassword}
                    >
                      {showRePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <label className="mt-8 relative flex items-center justify-between w-full">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Are you a teacher?</span>
              <div className="relative">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <div className={`w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${isChecked ? 'peer-checked:bg-teal-600' : ''}`} />
              </div>
            </label>
            <button type='submit' className='mt-8 bg-teal-500 hover:bg-neutral-800 text-white font-bold py-2 px-4 rounded'>
              Submit{loading && <Spinner />}
            </button>
            <p className="mt-6 text-xs text-gray-600 sm:text-sm">
              Already an member ? <Link to='/login' className='text-red-500 underline'>login</Link>
            </p>


          </form>
        </div>
        <div className='mt-8  h-full w-full hidden md:flex items-center justify-center'>
          <div className='item-center justify-center flex flex-center '>
            <img className='  ' src='src/assets/img1.jpg' alt="" />
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
                  Thank you for signing up!
                </h3>
                <p className="text-sm text-gray-600">
                  A verification link has been sent to your email address.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  )
}

export default SignUp;
