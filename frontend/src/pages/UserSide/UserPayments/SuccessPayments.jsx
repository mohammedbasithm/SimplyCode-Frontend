import React from 'react'
import Navigation from '../../../Component/Navbar/UserNav'
import { Footer } from '../../../Component/Footer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const SuccessPayments = () => {
    const navigate=useNavigate()
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
          alert("Order placed! You will receive an email confirmation.");
        }
    
        if (query.get("canceled")) {
          alert(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }, []);
  return (
    <>
      <Navigation/>

      <Footer/>
    
    </>
  )
}

export default SuccessPayments
