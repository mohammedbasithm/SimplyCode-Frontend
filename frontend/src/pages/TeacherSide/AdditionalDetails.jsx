import React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import toast,{Toaster} from 'react-hot-toast';
import Spinner from '../../Component/Spinner/Spinner';
import PublicAxios from '../../axios';
import { useDispatch } from 'react-redux';
import { setCredential } from '../../ReduxStore/ReduxStore';
const AdditionalDetails = ({isEditModalOpen, closeEditModal,userId}) => {
  
  const[phone,setPhone]=useState('')
  const[qualification,setQualification]=useState('')
  const[bankAccount,setBankAccount]=useState('')
  const[ifsc,setIfsc]=useState('')
  const[idproof,setIdproof]=useState('')
  const[certificate,setCertificate]=useState('')
  const[loading,setLoading]=useState(false)
  const[modal,setModal]=useState(false)
  const dispatch=useDispatch()
  const handleSubmit=async(event)=>{
    event.preventDefault();
    
    if (!/^\d{10}$/.test(phone)) {
      // /^\d{10}$/ checks for exactly 10 digits
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    if (!/^\d{8,12}$/.test(bankAccount)) {
      // /^\d{8,12}$/ checks for digits between 8 and 12
      toast.error('Please enter a valid bank account number (8 to 12 digits)');
      return;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      // /^[A-Z]{4}0[A-Z0-9]{6}$/ checks for the specific IFSC pattern
      toast.error('Please enter a valid IFSC code');
      return;
    }
    if (phone.trim()==='' || !qualification.trim() || !bankAccount.trim() ||!ifsc.trim() || !idproof.trim() || !certificate.trim()){
      toast.error('fill the form ')
      return;
    }const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf']; // Example extensions
    const validateFile = (file) => {
      const fileName = typeof file === 'string' ? file : file.name; // Access file name or file path
      const fileExtension = fileName.split('.').pop().toLowerCase();
    
      // Check if the extension is allowed
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error('Please upload files with allowed extensions (JPG, JPEG, PNG, PDF)');
        return false;
      }
      return true;
    }
    const idProofValid = validateFile(idproof);
    const certificateValid = validateFile(certificate);

    if (!idProofValid || !certificateValid) {
      return;
    }
    try{
      setLoading(true)
     
      const userData={
        'phone':phone,
        'qualification':qualification,
        'bankaccount':bankAccount,
        'ifsc':ifsc,
        'idproof':idproof,
        'certificate':certificate,
        'user_id':userId,
      }
      console.log(userData);
      const response=await PublicAxios.post('/teacher/additional-details',userData,{
        headers: {
          'Content-Type': 'multipart/form-data', // Make sure to set the correct content type
        },
        withCredentials:true,
      });
      if (response.status==200){
        setLoading(false)
        console.log('sucess the submission');
        toast.success(response.data.message);
        const { username, id, access, refresh,is_admin,is_teacher,is_approvel,teacher_request} = response.data.teacher;
      const userdata = {
        username,
        user_id: id, // Assuming user ID is received as 'uid'
        access_token:access,
        refresh_token:refresh,
        role:is_admin ? 'ADMIN' : (is_teacher ? 'TEACHER' : 'USER'),
        is_approvel:is_approvel,
        teacher_request:teacher_request,
      };dispatch(setCredential(userdata))
        toggleModal();

        setModal(true)
      }else {
        setLoading(false);
        console.log('Something went wrong');
        toast.error(response.data.errors);  // Use response.data.errors to access the error message
      }
      

    }catch(error){
      setLoading(false)
      console.log('somthing problem');
      toast.error(error.response.data.errors)
    }
    


  }  
  const toggleModal = () => {
    closeEditModal();
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div>
      {isEditModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden={!isEditModalOpen}
          className="z-50 fixed top-3 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Details
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              {/* Modal body */}
              <form onSubmit={handleSubmit} class='pb-4 flex flex-col items-center'>
         
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField onChange={(e)=>setPhone(e.target.value)} id="standard-basic" label="Phone" variant="standard" />
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField onChange={(e)=>setQualification(e.target.value)} id="standard-basic" label="Qualification" variant="standard" />
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField onChange={(e)=>setBankAccount(e.target.value)} id="standard-basic" label="Bank Account Number" variant="standard" />
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField onChange={(e)=>setIfsc(e.target.value)} id="standard-basic" label="IFSC Code" variant="standard" />
            </Box>

           
            <div className='pl-4 relative mb-4 w-full ml-4'>
                <label htmlFor='idProof' className='block mb-1 text-gray-600'>Attach ID Proof</label>
                <input
                    id='idProof'
                    className='w-full text-gray-600'
                    type='file'
                    accept='.pdf, .doc, .docx, .jpg, .jpeg, .png'
                    onChange={(e)=>setIdproof(e.target.files[0])}
                />
            </div>
            <div className='pl-4 ml-4 relative mb-4 w-full'>
                <label htmlFor='idProof' className='block mb-1 text-gray-600'>Attach Certificate</label>
                <input
                    id='idProof'
                    className='w-full text-gray-600'
                    type='file'
                    accept='.pdf, .doc, .docx, .jpg, .jpeg, .png'
                    onChange={(e)=>setCertificate(e.target.files[0])}
                />
            </div>
        
            <button type='submit' className=' bg-teal-500 hover:bg-neutral-800 text-white font-bold py-2 px-4 rounded'>
              Submit {loading && <Spinner/>}
            </button>
        </form>
            </div>
          </div>
        </div>
      )}{modal && (
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
                  Thank you for submission!
                </h3>

                <p className="text-sm text-gray-600">
                A verification link has been sent to your email address. Please check your email and follow the instructions to complete the verification process.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster/>
    </div>
  )
}

export default AdditionalDetails
