import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TeacherNav from '../../Component/Navbar/TeacherNav';

function TeacherRegister() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const handleClickShowRePassword = () => setShowRePassword((show) => !show);
    const handleMouseDownRePassword = ((event) => event)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = ((event) => event)

    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [qualification, setQualification] = useState('')
    const [bankAccount, setBankAccount] = useState('')
    const [ifsc, setIfsc] = useState('')
    const [password, setPassword] = useState('')
    const [re_password, setRepassword] = useState('')
    const [idproof, setIdproof] = useState('')
    const [certificate, setCertificate] = useState('')
    return (
        <>
            <TeacherNav />
            <div className='flex bg-white h-screen '>
                <div className='mt-48 bg-white h-full w-full flex flex-col justify-center items-center'>
                    <h1 className='text-3xl mb-4 text-black'>SignUp</h1>
                    <form class='flex flex-col items-center'>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="User Name" variant="standard" />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Email" variant="standard" />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Phone" variant="standard" />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Qualification" variant="standard" />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Bank Account Number" variant="standard" />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="IFSC Code" variant="standard" />
                        </Box>

                        <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
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
                        <div className='relative mb-4 w-full ml-4'>
                            <label htmlFor='idProof' className='block mb-1 text-gray-600'>Attach ID Proof</label>
                            <input
                                id='idProof'
                                className='w-full text-gray-600'
                                type='file'
                                accept='.pdf, .doc, .docx, .jpg, .jpeg, .png'
                            />
                        </div>
                        <div className='ml-4 relative mb-4 w-full'>
                            <label htmlFor='idProof' className='block mb-1 text-gray-600'>Attach Certificate</label>
                            <input
                                id='idProof'
                                className='w-full text-gray-600'
                                type='file'
                                accept='.pdf, .doc, .docx, .jpg, .jpeg, .png'
                            />
                        </div>

                        <button type='submit' className='bg-teal-500 hover:bg-neutral-800 text-white font-bold py-2 px-4 rounded'>
                            Submit
                        </button>
                    </form>
                </div>
                <div className='mt-48  h-full w-full hidden md:flex items-center justify-center'>
                    <div className='item-center justify-center flex flex-center '>
                        <img className='  ' src='src/assets/img1.jpg' alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeacherRegister
