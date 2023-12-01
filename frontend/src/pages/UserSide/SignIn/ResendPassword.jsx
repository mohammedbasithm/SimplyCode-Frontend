import React, { useState,useRef } from 'react'
import toast,{Toaster} from 'react-hot-toast'
import PublicAxios from '../../../axios'
import { useNavigate } from 'react-router-dom'

function ResendPassword({uidb64}) {
    const [pass1,setPass1]=useState('')
    const [pass2,setPass2]=useState('')
    const [prevTostId,setPrevTostId]=useState(null)
    const navigate=useNavigate()
    const modalRef = useRef(null);
    console.log('uidb64:',uidb64);
    console.log(pass1);
    console.log(pass2);
    const showTost=(message)=>{
        if(prevTostId){
            toast.dismiss(prevTostId)
        }
    const newToastId=toast.error(message,{
        duration:3000,
        style:{
            borderRadius:'10px',
            background:'#333',
            color:'#fff',
            width:'300px',
        },
      })
      setPrevTostId(newToastId);
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(pass1.trim()===''){
          showTost('please set password')
          return
        }
        if (pass1 !== pass2){
            showTost('password not match..')
            return
        }
        if (!uidb64){
            return;
        }
        
        try{
            const response=await PublicAxios.post('/reset-password',{
                password:pass1,
                uidb64:uidb64,
            },{
                headers:{
                  'Content-Type':'application/json',
                },
                withCredentials:true,
              });
            // Handle the API response, e.g., show a success message
            console.log('Response from the API:', response.data);
            showTost(response.data.message)
            navigate('/login');
        }
        catch(error){
            console.log(error.response.data.message);
            console.log("resent password error");
            showTost(error.response.data.error)
        }
    }
  return (
    <>
    {/* <main id="content" role="main" class="w-full max-w-md mx-auto p-6"> */}
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-container">
      <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">
              Login here
            </a>
          </p>
        </div>
        

        <div class="mt-5">
          <form onClick={handleSubmit}>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Password </label>
                <div class="relative">
                  <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  required 
                  placeholder="••••••••"
                  onChange={(e)=>setPass1(e.target.value)}
                  value={pass1}
                  />
                </div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Confirm Password</label>
                <div class="relative">
                  <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" 
                  required 
                  value={pass2}
                  onChange={(e)=>setPass2(e.target.value)}
                  placeholder="••••••••"
                  />
                </div>
                <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
              </div>
              <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    {/* </main>  */}
    </div>
    </div>
    <Toaster/>
    </>
  )
}

export default ResendPassword
