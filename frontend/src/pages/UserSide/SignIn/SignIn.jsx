import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PublicAxios from '../../../axios'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { setCredential } from '../../../ReduxStore/ReduxStore';
import axios from 'axios';
import Spinner from '../../../Component/Spinner/Spinner';
import ForgetPassword from './ForgotPassword';
import ResendPassword from './ResendPassword';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navigation from '../../../Component/Navbar/UserNav';
import img1 from '../../../../src/assets/img1.jpg'

function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = ((event) => event)
  const navigate = useNavigate()
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [prevTostId, setPrevTostId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [uidb64, setUidb64] = useState(null)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const uidb64 = queryParams.get('uidb64');
    setUidb64(uidb64)
   
  }, [location.search]);


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

    if (!userName.trim() || !password.trim()) {
      showTost('please enter both user and password ');
      return;
    }
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('username', userName);
      formData.append('password', password);

      const response = await PublicAxios.post('/token', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      if (response.data.is_active) {
        const { username, uid, access, refresh, is_admin, is_teacher, is_approvel, teacher_request } = response.data;
        const userData = {
          username,
          user_id: uid, // Assuming user ID is received as 'uid'
          access_token: access,
          refresh_token: refresh,
          role: is_admin ? 'ADMIN' : (is_teacher ? 'TEACHER' : 'USER'),
          is_approvel: is_approvel,
          teacher_request: teacher_request,
        };
        dispatch(setCredential(userData))
        localStorage.setItem("username", response.data.username);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        if (userData.role === 'ADMIN') {
          navigate('/admin');
        } else if (userData.role === 'TEACHER') {
          navigate('/teacher/');
        }
        else {
          navigate('/');
        }
      } else {
        setLoading(false)
        showTost("user not found")
        navigate('/login')
      }

    }
    catch (error) {
      setLoading(false)
      if (error.response.status === 401) {
        showTost("Incorect username or password");

      } else if (error.response.status === 400) {
        showTost("Unauthorized access");
      } else {
        console.log('Error:', error);
        showTost("Somthing went wrong. please try again later");

      }
    }
  }
  const handleForget = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (


    <>
      <Navigation />
      <div className='flex bg-white h-screen '>
        <div className='mt-8  h-full w-full hidden md:flex items-center justify-center'>
          <div className='item-center justify-center flex flex-center '>
            <img className='  ' src={img1} alt="" />
          </div>
        </div>
        <div className=' bg-white h-full w-full flex flex-col justify-center items-center'>
          <h1 className='text-3xl mb-4 text-black'>Login</h1>
          <form onSubmit={handleSubmit} className='flex flex-col items-center'>

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
            <a

              className="mt-5 text-black text-sm flex justify-end ml-auto"
              onClick={handleForget}
              style={{ cursor: 'pointer' }}
            >
              Forgot password?
            </a>
            <button type='submit' className='mt-8 bg-teal-500 hover:bg-neutral-800 text-white font-bold py-2 px-4 rounded'>
              login{loading && <Spinner />}
            </button>

          </form>

          <p className="mt-4 text-xs text-gray-600 sm:text-sm">
            Don't have an account ? <Link to='/signup' className='text-red-500 underline'>SignUp</Link>
          </p>
          <div className='flex justify-center items-center mt-5'>
            <hr className='border-gray-600 border-t w-full mr-4'></hr>
            <h2 className='text-center top-6 text-gray-600'>OR</h2>
            <hr className='border-gray-600 border-t w-full ml-4'></hr>
          </div>

        </div>

      </div>
      {showModal && <ForgetPassword onClose={handleClose} />}
      {uidb64 && <ResendPassword uidb64={uidb64} />}


      <Toaster />
    </>
  )
}

export default SignIn;
